import Link from 'next/link'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useRouter } from 'next/router'

export default function Home() {
  const [showAbout, setShowAbout] = useState(false)
  const [showContact, setShowContact] = useState(false)
  const router = useRouter()

  useEffect(() => {
    let mounted = true
    async function check() {
      const { data } = await supabase.auth.getUser()
      if (!mounted) return
      if (data?.user) router.replace('/dashboard')
    }
    check()
    return () => { mounted = false }
  }, [])

  return (
    <div className="min-h-screen bg-zinc-900 text-zinc-200">
      <nav className="sticky top-0 bg-zinc-900 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
          <div className="text-2xl font-bold text-zinc-100">JsBetter Study</div>
          <div className="flex items-center space-x-6">
            <a href="#about" className="hover:underline transform hover:scale-105 transition duration-200">About Us</a>
            <a href="#contact" className="hover:underline transform hover:scale-105 transition duration-200">Contact Us</a>
            <Link href="/auth" className="pill-cta bg-zinc-700 hover:bg-zinc-600 text-zinc-100">Enter Productivity</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto text-center py-20 px-6">
  <h1 className="text-3xl md:text-4xl font-bold mb-6 animate-fadeIn">Hey! Ever felt stuck when trying to lock into 'flow state'? And got frustrated with the many things 'gurus' are telling you to do?</h1>
  <p className="max-w-xl mx-auto text-zinc-300 mb-6 animate-fadeIn" style={{ animationDelay: '150ms' }}>Well we did too. Founder Aayaan Sultan and co-founder Ambhrin Mahanty faced frustration and wanted to give up on 'productivity'. Then we figured, 'Why don’t we make something to help us?' From that, JsBetter was birthed, with its priority product, JsBetter Study, which combines all the best and effective methods, for your productivity and convenience! Enjoy Launch Trial for the foreseeable future, because paywalls aren’t great. Here’s to completing goals, and LOCKING IN.</p>
        <div className="mt-6">
          <Link href="/auth" className="inline-block pill-cta bg-zinc-700 hover:bg-zinc-600 text-zinc-100">Enter Productivity</Link>
        </div>
      </main>

      <section id="contact" className="text-center py-10">
        <p className="text-zinc-300">Reach us at: <a className="text-zinc-200" href="mailto:hb685612@gmail.com">hb685612@gmail.com</a></p>
      </section>

      <footer className="text-center py-6 text-sm text-zinc-500">© {new Date().getFullYear()} JsBetter Study</footer>
    </div>
  )
}
