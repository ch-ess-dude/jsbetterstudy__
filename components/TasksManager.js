import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function TasksManager() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data } = await supabase.auth.getUser()
      const u = data?.user || null
      if (!mounted) return
      setUser(u)
      if (!u) {
        setLoading(false)
        return
      }
      const { data: rows, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', u.id)
        .order('created_at', { ascending: false })
      if (error) console.error('fetch tasks', error)
      else setTasks(rows || [])
      setLoading(false)
    })()
    return () => { mounted = false }
  }, [])

  async function addTask(e) {
    e.preventDefault()
    if (!title.trim()) return
    if (!user) return alert('Please sign in to save tasks')

    const payload = { user_id: user.id, title: title.trim(), completed: false }
    const { data, error } = await supabase.from('tasks').insert(payload).select().single()
    if (error) return console.error('insert task', error)
    setTasks(prev => [data, ...prev])
    setTitle('')
  }

  async function toggle(id, current) {
    if (!user) return alert('Please sign in to update tasks')
    const { data, error } = await supabase.from('tasks').update({ completed: !current }).eq('id', id).select().single()
    if (error) return console.error('update task', error)
    setTasks(prev => prev.map(t => t.id === id ? data : t))

    // update analytics (tasks_completed / tasks_left)
    try { await updateTasksAnalytics(user.id) } catch (e) { console.error(e) }
  }

  async function remove(id) {
    if (!user) return alert('Please sign in to delete tasks')
    const { error } = await supabase.from('tasks').delete().eq('id', id)
    if (error) return console.error('delete task', error)
    setTasks(prev => prev.filter(t => t.id !== id))

    // update analytics
    try { await updateTasksAnalytics(user.id) } catch (e) { console.error(e) }
  }

  async function updateTasksAnalytics(userId) {
    // recompute tasks completed/left and upsert into analytics for today
    const { data: allTasks } = await supabase.from('tasks').select('id,completed').eq('user_id', userId)
    const tasks_completed = (allTasks || []).filter(t => t.completed).length
    const tasks_left = (allTasks || []).filter(t => !t.completed).length
    const date = new Date().toISOString().slice(0,10)

    const { data: existing } = await supabase.from('analytics').select('*').eq('user_id', userId).eq('date', date).limit(1).single().catch(() => ({ data: null }))
    if (existing && existing.id) {
      await supabase.from('analytics').update({ tasks_completed, tasks_left }).eq('id', existing.id)
    } else {
      await supabase.from('analytics').insert({ user_id: userId, date, study_time_seconds: 0, sessions_completed: 0, tasks_completed, tasks_left })
    }
  }

  if (loading) return <div className="p-4 bg-zinc-800 text-zinc-100 rounded shadow">Loading tasks...</div>

  if (!user) return <div className="p-4 bg-zinc-800 text-zinc-100 rounded shadow">Please sign in to sync your tasks with the database.</div>
  return (
    <div className="p-4 bg-zinc-800 rounded shadow text-zinc-200">
      <form onSubmit={addTask} className="flex gap-2">
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="New task" className="flex-1 border p-2 rounded" />
        <button className="px-3 py-2 bg-zinc-700 text-zinc-100 rounded">Add</button>
      </form>

      <ul className="mt-4 space-y-2">
        {tasks.length === 0 && <li className="text-zinc-400">No tasks yet.</li>}
        {tasks.map(task => (
            <li key={task.id} className="flex items-center justify-between border border-zinc-700 p-2 rounded">
            <div>
              <label className="inline-flex items-center gap-2">
                <input type="checkbox" checked={task.completed} onChange={() => toggle(task.id, task.completed)} />
                <span className={task.completed ? 'line-through text-zinc-300' : ''}>
                  {task.title}
                </span>
              </label>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => remove(task.id)} className="text-sm text-zinc-400">Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
