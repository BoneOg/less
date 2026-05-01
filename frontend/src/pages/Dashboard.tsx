import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { useAuth } from '../features/authentication/hooks/useAuth'

import AdminDashboard from '../features/dashboard/pages/AdminDashboard'
import UserDashboard from '../features/dashboard/pages/UserDashboard'
import StaffDashboard from '../features/dashboard/pages/StaffDashboard'

export default function Dashboard() {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, logout } = useAuth()
  const [isSidebarOpen, setSidebarOpen] = useState(false)
  const [isLogoutModalOpen, setLogoutModalOpen] = useState(false)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const navItems = [
    { name: 'Dashboard', icon: 'solar:home-smile-angle-bold-duotone', path: '/dashboard' },
    { name: 'Inventory', icon: 'solar:box-bold-duotone', path: '/inventory' },
    { name: 'Menu Builder', icon: 'solar:chef-hat-bold-duotone', path: '/menu' },
    { name: 'OCR Scanner', icon: 'solar:scanner-2-bold-duotone', path: '/ocr' },
    { name: 'Cost Analysis', icon: 'solar:graph-up-bold-duotone', path: '/analysis' },
    { name: 'Settings', icon: 'solar:settings-bold-duotone', path: '/settings' },
  ]

  const renderDashboard = () => {
    if (!user) return (
      <div className="flex flex-col items-center justify-center h-full min-h-[60vh] gap-4">
        <div className="w-12 h-12 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-slate-600 font-bold tracking-tight animate-pulse text-sm">Synchronizing System...</p>
      </div>
    )

    switch (user.role) {
      case 'admin': return <AdminDashboard user={user} />
      case 'user': return <UserDashboard user={user} />
      case 'staff': return <StaffDashboard user={user} />
      case 'owner': return <UserDashboard user={user} />
      default: return <UserDashboard user={user} />
    }
  }

  return (
    <div className="flex h-screen bg-[#FDFDFD] font-sans text-slate-900 overflow-hidden relative">

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"></div>
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 border border-slate-100">
            <div className="w-20 h-20 bg-red-50 rounded-3xl flex items-center justify-center mb-8 mx-auto">
              <Icon icon="solar:logout-3-bold-duotone" className="text-4xl text-red-500" />
            </div>
            <h3 className="text-2xl font-black text-slate-900 text-center mb-4">Confirm Logout</h3>
            <p className="text-slate-500 font-medium text-center mb-10 leading-relaxed">
              Are you sure you want to log out of your dashboard? All unsaved data might be lost.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => setLogoutModalOpen(false)}
                className="flex-1 py-4 bg-slate-50 hover:bg-slate-100 text-slate-600 rounded-2xl font-black text-sm uppercase tracking-widest transition-colors border border-slate-100"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="flex-1 py-4 bg-red-500 hover:bg-red-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-red-500/20 active:scale-95"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[60] lg:hidden animate-in fade-in duration-300"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-[#1E293B] flex flex-col z-[70] shadow-2xl transition-transform duration-500 ease-in-out lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-10 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-white rounded-[1.25rem] flex items-center justify-center shadow-lg shadow-emerald-500/10 transform -rotate-6 border border-slate-700/50">
              <img src="/images/logo.png" alt="less. logo" className="w-8 h-8 object-contain" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tighter text-white leading-none">LESS</h1>
              <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest mt-1">Smart Costing</p>
            </div>
          </div>
          <button
            className="lg:hidden text-slate-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(false)}
          >
            <Icon icon="solar:close-circle-linear" className="text-3xl" />
          </button>
        </div>

        <nav className="flex-1 px-6 space-y-1 mt-4 overflow-y-auto custom-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => { setSidebarOpen(false); }}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 group relative ${
                location.pathname === item.path
                ? 'bg-emerald-500 text-white shadow-xl shadow-emerald-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Icon icon={item.icon} className={`text-2xl transition-transform group-hover:scale-110 ${
                location.pathname === item.path ? 'text-white' : 'text-slate-500 group-hover:text-emerald-400'
              }`} />
              <span className="text-[13px] font-bold tracking-wide">{item.name}</span>
              {location.pathname === item.path && (
                <div className="absolute right-4 w-1.5 h-1.5 bg-white rounded-full"></div>
              )}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-slate-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20">
              <Icon icon="solar:user-bold-duotone" className="text-emerald-500 text-xl" />
            </div>
            <div>
              <p className="text-xs font-black text-white leading-none mb-1">{user?.first_name || 'User'}</p>
              <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest leading-none">{user?.role || 'Admin'}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col relative h-full overflow-hidden">
        {/* Navbar */}
        <header className="h-20 lg:h-24 bg-white/70 backdrop-blur-xl border-b border-slate-100 px-6 lg:px-12 flex items-center justify-between sticky top-0 z-40">
          <div className="flex items-center gap-4 lg:gap-0">
            <button
              className="lg:hidden w-10 h-10 flex items-center justify-center bg-slate-100 rounded-xl text-slate-600 active:scale-95 transition-all"
              onClick={() => setSidebarOpen(true)}
            >
              <Icon icon="solar:hamburger-menu-linear" className="text-2xl" />
            </button>
            <div className="hidden sm:flex items-center gap-4 bg-slate-100/50 px-6 py-3 rounded-2xl border border-transparent transition-all focus-within:bg-white focus-within:border-emerald-200 focus-within:shadow-xl focus-within:shadow-emerald-500/5 ml-4 lg:ml-0">
              <Icon icon="solar:magnifer-linear" className="text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm font-semibold text-slate-700 placeholder:text-slate-400 w-40 lg:w-80"
              />
            </div>
          </div>

          <div className="flex items-center gap-3 lg:gap-8">
            <button className="relative p-3 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-2xl transition-all">
              <Icon icon="solar:bell-bold-duotone" className="text-xl lg:text-2xl" />
              <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            <div className="flex items-center gap-5 pl-4 border-l border-slate-100">
              <button
                onClick={() => setLogoutModalOpen(true)}
                className="group w-10 h-10 lg:w-14 lg:h-14 bg-slate-50 border border-slate-100 rounded-xl lg:rounded-2xl flex items-center justify-center text-slate-400 hover:bg-red-50 hover:text-red-600 hover:border-red-100 transition-all active:scale-95"
              >
                <Icon icon="solar:logout-3-bold-duotone" className="text-xl lg:text-2xl transition-transform group-hover:translate-x-0.5" />
              </button>
            </div>
          </div>
        </header>

        {/* Content Section */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-12 custom-scrollbar scroll-smooth bg-[#FDFDFD]">
          <div className="max-w-6xl mx-auto pb-10">
            {renderDashboard()}
          </div>
        </main>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #E2E8F0;
          border-radius: 20px;
        }
        @media (max-width: 1024px) {
          .custom-scrollbar::-webkit-scrollbar {
            width: 0px;
          }
        }
      `}} />
    </div>
  )
}
