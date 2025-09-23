import { createClient } from '@supabase/supabase-js'

// Read env vars (public keys expected on the client-side), but don't crash the build if they're missing.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase

if (!supabaseUrl || !supabaseAnonKey) {
  // Warn instead of throwing — many CI/build environments won't have runtime envs set.
  // Provide a safe no-op shim for common methods used in the app (auth, from)
  // so the client-side app won't crash if env vars are missing. This preserves
  // graceful failure: operations become no-ops or return empty data.
  // eslint-disable-next-line no-console
  console.warn('Warning: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Using a safe shimbed supabase client for runtime.')

  const safePromise = (data = null) => Promise.resolve({ data, error: null })

  const shim = {
    auth: {
      getUser: () => Promise.resolve({ data: { user: null } }),
      signInWithOtp: () => Promise.resolve({ data: null, error: new Error('Auth not configured') }),
      signOut: async () => { return { error: null } },
      onAuthStateChange: () => ({ data: null, subscription: { unsubscribe: () => {} } }),
    },
    from: () => ({
      select: () => safePromise([]),
      insert: () => safePromise(null),
      update: () => safePromise(null),
      delete: () => safePromise(null),
      order: () => ({ select: () => safePromise([]) }),
      eq: () => ({ select: () => safePromise([]) }),
      gte: () => ({ select: () => safePromise([]) }),
    }),
    // basic onAuthStateChange placeholder
    authOn: () => ({ subscription: { unsubscribe: () => {} } }),
  }

  supabase = shim
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }