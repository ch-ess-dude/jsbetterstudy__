import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function useTasks() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      try {
        const { data, error } = await supabase.from('tasks').select('*').order('created_at', { ascending: false })
        if (error) throw error
        if (mounted) setTasks(data || [])
      } catch (err) {
        console.error('load tasks error', err)
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  // Optimistic create
  async function createTask(payload) {
    const temp = { id: `tmp_${Date.now()}`, ...payload, created_at: new Date().toISOString() }
    setTasks(prev => [temp, ...prev])
    try {
      const { data, error } = await supabase.from('tasks').insert(payload).select().single()
      if (error) throw error
      setTasks(prev => prev.map(t => (t.id === temp.id ? data : t)))
      return data
    } catch (err) {
      console.error('createTask error', err)
      // rollback
      setTasks(prev => prev.filter(t => t.id !== temp.id))
      throw err
    }
  }

  // Optimistic update
  async function updateTask(id, changes) {
    const before = tasks.find(t => t.id === id)
    setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...changes } : t)))
    try {
      const { data, error } = await supabase.from('tasks').update(changes).eq('id', id).select().single()
      if (error) throw error
      setTasks(prev => prev.map(t => (t.id === id ? data : t)))
      return data
    } catch (err) {
      console.error('updateTask error', err)
      // rollback
      setTasks(prev => prev.map(t => (t.id === id ? before : t)))
      throw err
    }
  }

  // Optimistic delete
  async function deleteTask(id) {
    const before = tasks
    setTasks(prev => prev.filter(t => t.id !== id))
    try {
      const { error } = await supabase.from('tasks').delete().eq('id', id)
      if (error) throw error
      return true
    } catch (err) {
      console.error('deleteTask error', err)
      setTasks(before)
      throw err
    }
  }

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    refresh: async () => {
      setLoading(true)
      const { data } = await supabase.from('tasks').select('*').order('created_at', { ascending: false })
      setTasks(data || [])
      setLoading(false)
    }
  }
}
