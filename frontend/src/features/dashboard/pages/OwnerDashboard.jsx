export default function OwnerDashboard({ user }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-2xl font-bold text-[#1a2e35] mb-2">Restaurant Owner Workspace</h3>
      <p className="text-gray-500 mb-4">
        Manage menus, staff permissions, and overarching financial costings here.
      </p>
      {/* Owner specific widgets will go here */}
    </div>
  )
}
