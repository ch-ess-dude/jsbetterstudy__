import Link from "next/link";

export default function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 bg-zinc-900/95 backdrop-blur-md shadow-md h-16 flex items-center justify-between px-6 md:px-20">
      <div className="text-2xl font-extrabold text-zinc-100">Just Better Study</div>
      <nav className="flex items-center gap-4">
        <Link href="#features" className="text-zinc-400 hover:text-zinc-100 px-4 py-2 transition-colors duration-200">Features</Link>
        <Link href="#about" className="text-zinc-400 hover:text-zinc-100 px-4 py-2 transition-colors duration-200">About</Link>
        <Link href="#contact" className="text-zinc-400 hover:text-zinc-100 px-4 py-2 transition-colors duration-200">Contact</Link>
        <Link href="/dashboard" className="bg-zinc-700 text-zinc-100 px-5 py-2 rounded-lg shadow hover:bg-zinc-600 transition-all duration-200">Get Started</Link>
      </nav>
    </header>
  )
}
