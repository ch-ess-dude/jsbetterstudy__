import React from 'react'
import Link from 'next/link'

export default function About(){
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="h-16" />
      <main className="max-w-4xl mx-auto px-6 md:px-20 py-16">
        <h1 className="text-3xl font-bold">About Just Better Study</h1>
        <p className="text-zinc-600 mt-4">We're building a focused, free productivity toolkit for students: Pomodoro, Tasks, session tracking, and analytics — no distractions, no paywalls.</p>

        <section className="mt-8 bg-white p-6 rounded shadow">
          <h3 className="font-semibold">Our mission</h3>
          <p className="text-sm text-zinc-600 mt-2">Help learners build consistent study habits with simple, measurable features.</p>
        </section>

        <section className="mt-6 bg-white p-6 rounded shadow">
          <h3 className="font-semibold">Open values</h3>
          <p className="text-sm text-zinc-600 mt-2">Free, privacy-respecting, and user-first. No dark patterns, just tools that help.</p>
        </section>

        <div className="mt-8">
          <Link href="/" className="text-blue-600">← Back to home</Link>
        </div>
      </main>
    </div>
  )
}
