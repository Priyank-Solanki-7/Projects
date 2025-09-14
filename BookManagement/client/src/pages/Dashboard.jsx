const Dashboard = () => {
  return (
    <div className="p-6">
      {/* Page Title */}
      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        📊 Dashboard
      </h2>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-gray-500 text-sm">Total Sales</h3>
          <p className="text-2xl font-bold text-green-600">₹1,24,500</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-gray-500 text-sm">Books in Stock</h3>
          <p className="text-2xl font-bold text-blue-600">2,340</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-gray-500 text-sm">Orders Today</h3>
          <p className="text-2xl font-bold text-purple-600">56</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-gray-500 text-sm">Customers</h3>
          <p className="text-2xl font-bold text-orange-600">1,025</p>
        </div>
      </div>

      {/* Recent Orders Table */}
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold mb-4">🛒 Recent Orders</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Customer</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="p-2 border">#1001</td>
              <td className="p-2 border">Amit Patel</td>
              <td className="p-2 border">₹450</td>
              <td className="p-2 border text-green-600 font-semibold">Completed</td>
            </tr>
            <tr>
              <td className="p-2 border">#1002</td>
              <td className="p-2 border">Neha Shah</td>
              <td className="p-2 border">₹780</td>
              <td className="p-2 border text-yellow-600 font-semibold">Pending</td>
            </tr>
            <tr>
              <td className="p-2 border">#1003</td>
              <td className="p-2 border">Rahul Mehta</td>
              <td className="p-2 border">₹1,250</td>
              <td className="p-2 border text-green-600 font-semibold">Completed</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Top Selling Books */}
      <div className="bg-white shadow rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-4">📚 Top Selling Books</h3>
        <ul className="space-y-3">
          <li className="flex justify-between border-b pb-2">
            <span>Atomic Habits</span>
            <span className="font-bold text-green-600">120 sold</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span>Rich Dad Poor Dad</span>
            <span className="font-bold text-green-600">95 sold</span>
          </li>
          <li className="flex justify-between border-b pb-2">
            <span>The Psychology of Money</span>
            <span className="font-bold text-green-600">80 sold</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
