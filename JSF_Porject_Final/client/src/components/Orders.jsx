import { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/purchases");
      setOrders(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    const id = setInterval(fetchOrders, 10000); // refresh every 10s
    return () => clearInterval(id);
  }, []);

  const update = async (id, patch) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/purchases/${id}`,
        patch
      );
      const updated = res.data;
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)));
    } catch (err) {
      console.error(err);
      alert(err?.response?.data?.error || "Update failed");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {loading && <div className="text-sm text-gray-500">Loading...</div>}
      <div className="space-y-4">
        {orders.map((o) => (
          <div
            key={o.id}
            className="bg-white p-4 rounded shadow flex items-center gap-4"
          >
            <div className="flex-1">
              <div className="font-semibold">
                {o.itemName} × {o.quantity}
              </div>
              <div className="text-sm text-gray-600">
                By: {o.purchaserName || "Guest"}{" "}
                {o.purchaserEmail ? `(${o.purchaserEmail})` : ""}
              </div>
              <div className="text-sm text-gray-500">
                Created: {new Date(o.created_at).toLocaleString()}
              </div>
              <div className="mt-1">
                <span className="font-bold">Status:</span> {o.status}
                {o.estimated_minutes ? (
                  <span className="ml-3">ETA: {o.estimated_minutes}m</span>
                ) : null}
                {o.collected ? (
                  <span className="ml-3 text-green-600">(Collected)</span>
                ) : (
                  <span className="ml-3 text-red-600">(Not collected)</span>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="font-bold text-indigo-600">
                ₹{Number(o.total).toFixed(2)}
              </div>
              <div className="flex gap-2">
                <select
                  value={o.status}
                  onChange={(e) => update(o.id, { status: e.target.value })}
                  className="border px-2 py-1 rounded"
                >
                  <option value="pending">pending</option>
                  <option value="preparing">preparing</option>
                  <option value="ready">ready</option>
                  <option value="delivered">delivered</option>
                  <option value="cancelled">cancelled</option>
                </select>
                <button
                  onClick={() => {
                    const val = window.prompt(
                      "Estimated minutes to deliver (leave empty to clear)",
                      o.estimated_minutes || ""
                    );
                    if (val === null) return;
                    const num = val === "" ? null : parseInt(val, 10);
                    if (num !== null && Number.isNaN(num)) {
                      alert("Enter an integer or leave empty");
                      return;
                    }
                    update(o.id, { estimated_minutes: num });
                  }}
                  className="bg-yellow-400 px-2 py-1 rounded"
                >
                  ETA
                </button>
                <button
                  onClick={() => update(o.id, { collected: !o.collected })}
                  className="bg-green-600 text-white px-2 py-1 rounded"
                >
                  Toggle Collected
                </button>
              </div>
            </div>
          </div>
        ))}
        {orders.length === 0 && !loading && (
          <div className="text-gray-500">No orders</div>
        )}
      </div>
    </div>
  );
};

export default Orders;
