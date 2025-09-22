import Sidebar from '../Sidebar'

export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen flex bg-white">
      <Sidebar />
      <main className="flex-1 p-6 bg-gray-50">{children}</main>
    </div>
  )
}
