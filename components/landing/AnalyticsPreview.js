import React, { useEffect, useState } from 'react'
import { Line, Pie } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'
import { supabase } from '../../lib/supabaseClient'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
)

function formatDateShort(d) {
  return d.toLocaleDateString(undefined, { weekday: 'short' })
}

export default function AnalyticsPreview(){
  const [analytics, setAnalytics] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    async function load() {
      setLoading(true)
      setError(null)
      try {
        // fetch last 7 days of analytics ordered asc
        const { data, error } = await supabase
          .from('analytics')
          .select('date, study_time_seconds, sessions_completed, tasks_completed, tasks_left')
          .order('date', { ascending: false })
          .limit(7)

        if (error) throw error
        if (!mounted) return
        // ensure we have a row for each of the last 7 days (fill zeros)
        const today = new Date()
        const rowsByDate = {}
        data.forEach(r => { rowsByDate[new Date(r.date).toDateString()] = r })
        const filled = []
        for (let i = 6; i >= 0; i--) {
          const d = new Date(today)
          d.setDate(today.getDate() - i)
          const key = d.toDateString()
          if (rowsByDate[key]) {
            filled.push(rowsByDate[key])
          } else {
            filled.push({ date: d.toISOString().slice(0,10), study_time_seconds: 0, sessions_completed: 0, tasks_completed: 0, tasks_left: 0 })
          }
        }
        setAnalytics(filled)
      } catch (err) {
        console.error('Analytics load error', err)
        setError(err.message || String(err))
      } finally {
        if (mounted) setLoading(false)
      }
    }
    load()
    return () => { mounted = false }
  }, [])

  const labels = analytics.map(a => formatDateShort(new Date(a.date)))
  const studyData = analytics.map(a => Math.round((a.study_time_seconds || 0) / 60)) // minutes

  const lineDataset = {
    labels,
    datasets: [
      {
        label: 'Study minutes',
        data: studyData,
        borderColor: '#111827',
        backgroundColor: 'rgba(17,24,39,0.08)',
        tension: 0.25,
        fill: true,
      }
    ]
  }

  const totalTasksCompleted = analytics.reduce((s, a) => s + (a.tasks_completed || 0), 0)
  const totalTasksLeft = analytics.reduce((s, a) => s + (a.tasks_left || 0), 0)
  const pieData = {
    labels: ['Completed', 'Remaining'],
    datasets: [{
      data: [totalTasksCompleted, totalTasksLeft],
      backgroundColor: ['#10B981', '#F97316'],
      hoverOffset: 6
    }]
  }

  return (
    <section className="flex flex-col md:flex-row gap-8 px-6 md:px-20 py-16">
      <div className="w-full md:w-1/2 h-64 bg-white rounded-lg p-4 shadow">
        <h4 className="text-sm font-semibold mb-2">Study (last 7 days)</h4>
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-red-600">Error loading analytics: {error}</div>
        ) : (
          <Line data={lineDataset} options={{
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: { y: { beginAtZero: true } }
          }} />
        )}
      </div>

      <div className="w-full md:w-1/2 h-64 bg-white rounded-lg p-4 shadow">
        <h4 className="text-sm font-semibold mb-2">Tasks (7 days total)</h4>
        {loading ? (
          <div className="flex items-center justify-center h-full text-gray-400">Loading...</div>
        ) : error ? (
          <div className="text-red-600">Error loading analytics: {error}</div>
        ) : (
          <div className="flex items-center justify-center h-full">
            {(totalTasksCompleted + totalTasksLeft) === 0 ? (
              <div className="text-gray-400">No task data yet</div>
            ) : (
              <div className="w-40 h-40">
                <Pie data={pieData} options={{ maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }} />
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
