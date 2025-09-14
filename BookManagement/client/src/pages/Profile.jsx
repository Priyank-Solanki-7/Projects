import { useState } from "react";
import Card from "../components/Cards";

export default function Profile() {
  const [user, setUser] = useState({
    id: 1,
    name: "Priyank Solanki",
    role: "Admin",
    email: "priyank@example.com",
    phone: "9876543210",
    joined: "2023-08-15",
  });

  const [editMode, setEditMode] = useState(false);

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">👤 Profile</h2>
        <button
          onClick={() => setEditMode(!editMode)}
          className={`px-4 py-2 rounded-lg text-white ${
            editMode ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {editMode ? "Save Changes" : "Edit Profile"}
        </button>
      </div>

      {/* User Info */}
      <div className="bg-white shadow-md rounded-lg p-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="name"
              value={user.name}
              onChange={handleChange}
              disabled={!editMode}
              className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Role</label>
            <input
              type="text"
              name="role"
              value={user.role}
              onChange={handleChange}
              disabled={!editMode}
              className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              disabled={!editMode}
              className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Phone</label>
            <input
              type="text"
              name="phone"
              value={user.phone}
              onChange={handleChange}
              disabled={!editMode}
              className="border px-3 py-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-100"
            />
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          📅 Joined on <span className="font-medium">{user.joined}</span>
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card title="Total Orders Managed" value="120" color="bg-blue-500" />
        <Card title="Customers Assisted" value="58" color="bg-green-500" />
        <Card title="Pending Tasks" value="7" color="bg-yellow-500" />
      </div>
    </div>
  );
}
