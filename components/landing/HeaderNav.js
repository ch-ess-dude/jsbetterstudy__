import Link from 'next/link'
import React from 'react'

export default function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md h-16">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 md:px-20">
        <Link href="/" className="text-2xl font-extrabold text-gray-900 hover:scale-105 transition-transform duration-300">Just Better Study</Link>

        <nav className="flex items-center gap-2">
          <Link href="#features" className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">Features</Link>
          <Link href="#about" className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">About</Link>
          <Link href="#contact" className="px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">Contact</Link>
          <div className="ml-4 flex items-center gap-2">
            <Link href="/account" className="px-5 py-2 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 transition-all duration-200">Sign Up</Link>
            <Link href="/account" className="px-5 py-2 text-gray-700 hover:text-gray-900">Log In</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
