import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../store/cartContextValue";

const Cart = () => {
  const navigate = useNavigate();
  const {
    cart: cartItems = [],
    updateQuantity,
    removeItem,
  } = useContext(CartContext) || {};

  // Calculate total
  const totalAmount = (cartItems || []).reduce(
    (sum, item) =>
      sum + (Number(item.price) || 0) * (Number(item.quantity) || 0),
    0
  );

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">🛒 Cart</h2>

      {cartItems.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="w-full border">
            <thead className="bg-gray-200">
              <tr>
                <th className="px-4 py-2 border">Item</th>
                <th className="px-4 py-2 border">Type</th>
                <th className="px-4 py-2 border">Price</th>
                <th className="px-4 py-2 border">Quantity</th>
                <th className="px-4 py-2 border">Total</th>
                <th className="px-4 py-2 border">Action</th>
              </tr>
            </thead>
            <tbody>
              {(cartItems || []).map((item) => {
                const id = item._id || item.id || item.key;
                return (
                  <tr key={String(id)} className="text-center">
                    <td className="border px-4 py-2">
                      {item.title || item.name}
                    </td>
                    <td className="border px-4 py-2">
                      {item.type || (item.isCombo ? "Combo" : "Book")}
                    </td>
                    <td className="border px-4 py-2">₹{item.price}</td>
                    <td className="border px-4 py-2">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity || 1}
                        onChange={(e) =>
                          updateQuantity(id, parseInt(e.target.value || 1))
                        }
                        className="w-16 text-center border rounded"
                      />
                    </td>
                    <td className="border px-4 py-2">
                      ₹
                      {(Number(item.price) || 0) * (Number(item.quantity) || 1)}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => removeItem(id)}
                        className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                      >
                        ❌ Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          {/* Total and Checkout */}
          <div className="mt-6 flex justify-between items-center">
            <h3 className="text-xl font-bold">Grand Total: ₹{totalAmount}</h3>
            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600"
            >
              ✅ Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">🛍️ Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
