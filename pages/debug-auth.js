import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function DebugAuth() {
  const [info, setInfo] = useState({ user: null, session: null, storage: {} })

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const userRes = await supabase.auth.getUser()
        const sessionRes = await supabase.auth.getSession?.() || { data: null }
        const storage = {}
        try {
          for (const k of Object.keys(localStorage || {})) {
            storage[k] = localStorage.getItem(k)
          }
        } catch (e) {
          // ignore
        }
        if (!mounted) return
        setInfo({ user: userRes?.data?.user || null, session: sessionRes?.data?.session || null, storage })
      } catch (err) {
        console.error('debug auth err', err)
      }
    })()
    return () => { mounted = false }
  }, [])

  return (
    <div className="p-6 bg-zinc-900 text-zinc-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Auth Debug</h1>
      <section className="mb-4">
        <h2 className="font-medium">User</h2>
        <pre className="bg-zinc-800 p-3 rounded mt-2 text-sm overflow-auto">{JSON.stringify(info.user, null, 2)}</pre>
      </section>
      <section className="mb-4">
        <h2 className="font-medium">Session</h2>
        <pre className="bg-zinc-800 p-3 rounded mt-2 text-sm overflow-auto">{JSON.stringify(info.session, null, 2)}</pre>
      </section>
      <section>
        <h2 className="font-medium">localStorage (keys)</h2>
        <pre className="bg-zinc-800 p-3 rounded mt-2 text-sm overflow-auto">{JSON.stringify(Object.keys(info.storage || {}).slice(0,50), null, 2)}</pre>
      </section>
    </div>
  )
}
