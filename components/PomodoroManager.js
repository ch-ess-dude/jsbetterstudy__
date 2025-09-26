import React, { useEffect, useMemo, useState, useRef } from 'react'
import { supabase } from '../lib/supabaseClient'
import useTasks from '../hooks/useTasks'

const MODES = {
  pomodoro: { label: 'Pomodoro', minutes: 25 },
  short: { label: 'Short Break', minutes: 5 },
  long: { label: 'Long Break', minutes: 15 }
}

function formatMMSS(sec) {
  const m = Math.floor(sec / 60).toString().padStart(2, '0')
  const s = Math.floor(sec % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function PomodoroManager() {
  const { tasks, loading: tasksLoading, updateTask } = useTasks()
  const [sessionName, setSessionName] = useState('Focus Session')
  const [mode, setMode] = useState('pomodoro')
  const [attachedTaskIds, setAttachedTaskIds] = useState([])
  const [completedTaskIds, setCompletedTaskIds] = useState([])

  const durationSeconds = useMemo(() => MODES[mode].minutes * 60, [mode])
  const [remaining, setRemaining] = useState(durationSeconds)
  const [running, setRunning] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    setRemaining(durationSeconds)
  }, [durationSeconds])

  useEffect(() => {
    if (running) {
      timerRef.current = setInterval(() => setRemaining(r => r - 1), 1000)
    } else {
      clearInterval(timerRef.current)
    }
    return () => clearInterval(timerRef.current)
  }, [running])

  useEffect(() => {
    if (remaining <= 0 && running) {
      setRunning(false)
      handleComplete()
    }
  }, [remaining, running])

  async function handleComplete() {
    // session finished: write session, session_tasks, update tasks, and analytics
    const { data: userData } = await supabase.auth.getUser()
    const user = userData?.user
    if (!user) {
      // show simple alert
      alert('Please sign in to save sessions')
      return
    }

    const start_ts = new Date(Date.now() - durationSeconds * 1000).toISOString()
    const end_ts = new Date().toISOString()

    const payload = {
      user_id: user.id,
      name: sessionName,
      type: mode,
      duration_seconds: durationSeconds,
      start_ts,
      end_ts
    }

    try {
      const { data: session, error: sessionError } = await supabase.from('sessions').insert(payload).select().single()
      if (sessionError) throw sessionError

      // insert session_tasks rows
      if (attachedTaskIds && attachedTaskIds.length > 0) {
        const rows = attachedTaskIds.map(tid => ({ session_id: session.id, task_id: tid, status: 'active' }))
        await supabase.from('session_tasks').insert(rows)
      }

      // Update tasks marked completed
      const completedNow = completedTaskIds || []
      for (const tid of completedNow) {
        try { await updateTask(tid, { completed: true }) } catch (e) { console.error('task complete update err', e) }
      }

      // Analytics upsert for today
      const date = new Date().toISOString().slice(0,10)
      const { data: existing } = await supabase.from('analytics').select('*').eq('user_id', user.id).eq('date', date).limit(1).single().catch(() => ({ data: null }))
      const tasksCompletedCount = completedNow.length
      const tasksLeft = (await supabase.from('tasks').select('id,completed').eq('user_id', user.id)).data?.filter(t => !t.completed).length || 0

      if (existing && existing.id) {
        await supabase.from('analytics').update({
          study_time_seconds: (existing.study_time_seconds || 0) + durationSeconds,
          sessions_completed: (existing.sessions_completed || 0) + 1,
          tasks_completed: (existing.tasks_completed || 0) + tasksCompletedCount,
          tasks_left: tasksLeft
        }).eq('id', existing.id)
      } else {
        await supabase.from('analytics').insert({ user_id: user.id, date, study_time_seconds: durationSeconds, sessions_completed: 1, tasks_completed: tasksCompletedCount, tasks_left: tasksLeft })
      }

      // reset UI state
      setAttachedTaskIds([])
      setCompletedTaskIds([])
      setRemaining(durationSeconds)
      // small success toast
      try { window?.toast?.success?.('Session saved') } catch (e) {}
    } catch (err) {
      console.error('session save error', err)
      alert('Error saving session: ' + err.message)
    }
  }

  function toggleAttach(id) {
    setAttachedTaskIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  function toggleComplete(id) {
    setCompletedTaskIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])
  }

  return (
  <div className="max-w-3xl mx-auto bg-zinc-900 text-zinc-100 p-6 rounded-2xl shadow-lg">
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div className="flex-1">
          <input value={sessionName} onChange={e => setSessionName(e.target.value)} className="w-full p-3 rounded-lg border" />
        </div>
          <div className="flex items-center gap-2">
          {Object.keys(MODES).map(key => (
            <button key={key} onClick={() => setMode(key)} className={`px-3 py-2 rounded ${mode===key? 'bg-zinc-700 text-zinc-100':'bg-zinc-800 text-zinc-400'} shadow-sm`}>
              {MODES[key].label}
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-col md:flex-row items-center gap-6">
        <div className="flex-1 flex flex-col items-center">
          <div className="w-56 h-56 rounded-full bg-zinc-800 flex items-center justify-center shadow-inner">
            <div className="text-5xl font-mono text-zinc-100">{formatMMSS(Math.max(0, remaining))}</div>
          </div>
          <div className="mt-4 flex gap-3">
            {!running ? <button onClick={() => setRunning(true)} className="px-4 py-2 bg-zinc-700 text-zinc-100 rounded">Start</button> : <button onClick={() => setRunning(false)} className="px-4 py-2 bg-zinc-600 text-zinc-100 rounded">Pause</button>}
            <button onClick={() => { setRunning(false); setRemaining(durationSeconds) }} className="px-4 py-2 bg-zinc-700 text-zinc-200 rounded">Reset</button>
          </div>
        </div>

        <aside className="w-full md:w-80 bg-zinc-800 p-4 rounded-lg shadow">
          <h4 className="font-semibold">Attach Tasks</h4>
          {tasksLoading ? <div className="text-sm text-zinc-500">Loading tasks...</div> : (
            <div className="flex flex-col gap-2 mt-3">
        {tasks.map(t => (
                <label key={t.id} className="flex items-center gap-2 p-2 rounded hover:bg-zinc-700">
                  <input type="checkbox" checked={attachedTaskIds.includes(t.id)} onChange={() => toggleAttach(t.id)} />
                  <div className="flex-1">
                    <div className={`font-medium ${t.completed? 'line-through text-zinc-500':''}`}>{t.title || t.name || t.description || 'Task'}</div>
                    <div className="text-xs text-zinc-400">{t.notes || ''}</div>
                  </div>
                  <input type="checkbox" checked={completedTaskIds.includes(t.id)} onChange={() => toggleComplete(t.id)} title="Mark completed after session" />
                </label>
              ))}
              {tasks.length === 0 && <div className="text-sm text-zinc-500">No tasks yet</div>}
            </div>
          )}
        </aside>
      </div>

      <footer className="mt-6 flex items-center justify-between">
        <div className="flex gap-3">
          <button onClick={() => {
            // Add new session preset (no-op: clear fields)
            setSessionName('Focus Session')
            setAttachedTaskIds([])
            setCompletedTaskIds([])
            setMode('pomodoro')
            setRemaining(MODES['pomodoro'].minutes * 60)
          }} className="px-3 py-2 bg-zinc-700 text-zinc-100 rounded shadow">Add New Session</button>
          <button onClick={() => handleComplete()} className="px-3 py-2 bg-zinc-600 text-zinc-100 rounded">Save Session</button>
        </div>
        <div className="text-sm text-zinc-500">Mode: {MODES[mode].label} • {MODES[mode].minutes} min</div>
      </footer>
    </div>
  )
}
