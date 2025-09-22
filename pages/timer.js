import DashboardLayout from '../components/Layout/DashboardLayout'
import useRequireAuth from '../hooks/useRequireAuth'
import PomodoroManager from '../components/PomodoroManager'

export default function TimerPage() {
  const { loading } = useRequireAuth()
  if (loading) return <div>Loading...</div>

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">Timer</h1>
      <PomodoroManager />
    </DashboardLayout>
  )
}
