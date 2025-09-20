import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6 border-b">
        <h1 className="text-xl font-semibold">Just Better Study</h1>
      </div>
      <nav className="p-4">
        <ul className="space-y-2">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/timer">Timer</Link></li>
          <li><Link href="/tasks">Tasks</Link></li>
          <li><Link href="/analytics">Analytics</Link></li>
          <li><Link href="/flashcards">Flashcards</Link></li>
          <li><Link href="/summaries">Summaries</Link></li>
          <li><Link href="/courses">Courses</Link></li>
          <li><Link href="/chat">Chat</Link></li>
          <li><Link href="/account">Account</Link></li>
        </ul>
      </nav>
    </aside>
  )
}
