import React from 'react'
import Link from 'next/link'

export default function About(){
  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="h-16" />
      <main className="max-w-4xl mx-auto px-6 md:px-20 py-16">
        <h1 className="text-3xl font-bold text-zinc-100">About Just Better Study</h1>
        <p className="text-zinc-400 mt-4">
          We're building a focused, free productivity toolkit for students:
          Pomodoro, Tasks, session tracking, and analytics — no distractions, no paywalls.
        </p>

        <section className="mt-8 bg-zinc-800 p-6 rounded shadow">
          <h3 className="font-semibold text-zinc-100">Our mission</h3>
          <p className="text-sm text-zinc-400 mt-2">Help learners build consistent study habits with simple, measurable features.</p>
        </section>

        <section className="mt-6 bg-zinc-800 p-6 rounded shadow">
          <h3 className="font-semibold text-zinc-100">Open values</h3>
          <p className="text-sm text-zinc-400 mt-2">Free, privacy-respecting, and user-first. No dark patterns, just tools that help.</p>
        </section>

        <div className="mt-8">
          <Link href="/" className="text-zinc-400">\u2190 Back to home</Link>
        </div>
      </main>
    </div>
  )
}
