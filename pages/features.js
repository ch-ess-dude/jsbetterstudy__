import React from 'react'
import Link from 'next/link'

export default function Features(){
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-16" />
      <main className="max-w-4xl mx-auto px-6 md:px-20 py-16">
        <h1 className="text-3xl font-bold">Features</h1>
        <p className="text-zinc-600 mt-4">Just Better Study focuses on lightweight productivity features you actually use.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          <div className="p-6 bg-white rounded shadow">
            <h3 className="font-semibold">Pomodoro Timer</h3>
            <p className="text-sm text-zinc-600 mt-2">Built-in Pomodoro sessions with automatic tracking of study time.</p>
          </div>

          <div className="p-6 bg-white rounded shadow">
            <h3 className="font-semibold">Tasks</h3>
            <p className="text-sm text-zinc-600 mt-2">Simple task list with due dates and completion tracking.</p>
          </div>

          <div className="p-6 bg-white rounded shadow">
            <h3 className="font-semibold">Analytics</h3>
            <p className="text-sm text-zinc-600 mt-2">Daily summaries, weekly trends, and tasks breakdown.</p>
          </div>

          <div className="p-6 bg-white rounded shadow">
            <h3 className="font-semibold">Privacy-first</h3>
            <p className="text-sm text-zinc-600 mt-2">Your study data stays private — we only store what helps you improve.</p>
          </div>
        </div>

        <div className="mt-8">
          <Link href="/" className="text-blue-600">← Back to home</Link>
        </div>
      </main>
    </div>
  )
}
