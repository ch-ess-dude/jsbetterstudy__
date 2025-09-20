import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function AuthForm() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function signIn(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithOtp({ email })
    if (error) setMessage(error.message)
    else setMessage('Check your email for a login link')
    setLoading(false)
  }

  return (
    <div className="card max-w-md">
      <h3 className="text-lg font-semibold">Sign in / Sign up</h3>
      <p className="muted text-sm">Enter your email to receive a magic link (no password required).</p>
      <form onSubmit={signIn} className="mt-4 flex gap-2">
        <input className="flex-1 border p-2 rounded" placeholder="you@example.com" value={email} onChange={e=>setEmail(e.target.value)} />
        <button className="btn btn-primary" disabled={loading}>{loading ? 'Sending...' : 'Send'}</button>
  </form>
  {message && <div className="mt-3 text-sm text-zinc-600">{message}</div>}
    </div>
  )
}
