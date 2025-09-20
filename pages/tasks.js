import React from 'react'
import TasksManager from '../components/TasksManager'

export default function Tasks() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Tasks</h2>
      <p className="text-zinc-600 mt-2">Create and manage your to-dos here.</p>

      <div className="mt-4">
        <TasksManager />
      </div>
    </div>
  )
}
