import { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // Save updated orders to localStorage
  const saveOrders = (updatedOrders) => {
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  // Handle status change
  const handleStatusChange = (id, newStatus) => {
    const updatedOrders = orders.map((order) =>
      order.id === id ? { ...order, status: newStatus } : order
    );
    saveOrders(updatedOrders);
  };

  // Handle exchange / return
  const handleAction = (id, type) => {
    alert(`✅ ${type} request for Order ID: ${id}`);
  };

  // Filter orders
  const filteredOrders = orders.filter(
    (order) =>
      order.id.toString().includes(search.toLowerCase()) ||
      order.name.toLowerCase().includes(search.toLowerCase()) ||
      order.phone.includes(search)
  );

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📦 Orders</h2>

      {/* Search Field */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search by ID, Name, or Phone"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full max-w-md focus:outline-none focus:ring focus:ring-green-300"
        />
      </div>

      {filteredOrders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="bg-white shadow rounded-lg overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-medium">
                <th className="p-3 border">Order ID</th>
                <th className="p-3 border">Customer Name</th>
                <th className="p-3 border">Phone</th>
                <th className="p-3 border">Items</th>
                <th className="p-3 border">Total</th>
                <th className="p-3 border">Date</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="p-3 border">{order.id}</td>
                  <td className="p-3 border">{order.name}</td>
                  <td className="p-3 border">{order.phone}</td>
                  <td className="p-3 border">
                    {order.items.map((item, i) => (
                      <div key={i}>
                        {item.title} × {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="p-3 border font-bold text-green-600">
                    ₹{order.total}
                  </td>
                  <td className="p-3 border">{order.date}</td>

                  {/* Status Dropdown */}
                  <td className="p-3 border">
                    <select
                      value={order.status || "Pending"}
                      onChange={(e) => handleStatusChange(order.id, e.target.value)}
                      className="border rounded px-2 py-1 text-sm focus:outline-none focus:ring focus:ring-green-300"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>

                  {/* Actions */}
                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() => handleAction(order.id, "Exchange")}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      Exchange
                    </button>
                    <button
                      onClick={() => handleAction(order.id, "Return")}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Orders;
