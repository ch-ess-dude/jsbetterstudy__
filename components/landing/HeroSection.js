import React from 'react'
import Link from 'next/link'

export default function HeroSection(){
  return (
    <section className="flex flex-col md:flex-row items-center justify-between gap-8 px-6 md:px-20 py-24">
      <div className="flex-1 max-w-2xl animate-fadeInLeft">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">Take Control of Your Study</h1>
        <p className="text-lg md:text-xl text-gray-700 mt-6">Track your study sessions, manage tasks, visualize your progress, and soon leverage AI tools — all in one platform.</p>
        <div className="mt-8">
          <Link href="/dashboard" className="px-8 py-4 rounded-xl bg-blue-600 text-white font-semibold shadow-lg hover:bg-blue-700 hover:scale-105 transition-all duration-300">Get Started</Link>
        </div>
      </div>

      <div className="w-full md:w-1/2 relative">
        <div className="w-full h-96 md:h-[28rem] bg-gray-100 rounded-xl shadow-lg flex items-center justify-center">
          <div className="text-gray-400">Dashboard screenshot placeholder</div>
        </div>
        <div className="absolute top-6 right-6 px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-xs font-medium">AI Features Coming Soon</div>
      </div>
    </section>
  )
}
