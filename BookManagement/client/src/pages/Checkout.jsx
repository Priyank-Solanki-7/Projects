import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    phone: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.name || !formData.phone) {
    alert("⚠️ Please fill in all fields");
    return;
  }

  if (!/^\d{10}$/.test(formData.phone)) {
    alert("⚠️ Phone number must be 10 digits");
    return;
  }

  // Get current cart (assume saved in localStorage or context)
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const newOrder = {
    id: Date.now(),
    name: formData.name,
    phone: formData.phone,
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    date: new Date().toLocaleString()
  };

  const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
  existingOrders.push(newOrder);
  localStorage.setItem("orders", JSON.stringify(existingOrders));

  // Clear cart
  localStorage.removeItem("cart");

  alert("✅ Order placed successfully!");
  navigate("/orders");
};


  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow rounded-lg">
      <h2 className="text-2xl font-bold mb-6">🧾 Checkout</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Customer Name */}
        <div>
          <label className="block mb-1 font-medium">Customer Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter your name"
          />
        </div>

        {/* Phone Number */}
        <div>
          <label className="block mb-1 font-medium">Phone Number</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded focus:outline-none focus:ring focus:ring-green-300"
            placeholder="Enter 10-digit phone number"
          />
        </div>

        {/* Place Order Button */}
        <button
          type="submit"
          onClick={() => navigate("/orders")}
          className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 w-full"
        >
          ✅ Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
