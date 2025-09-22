import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { supabase } from '../../lib/supabaseClient'

export default function DashboardLayout({ children }) {
  const [collapsed, setCollapsed] = useState(false)
  const router = useRouter()

  async function handleLogout() {
    await supabase.auth.signOut()
    router.push('/')
  }

  return (
    <div className="min-h-screen flex bg-white">
      <aside className={`bg-gray-50 border-r ${collapsed ? 'w-20' : 'w-64'} transition-all`}> 
        <div className="p-4 h-full flex flex-col justify-between">
          <div>
            <button onClick={() => setCollapsed(!collapsed)} className="mb-4">{collapsed ? '→' : '←'}</button>
            <nav className="flex flex-col space-y-2">
              <Link href="/dashboard" className="p-2 hover:bg-indigo-50">Dashboard</Link>
              <Link href="/timer" className="p-2 hover:bg-indigo-50">Timer</Link>
              <Link href="/tasks" className="p-2 hover:bg-indigo-50">Tasks</Link>
              <div className="p-2 text-sm text-gray-400">PDFs (Coming Soon)</div>
              <div className="p-2 text-sm text-gray-400">Summaries (Coming Soon)</div>
              <div className="p-2 text-sm text-gray-400">Courses (Coming Soon)</div>
              <div className="p-2 text-sm text-gray-400">Quizzes (Coming Soon)</div>
              <div className="p-2 text-sm text-gray-400">Flashcards (Coming Soon)</div>
            </nav>
          </div>

          <div>
            <button onClick={handleLogout} className="w-full text-left p-2 text-sm text-red-600">Logout</button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  )
}
