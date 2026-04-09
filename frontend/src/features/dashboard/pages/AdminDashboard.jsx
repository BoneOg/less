export default function AdminDashboard({ user }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-2xl font-bold text-red-600 mb-2">Developer Admin Panel</h3>
      <p className="text-gray-500 mb-4">
        System overview, server health, and all technical components.
      </p>
      {/* Admin specific widgets will go here */}
    </div>
  )
}
