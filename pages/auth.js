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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Sign in with Magic Link</h2>
        <form onSubmit={sendMagicLink}>
          <input placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border rounded p-2 mb-4" />
          <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-4 py-2" disabled={loading}>{loading ? 'Sending...' : 'Send Magic Link'}</button>
        </form>
        {message && <p className="mt-3 text-sm text-gray-700">{message}</p>}
      </div>
    </div>
  )
}
