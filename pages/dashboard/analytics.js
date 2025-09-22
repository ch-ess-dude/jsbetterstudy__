import { useEffect, useState } from 'react'
import { Line, Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, TimeScale } from 'chart.js'
import 'chartjs-adapter-date-fns'
import { supabase } from '../../lib/supabaseClient'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend, TimeScale)

export default function AnalyticsPage() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      const user = (await supabase.auth.getUser()).data?.user
      if (!user) {
        setData([])
        setLoading(false)
        return
      }
      const { data: rows, error } = await supabase
        .from('analytics')
        .select('*')
        .eq('user_id', user.id)
        .order('date', { ascending: true })
        .limit(365)

      if (error) {
        console.error('analytics load error', error)
      } else if (mounted) {
        setData(rows || [])
      }
      setLoading(false)
    }
    load()
    return () => { mounted = false }
  }, [])

  const dates = data.map((r) => r.date)
  const studySeconds = data.map((r) => r.study_time_seconds)
  const sessions = data.map((r) => r.sessions_completed)
  const tasksCompleted = data.map((r) => r.tasks_completed)

  const lineOptions = { responsive: true, plugins: { legend: { display: false } }, scales: { x: { type: 'time' } } }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="card p-4">
            <h3 className="font-medium mb-2">Study Time (seconds)</h3>
            <Line data={{ labels: dates, datasets: [{ label: 'Study time', data: studySeconds, borderColor: '#3b82f6', backgroundColor: 'rgba(59,130,246,0.2)' }] }} options={lineOptions} />
          </div>

          <div className="card p-4">
            <h3 className="font-medium mb-2">Sessions Completed</h3>
            <Bar data={{ labels: dates, datasets: [{ label: 'Sessions', data: sessions, backgroundColor: '#10b981' }] }} options={{ responsive: true }} />
          </div>

          <div className="card p-4 md:col-span-2">
            <h3 className="font-medium mb-2">Tasks Completed vs Left (last period)</h3>
            <Pie data={{ labels: ['Completed', 'Left'], datasets: [{ data: [tasksCompleted.reduce((a,b)=>a+b,0), data.reduce((a,b)=>a.tasks_left + a, 0) || 0], backgroundColor: ['#60a5fa', '#f97316'] }] }} />
          </div>
        </div>
      )}
    </div>
  )
}
