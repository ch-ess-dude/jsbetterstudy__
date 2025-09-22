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
    <div className="min-h-screen bg-gray-50">
      <nav className="sticky top-0 bg-white shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between p-4">
          <div className="text-2xl font-bold text-gray-900">JsBetter Study</div>
          <div className="flex items-center space-x-6">
            <button className="hover:underline transform hover:scale-105 transition duration-200" onClick={() => setShowAbout(true)}>About Us</button>
            <button className="hover:underline transform hover:scale-105 transition duration-200" onClick={() => setShowContact(true)}>Contact Us</button>
            <Link href="/auth" className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 py-3 drop-shadow transform hover:scale-105 transition duration-200">Enter Productivity</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto text-center py-20 px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">Hey! Ever felt stuck when trying to lock into 'flow state'? And got frustrated with the many things 'gurus' are telling you to do?</h1>
        <p className="max-w-xl mx-auto text-gray-700 mb-6">Well we did too. Founder Aayaan Sultan and co-founder Ambhrin Mahanty faced frustration and wanted to give up on 'productivity'. Then we figured, 'Why don’t we make something to help us?' From that, JsBetter was birthed, with its priority product, JsBetter Study, which combines all the best and effective methods, for your productivity and convenience! Enjoy Launch Trial for the foreseeable future, because paywalls aren’t great. Here’s to completing goals, and LOCKING IN.</p>
        <div className="mt-6">
          <Link href="/auth" className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-8 py-4 drop-shadow transform hover:scale-105 transition duration-200">Enter Productivity</Link>
        </div>
      </main>

      <section id="contact" className="text-center py-10">
        <p className="text-gray-700">Reach us at: <a className="text-indigo-600" href="mailto:hb685612@gmail.com">hb685612@gmail.com</a></p>
      </section>

      <footer className="text-center py-6 text-sm text-gray-500">© {new Date().getFullYear()} JsBetter Study</footer>
    </div>
  )
}
