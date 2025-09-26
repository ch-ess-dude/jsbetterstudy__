import { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const router = useRouter()

  async function sendMagicLink(e) {
    e.preventDefault()
    setLoading(true)
    setMessage('')
    const { error } = await supabase.auth.signInWithOtp({ email, options: { redirectTo: `${window.location.origin}/dashboard` } })
    if (error) setMessage(error.message)
    else setMessage('Magic link sent. Check your email.')
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 p-4">
      <div className="max-w-md w-full bg-zinc-800 rounded-lg shadow-md p-6 text-zinc-200">
        <h2 className="text-xl font-semibold mb-4">Sign in with Magic Link</h2>
        <form onSubmit={sendMagicLink}>
          <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded p-2 mb-4 bg-zinc-900 text-zinc-200" />
          <button className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-100 rounded-full px-4 py-2" disabled={loading}>{loading ? 'Sending...' : 'Send Magic Link'}</button>
        </form>
        {message && <p className="mt-3 text-sm text-zinc-300">{message}</p>}
      </div>
    </div>
  )
}
