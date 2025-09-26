import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function useRequireAuth() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    let mounted = true

    // helper to set user state safely
    async function setFromGetUser() {
      try {
        const { data } = await supabase.auth.getUser()
        if (!mounted) return
        const authUser = data?.user || null

        if (!authUser) {
          // Not authenticated: ensure loading is false before redirect so pages don't stay stuck
          setUser(null)
          setLoading(false)
          // redirect to auth page (replace so back button doesn't go back to protected page)
          router.replace('/auth')
          return
        }

        // Upsert into users table so we have an app-level user row
        try {
          const payload = {
            id: authUser.id,
            email: authUser.email || null,
            name: authUser.user_metadata?.full_name || authUser.user_metadata?.name || null,
            avatar_url: authUser.user_metadata?.avatar_url || null
          }
          await supabase.from('users').upsert(payload, { returning: 'minimal' })
        } catch (e) {
          console.error('user upsert failed', e)
        }

        setUser(authUser)
        setLoading(false)
      } catch (err) {
        console.error('auth check err', err)
        if (mounted) setLoading(false)
      }
    }

    setFromGetUser()

    // Subscribe to auth state changes so login / logout update the hook in real-time
    // onAuthStateChange returns an object like { data: { subscription } }
    let subscription = null
    try {
      const res = supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
          const authUser = session?.user || null
          setUser(authUser)
          setLoading(false)
        } else if (event === 'SIGNED_OUT' || event === 'USER_DELETED') {
          setUser(null)
          setLoading(false)
          // if currently on a protected page, redirect to /auth
          if (router && router.pathname && router.pathname !== '/auth') router.replace('/auth')
        }
      })
      // Try to grab the subscription safely
      subscription = res?.data?.subscription || res?.subscription || null
    } catch (e) {
      // ignore subscription errors for shimmed clients
    }

    return () => {
      mounted = false
      try { subscription?.unsubscribe?.() } catch (e) {}
    }
  }, [])

  return { loading, user }
}
