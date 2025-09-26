import Sidebar from '../Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-zinc-900">
      <Sidebar />
      <main className="flex-1 p-6 bg-zinc-900">{children}</main>
    </div>
  )
}
