import Link from 'next/link'
import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { supabase } from '../lib/supabaseClient'

const navItems = [
  { key: 'home', label: 'Home', href: '/', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z"></path></svg>
  )},
  { key: 'dashboard', label: 'Dashboard', href: '/dashboard', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h7v7H3V3zM14 3h7v7h-7V3zM14 14h7v7h-7v-7zM3 14h7v7H3v-7z"></path></svg>
  )},
  { key: 'timer', label: 'Timer', href: '/timer', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3M6.5 3.5l-.5 2M20.5 7.5l-1.5 1.5M12 2a10 10 0 100 20 10 10 0 000-20z"></path></svg>
  )},
  { key: 'tasks', label: 'Tasks', href: '/tasks', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7 7h10M7 17h10"></path></svg>
  )},
  // analytics removed per user request
  { key: 'flashcards', label: 'Flashcards', href: '/flashcards', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h12a2 2 0 002-2V7M8 7v10M16 7v10"></path></svg>
  )},
  { key: 'summaries', label: 'Summaries', href: '/summaries', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"></path></svg>
  )},
  { key: 'courses', label: 'Courses', href: '/courses', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6l8 4-8 4-8-4 8-4zM12 14l8 4-8 4-8-4 8-4z"></path></svg>
  )},
  { key: 'chat', label: 'Chat', href: '/chat', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8-1.122 0-2.188-.173-3.172-.49L3 20l1.49-3.828C3.56 15.06 3 13.57 3 12 3 7.582 7.03 4 12 4s9 3.582 9 8z"></path></svg>
  )},
  { key: 'account', label: 'Account', href: '/account', icon: (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A9 9 0 1118.879 6.196 9 9 0 015.121 17.804z"></path></svg>
  )}
]

export default function Sidebar({ onLogout } = {}) {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    try {
      await supabase.auth.signOut()
    } catch (e) {
      console.error('logout error', e)
    }
    if (onLogout) onLogout()
    else router.push('/')
  }

  return (
    <aside className={`bg-zinc-900 border-r border-zinc-800 h-screen flex flex-col transition-all ${collapsed ? 'w-20' : 'w-64'}`}>
      <div className="p-4 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <div className={`text-lg font-bold text-zinc-200 ${collapsed ? 'hidden' : ''}`}>JsBetter</div>
          <div className={`text-lg font-bold text-zinc-200 ${collapsed ? '' : 'hidden'}`}>JB</div>
        </div>
        <button aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} onClick={() => setCollapsed(s => !s)} className="p-1 rounded hover:bg-zinc-800">
          {collapsed ? (
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.293 9.293a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd"/></svg>
          ) : (
            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M13.707 10.707a1 1 0 01-1.414 0L10 8.414l-2.293 2.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 010 1.414z" clipRule="evenodd"/></svg>
          )}
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto">
        <ul className="p-2 space-y-1">
          {navItems.map(item => (
            <li key={item.key}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 p-2 rounded hover:bg-zinc-800 ${
                  router.pathname === item.href ? 'bg-zinc-700 font-medium' : ''
                }`}
                title={item.label}
              >
                <div
                  className={`${
                    router.pathname === item.href ? 'text-zinc-100' : 'text-zinc-400'
                  }`}
                >
                  {item.icon}
                </div>
                <span
                  className={`${collapsed ? 'hidden' : 'block'} ${
                    router.pathname === item.href ? 'text-zinc-100' : 'text-zinc-400'
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-3 border-t">
        <div className="flex items-center justify-between gap-2">
            <div className="flex-1">
            <button onClick={handleLogout} className="w-full flex items-center gap-3 p-2 rounded hover:bg-zinc-800 text-zinc-200">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h5a2 2 0 012 2v1"></path></svg>
              <span className={`${collapsed ? 'hidden' : 'block'}`}>Logout</span>
            </button>
          </div>

          {/* Theme removed — permanent dark mode */}
        </div>
      </div>
    </aside>
  )
}
