export default function StaffDashboard({ user }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
      <h3 className="text-2xl font-bold text-blue-600 mb-2">Staff Operations Workspace</h3>
      <p className="text-gray-500 mb-4">
        Track local inventory, punch records, or daily operational tasks.
      </p>
      {/* Staff specific widgets will go here */}
    </div>
  )
}
