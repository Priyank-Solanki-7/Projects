import { useState } from "react";

export default function Customers() {
  const [search, setSearch] = useState("");

  const customers = [
    { id: 1, name: "Aarav Sharma", phone: "9876543210", email: "aarav@example.com", orders: 12, spent: "₹5,200" },
    { id: 2, name: "Priya Patel", phone: "9123456780", email: "priya@example.com", orders: 8, spent: "₹3,400" },
    { id: 3, name: "Rohan Mehta", phone: "9988776655", email: "rohan@example.com", orders: 15, spent: "₹7,800" },
    { id: 4, name: "Sneha Kapoor", phone: "9001122334", email: "sneha@example.com", orders: 5, spent: "₹2,100" },
    { id: 5, name: "Arjun Singh", phone: "9112233445", email: "arjun@example.com", orders: 20, spent: "₹10,000" },
  ];

  // ✅ Filter customers
  const filteredCustomers = customers.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.phone.includes(search) ||
      c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">👥 Customers</h2>
        <input
          type="text"
          placeholder="Search by name, phone, or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-4 py-2 rounded-lg w-72 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      {/* Customers Table */}
      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Phone</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Orders</th>
              <th className="p-3 border">Total Spent</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((c) => (
                <tr key={c.id} className="hover:bg-gray-50">
                  <td className="p-3 border">{c.id}</td>
                  <td className="p-3 border">{c.name}</td>
                  <td className="p-3 border">{c.phone}</td>
                  <td className="p-3 border">{c.email}</td>
                  <td className="p-3 border">{c.orders}</td>
                  <td className="p-3 border">{c.spent}</td>
                  <td className="p-3 border text-center space-x-2">
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                      View
                    </button>
                    <button className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="p-4 text-center text-gray-500">
                  No customers found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
