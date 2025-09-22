import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md h-16">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 md:px-20">
        <Link href="/" className="flex items-center gap-3 hover:scale-105 transition-transform duration-300">
          <Image src="/logo.svg" alt="Just Better Study" width={36} height={36} />
          <span className="text-2xl font-extrabold text-gray-900">Just Better Study</span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link href="/features" className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">Features</Link>
          <Link href="/about" className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">About</Link>
          <Link href="/contact" className="px-3 py-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">Contact</Link>
          <div className="ml-4 flex items-center gap-2">
            <Link href="/account" className="px-4 py-2 rounded-lg bg-blue-600 text-white shadow hover:bg-blue-700 transition-all duration-200">Sign Up</Link>
            <Link href="/account" className="px-3 py-2 text-gray-700 hover:text-gray-900">Log In</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
