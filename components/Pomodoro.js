import React, { useEffect, useRef, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, '0')
  const ss = (s % 60).toString().padStart(2, '0')
  return `${m}:${ss}`
}

export default function Pomodoro({ workMinutes = 25, breakMinutes = 5 }) {
  const [secondsLeft, setSecondsLeft] = useState(workMinutes * 60)
  const [mode, setMode] = useState('work')
  const [running, setRunning] = useState(false)
  const [sessions, setSessions] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const intervalRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase.auth.getUser()
      const u = data?.user || null
      setUser(u)
      if (u) {
        const { data: rows } = await supabase.from('sessions').select('*').eq('user_id', u.id).order('start_ts', { ascending: false }).limit(10)
        setSessions(rows || [])
      }
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSecondsLeft(s => s - 1)
      }, 1000)
    }
    return () => clearInterval(intervalRef.current)
  }, [running])

  useEffect(() => {
    if (secondsLeft <= 0) handleComplete()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [secondsLeft])

  function start() { setRunning(true) }
  function pause() { setRunning(false) }
  function reset() { setRunning(false); setMode('work'); setSecondsLeft(workMinutes * 60) }

  async function handleComplete() {
    setRunning(false)
    const endTs = new Date().toISOString()
    const duration = (mode === 'work' ? workMinutes * 60 : breakMinutes * 60)
    if (mode === 'work' && user) {
      const payload = { user_id: user.id, start_ts: new Date(Date.now() - duration * 1000).toISOString(), end_ts: endTs, duration_seconds: duration }
      const { data, error } = await supabase.from('sessions').insert(payload).select().single()
      if (error) console.error('insert session', error)
      else setSessions(prev => [data, ...prev].slice(0,10))

      // update analytics: increment study_time_seconds and sessions_completed for today
      const date = new Date().toISOString().slice(0,10)
      const { data: existing } = await supabase.from('analytics').select('*').eq('user_id', user.id).eq('date', date).limit(1).single().catch(() => ({ data: null }))
      if (existing && existing.id) {
        await supabase.from('analytics').update({ study_time_seconds: (existing.study_time_seconds || 0) + duration, sessions_completed: (existing.sessions_completed || 0) + 1 }).eq('id', existing.id)
      } else {
        await supabase.from('analytics').insert({ user_id: user.id, date, study_time_seconds: duration, sessions_completed: 1, tasks_completed: 0, tasks_left: 0 })
      }
    }

    if (mode === 'work') {
      setMode('break')
      setSecondsLeft(breakMinutes * 60)
    } else {
      setMode('work')
      setSecondsLeft(workMinutes * 60)
    }
  }

  return (
    <div className="p-4 bg-white rounded shadow max-w-md">
      <div className="text-center">
        <div className="text-sm text-zinc-500">{mode === 'work' ? 'Focus' : 'Break'}</div>
        <div className="text-5xl font-mono mt-2">{formatTime(Math.max(0, secondsLeft))}</div>

        <div className="mt-4 flex items-center justify-center gap-2">
          {!running ? <button onClick={start} className="px-4 py-2 bg-zinc-800 text-white rounded">Start</button> : <button onClick={pause} className="px-4 py-2 bg-zinc-200 rounded">Pause</button>}
          <button onClick={reset} className="px-4 py-2 border rounded">Reset</button>
        </div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold">Recent Sessions</h4>
        {loading ? <div className="text-zinc-500">Loading sessions...</div> : <RecentSessions sessions={sessions} />}
      </div>
    </div>
  )
}

function RecentSessions({ sessions }) {
  if (!sessions || sessions.length === 0) return <div className="text-zinc-500">No sessions yet.</div>
  return (
    <ul className="mt-2 space-y-2">
      {sessions.slice(0,5).map(s => (
        <li key={s.id} className="text-sm border p-2 rounded">
          <div>Start: {new Date(s.start_ts).toLocaleString()}</div>
          <div>Duration: {Math.round(s.duration_seconds/60)} min</div>
        </li>
      ))}
    </ul>
  )
}
