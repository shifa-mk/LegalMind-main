export default function AdminDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Admin Dashboard</h2>
      <p className="mb-4">Here you can manage law sections, update punishments, and monitor system usage.</p>
      
      <div className="border p-4 bg-white rounded shadow">
        <h3 className="font-semibold mb-2">📂 Manage Sections</h3>
        <button className="bg-green-600 text-white px-3 py-1 rounded">Add New Section</button>
      </div>
    </div>
  );
}
