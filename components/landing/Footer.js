import Link from 'next/link'
import React from 'react'

export default function Footer(){
  return (
    <footer className="flex flex-col md:flex-row justify-between items-center px-6 md:px-20 py-8 border-t border-gray-200">
      <div className="text-gray-600 text-sm">Just Better Study © {new Date().getFullYear()}</div>
      <div className="space-x-4 mt-3 md:mt-0">
        <Link href="/about" className="text-gray-500 hover:text-gray-900 text-sm">About</Link>
        <Link href="/privacy" className="text-gray-500 hover:text-gray-900 text-sm">Privacy</Link>
        <Link href="/contact" className="text-gray-500 hover:text-gray-900 text-sm">Contact</Link>
      </div>
    </footer>
  )
}
