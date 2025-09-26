import React from 'react'
import Link from 'next/link'

export default function Contact(){
  return (
    <div className="min-h-screen bg-zinc-900">
      <div className="h-16" />
      <main className="max-w-4xl mx-auto px-6 md:px-20 py-16">
        <h1 className="text-3xl font-bold text-zinc-100">Contact</h1>
        <p className="text-zinc-400 mt-4">Have feedback or a suggestion? We'd love to hear from you.</p>

        <section className="mt-6 bg-zinc-800 p-6 rounded shadow">
          <form className="grid gap-4">
            <input className="border border-zinc-700 bg-zinc-900 text-zinc-100 p-2 rounded" placeholder="Your name" />
            <input className="border border-zinc-700 bg-zinc-900 text-zinc-100 p-2 rounded" placeholder="you@example.com" />
            <textarea className="border border-zinc-700 bg-zinc-900 text-zinc-100 p-2 rounded" placeholder="Message" rows="6" />
            <button className="self-start px-4 py-2 bg-zinc-700 text-zinc-100 rounded">Send</button>
          </form>
        </section>

        <div className="mt-8">
          <Link href="/" className="text-zinc-400">{"\u2190"} Back to home</Link>
        </div>
      </main>
    </div>
  )
}
