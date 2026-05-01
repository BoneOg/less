import { User } from '../../authentication/context/AuthContext'

export default function StaffDashboard({ user }: { user: User }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-2xl font-bold text-emerald-600 mb-2">Staff Terminal</h3>
      <p className="text-gray-500 mb-4">
        Access to scanning, inventory lookup, and task management.
      </p>
      <div className="text-xs text-slate-400">Logged in as: {user.email}</div>
    </div>
  )
}
