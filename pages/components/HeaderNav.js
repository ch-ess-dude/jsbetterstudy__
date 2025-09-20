import Link from "next/link";

export default function HeaderNav() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md shadow-md h-16 flex items-center justify-between px-6 md:px-20">
      <div className="text-2xl font-extrabold text-gray-900">Just Better Study</div>
      <nav className="flex items-center gap-4">
        <Link href="#features" className="text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors duration-200">Features</Link>
        <Link href="#about" className="text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors duration-200">About</Link>
        <Link href="#contact" className="text-gray-600 hover:text-gray-900 px-4 py-2 transition-colors duration-200">Contact</Link>
        <Link href="/dashboard" className="bg-blue-600 text-white px-5 py-2 rounded-lg shadow hover:bg-blue-700 transition-all duration-200">Get Started</Link>
      </nav>
    </header>
  )
}
