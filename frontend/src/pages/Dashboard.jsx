import { useNavigate } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useAuth } from '../features/authentication/hooks/useAuth'

import AdminDashboard from '../features/dashboard/pages/AdminDashboard'
import OwnerDashboard from '../features/dashboard/pages/OwnerDashboard'
import StaffDashboard from '../features/dashboard/pages/StaffDashboard'

export default function Dashboard() {
  const navigate = useNavigate()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const renderDashboard = () => {
    if (!user) return <p>Loading workspace...</p>
    
    switch (user.role) {
      case 'admin':
        return <AdminDashboard user={user} />
      case 'owner':
        return <OwnerDashboard user={user} />
      case 'staff':
        return <StaffDashboard user={user} />
      default:
        return <OwnerDashboard user={user} /> // fallback just in case
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* ── TOP NAV ── */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[#264027]">
          <Icon icon="solar:chart-square-bold" className="text-2xl" />
          <h1 className="text-2xl font-bold tracking-widest">LESS</h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm font-semibold text-gray-500 hover:text-red-500 flex items-center gap-2 transition"
        >
          <Icon icon="solar:logout-2-linear" className="text-lg" />
          Logout
        </button>
      </header>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 p-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold text-[#1a2e35] mb-2">
                Welcome, {user?.first_name || 'User'}
              </h2>
              <p className="text-gray-500 font-medium">
                Role: <span className="uppercase text-[#264027] font-bold">{user?.role}</span>
              </p>
            </div>
          </div>
          
          {/* Dynamic Render based on Role */}
          {renderDashboard()}

        </div>
      </div>
    </div>
  )
}
