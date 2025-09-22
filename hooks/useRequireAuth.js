import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function useRequireAuth() {
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    async function check() {
      const { data } = await supabase.auth.getUser()
      if (!mounted) return
      const authUser = data?.user
      if (!authUser) {
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
    }
    check()
    return () => { mounted = false }
  }, [])

  return { loading, user }
}
