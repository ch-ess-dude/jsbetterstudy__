import React, { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Dashboard() {
  const [stats, setStats] = useState({ study_time_seconds: 0, sessions_completed: 0, tasks_completed: 0, tasks_left: 0 })
  const [weeklyProgress, setWeeklyProgress] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const { data } = await supabase.auth.getUser()
      const user = data?.user || null
      if (!user) {
        setLoading(false)
        return
      }

      // aggregate totals from analytics table
      const { data: rows } = await supabase.from('analytics').select('study_time_seconds, sessions_completed, tasks_completed, tasks_left').eq('user_id', user.id)
      const totals = (rows || []).reduce((acc, r) => {
        acc.study_time_seconds += r.study_time_seconds || 0
        acc.sessions_completed += r.sessions_completed || 0
        acc.tasks_completed += r.tasks_completed || 0
        acc.tasks_left += r.tasks_left || 0
        return acc
      }, { study_time_seconds: 0, sessions_completed: 0, tasks_completed: 0, tasks_left: 0 })

      setStats(totals)

      // weekly progress: compute study_time_seconds for this week vs goal (default 10 hours)
      const today = new Date()
      const first = new Date(today.setDate(today.getDate() - today.getDay())) // sunday
      const start = first.toISOString().slice(0,10)
      const { data: weekRows } = await supabase.from('analytics').select('date,study_time_seconds').eq('user_id', user.id).gte('date', start)
      const weekTotal = (weekRows || []).reduce((s,r)=>s+(r.study_time_seconds||0),0)
      const weeklyGoal = 10 * 60 * 60 // 10 hours
      setWeeklyProgress(Math.min(100, Math.round((weekTotal / weeklyGoal) * 100)))

      setLoading(false)
    })()
  }, [])

  if (loading) return <div>Loading dashboard...</div>

  return (
    <div>
      <h2 className="text-2xl font-semibold">Dashboard</h2>
      <p className="text-zinc-600 mt-2">Analytics overview, quick start, and AI placeholders.</p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-4 bg-white rounded shadow">Total study hours: {(stats.study_time_seconds/3600).toFixed(2)}</div>
        <div className="p-4 bg-white rounded shadow">Sessions completed: {stats.sessions_completed}</div>
        <div className="p-4 bg-white rounded shadow">Tasks completed: {stats.tasks_completed}</div>
        <div className="p-4 bg-white rounded shadow">Tasks left: {stats.tasks_left}</div>
        <div className="p-4 bg-white rounded shadow col-span-1 md:col-span-2">
          <div className="flex items-center justify-between">
            <div>Weekly progress</div>
            <div>{weeklyProgress}%</div>
          </div>
          <div className="w-full bg-zinc-200 h-3 rounded mt-2">
            <div className="bg-zinc-800 h-3 rounded" style={{ width: `${weeklyProgress}%` }} />
          </div>
        </div>
      </div>
    </div>
  )
}
