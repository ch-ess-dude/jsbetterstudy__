import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import { supabase } from '../lib/supabaseClient'

export default function Layout({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      const { data } = await supabase.auth.getUser()
      if (!mounted) return
      setUser(data?.user || null)
    })()

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null)
    })

    return () => { mounted = false; listener?.subscription?.unsubscribe?.() }
  }, [])

  async function signOut() {
    await supabase.auth.signOut()
    setUser(null)
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6">
        <header className="flex items-center justify-end gap-4 mb-4">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="text-sm">
                <div className="font-medium">{user.user_metadata?.full_name || user.email}</div>
                <div className="text-xs text-zinc-500">{user.email}</div>
              </div>
              <button onClick={signOut} className="btn btn-ghost">Sign out</button>
            </div>
          ) : (
            <div className="text-sm text-zinc-500">Not signed in</div>
          )}
        </header>
        {children}
      </main>
    </div>
  )
}
