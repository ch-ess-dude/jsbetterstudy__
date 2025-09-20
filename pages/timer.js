import React from 'react'
import Pomodoro from '../components/Pomodoro'

export default function Timer() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Pomodoro Timer</h2>
      <p className="text-zinc-600 mt-2">Start a 25/5 session. Session logging saved locally (Supabase soon).</p>

      <div className="mt-4">
        <Pomodoro />
      </div>
    </div>
  )
}
