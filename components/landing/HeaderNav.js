import Link from 'next/link'
import React from 'react'
import Image from 'next/image'

export default function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 bg-zinc-900 border-b border-zinc-800 h-16">
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 md:px-20">
        <Link href="/" className="flex items-center gap-3 hover:opacity-90 transition-opacity duration-200">
          <Image src="/logo.svg" alt="Just Better Study" width={36} height={36} />
          <span className="text-2xl font-extrabold text-zinc-100">Just Better Study</span>
        </Link>

        <nav className="flex items-center gap-3">
          <Link href="/features" className="px-3 py-2 text-zinc-400 hover:text-zinc-100 transition-colors duration-200">Features</Link>
          <Link href="/about" className="px-3 py-2 text-zinc-400 hover:text-zinc-100 transition-colors duration-200">About</Link>
          <Link href="/contact" className="px-3 py-2 text-zinc-400 hover:text-zinc-100 transition-colors duration-200">Contact</Link>
          <div className="ml-4 flex items-center gap-2">
            <Link href="/account" className="px-4 py-2 rounded-lg bg-zinc-800 text-zinc-100 shadow-sm hover:opacity-95 transition-all duration-200">Sign Up</Link>
            <Link href="/account" className="px-3 py-2 text-zinc-300 hover:text-zinc-100">Log In</Link>
          </div>
        </nav>
      </div>
    </header>
  )
}
