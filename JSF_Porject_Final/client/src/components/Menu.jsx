import { useEffect, useState } from "react";
import axios from "axios";

const Menu = () => {
  const [items, setItems] = useState([]);
  useEffect(() => {
    fetchItems();
  }, []);
  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/items");
      setItems(res.data || []);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="grid grid-cols-1 gap-4">
        {items.map((i) => (
          <div
            key={i.iditem}
            className="flex items-center gap-4 bg-white p-4 rounded shadow"
          >
            <img
              src={i.url || "/vite.svg"}
              alt={i.itemName}
              className="w-28 h-20 object-cover rounded"
            />
            <div className="flex-1">
              <div className="font-semibold text-lg">{i.itemName}</div>
              <div className="text-sm text-gray-500">{i.feedback}</div>
            </div>
            <div className="text-right">
              <div className="font-bold text-indigo-600">
                ₹{Number(i.cost).toFixed(2)}
              </div>
              <div className="text-sm text-gray-600">
                Stock: {i.quantity ?? 0}
              </div>
            </div>
            <div className="ml-4">
              <button
                onClick={async () => {
                  try {
                    const stock = Number(i.quantity ?? 0);
                    if (stock <= 0) {
                      alert("This item is out of stock");
                      return;
                    }
                    const qtyStr = window.prompt(
                      "Quantity to purchase (number)",
                      "1"
                    );
                    if (!qtyStr) return;
                    const qty = parseInt(qtyStr, 10);
                    if (Number.isNaN(qty) || qty <= 0) {
                      alert("Enter a valid quantity");
                      return;
                    }
                    if (qty > stock) {
                      alert(`Only ${stock} in stock`);
                      return;
                    }
                    const purchaserEmail = window.prompt(
                      "Your email (optional)"
                    );
                    const purchaserName = window.prompt("Your name (optional)");

                    const res = await axios.post(
                      "http://localhost:3000/api/purchases",
                      {
                        itemId: i.iditem,
                        quantity: qty,
                        purchaserName,
                        purchaserEmail,
                      }
                    );
                    if (res.status === 201) {
                      alert(
                        `Purchase created. Total: ₹${res.data.total.toFixed(2)}`
                      );
                      // refresh items to show updated stock
                      fetchItems();
                    } else {
                      alert("Purchase response: " + JSON.stringify(res.data));
                    }
                  } catch (err) {
                    console.error(err);
                    alert(
                      err?.response?.data?.error || "Failed to create purchase"
                    );
                  }
                }}
                className={`ml-2 px-3 py-1 rounded ${
                  (i.quantity ?? 0) <= 0
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-indigo-600 text-white"
                }`}
              >
                Purchase
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Menu;
