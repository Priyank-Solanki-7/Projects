export default function Reports() {
  const salesStats = [
    { label: "Books Sold", value: 850, total: 1000, color: "bg-green-500" },
    { label: "Combos Sold", value: 420, total: 500, color: "bg-blue-500" },
    { label: "Returns", value: 35, total: 1000, color: "bg-red-500" },
    { label: "Exchanges", value: 20, total: 1000, color: "bg-yellow-500" },
  ];

  return (
    <>
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">📊 Reports</h2>
      <div className="mb-8 flex items-center justify-center">
      <button className="px-10 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Export csv</button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Total Sales</h3>
          <p className="text-2xl font-bold text-green-600">₹1,25,000</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Orders</h3>
          <p className="text-2xl font-bold text-blue-600">980</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Customers</h3>
          <p className="text-2xl font-bold text-purple-600">720</p>
        </div>
        <div className="bg-white shadow-md rounded-lg p-4 text-center">
          <h3 className="text-lg font-semibold">Profit</h3>
          <p className="text-2xl font-bold text-yellow-600">₹45,000</p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-xl font-semibold mb-4">Sales Breakdown</h3>
        <div className="space-y-4">
          {salesStats.map((stat, index) => {
              const percentage = Math.round((stat.value / stat.total) * 100);
              return (
                  <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">{stat.label}</span>
                  <span className="text-sm font-medium">{percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className={`h-3 rounded-full ${stat.color}`}
                    style={{ width: `${percentage}%` }}
                    ></div>
                </div>
              </div>
            );
        })}
        </div>
      </div>
    </div>
        </>
  );
}
