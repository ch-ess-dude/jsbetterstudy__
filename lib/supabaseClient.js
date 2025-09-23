import { createClient } from '@supabase/supabase-js'

// Read env vars (public keys expected on the client-side), but don't crash the build if they're missing.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase

if (!supabaseUrl || !supabaseAnonKey) {
  // Warn instead of throwing — many CI/build environments won't have runtime envs set.
  // Export a runtime-shim that throws when used so developers get a clear error if they attempt to call it.
  // eslint-disable-next-line no-console
  console.warn('Warning: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY is missing. Supabase client will throw if used at runtime.')

  const shim = new Proxy({}, {
    get() {
      return () => { throw new Error('Supabase client is not configured. Ensure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.') }
    }
  })

  supabase = shim
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

export { supabase }