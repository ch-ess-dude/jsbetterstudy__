import React from 'react'
import HeaderNav from '../components/landing/HeaderNav'
import Link from 'next/link'

export default function Contact(){
  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderNav />
      <main className="max-w-4xl mx-auto px-6 md:px-20 py-16">
        <h1 className="text-3xl font-bold">Contact</h1>
        <p className="text-zinc-600 mt-4">Have feedback or a suggestion? We'd love to hear from you.</p>

        <section className="mt-6 bg-white p-6 rounded shadow">
          <form className="grid gap-4">
            <input className="border p-2 rounded" placeholder="Your name" />
            <input className="border p-2 rounded" placeholder="Your email" />
            <textarea className="border p-2 rounded" placeholder="Message" rows="6" />
            <button className="self-start px-4 py-2 bg-blue-600 text-white rounded">Send</button>
          </form>
        </section>

        <div className="mt-8">
          <Link href="/" className="text-blue-600">← Back to home</Link>
        </div>
      </main>
    </div>
  )
}
