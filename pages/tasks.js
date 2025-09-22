import DashboardLayout from '../components/Layout/DashboardLayout'
import useRequireAuth from '../hooks/useRequireAuth'
import useTasks from '../hooks/useTasks'
import TasksManager from '../components/TasksManager'

export default function TasksPage() {
  const { loading } = useRequireAuth()
  const { tasks, loading: tasksLoading, createTask, updateTask, deleteTask } = useTasks()

  if (loading) return <div>Loading...</div>

  return (
    <DashboardLayout>
      <h1 className="text-2xl font-semibold mb-4">Tasks</h1>
      <p className="text-zinc-600 mt-2">Create and manage your to-dos here.</p>

      <div className="mt-4">
        <TasksManager tasks={tasks} loading={tasksLoading} createTask={createTask} updateTask={updateTask} deleteTask={deleteTask} />
      </div>
    </DashboardLayout>
  )
}
