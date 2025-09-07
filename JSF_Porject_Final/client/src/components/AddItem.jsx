import { useState, useEffect } from "react";
import axios from "axios";
const categories = [
  "Starter",
  "Main Course",
  "Dessert",
  "Beverage",
  "Salad",
  "Snack",
];
const AddItem = () => {
  const [foodName, setFoodName] = useState("");
  const [price, setPrice] = useState("");
  const [Quantity, setQuantity] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [description, setDescription] = useState("");
  const [Image, setImage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/items");
      setItems(res.data || []);
    } catch (err) {
      console.error("fetch items error", err);
    }
  };

  const resetForm = () => {
    setFoodName("");
    setPrice("");
    setCategory(categories[0]);
    setDescription("");
    setImage("");
    setQuantity("");
    setEditingId(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        itemName: foodName,
        cost: price,
        quantity: Quantity,
        url: Image,
        feedback: description,
      };
      if (editingId) {
        await axios.put(
          `http://localhost:3000/api/items/${editingId}`,
          payload
        );
        // update local state
        setItems((prev) =>
          prev.map((it) =>
            it.iditem === editingId
              ? {
                  ...it,
                  itemName: payload.itemName,
                  cost: payload.cost,
                  quantity: payload.quantity,
                  url: payload.url,
                  feedback: payload.feedback,
                }
              : it
          )
        );
      } else {
        const res = await axios.post(
          "http://localhost:3000/api/items",
          payload
        );
        // if server returned id, add to local list immediately
        const newId = res?.data?.iditem;
        if (newId) {
          const newItem = {
            iditem: newId,
            itemName: payload.itemName,
            cost: payload.cost,
            quantity: payload.quantity,
            url: payload.url,
            feedback: payload.feedback,
          };
          setItems((prev) => [newItem, ...prev]);
        } else {
          await fetchItems();
        }
      }
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
      resetForm();
    } catch (err) {
      console.error("save item error", err);
      alert(err?.response?.data?.error || "Failed to save item");
    }
  };

  const handleEdit = (item) => {
    setEditingId(item.iditem);
    setFoodName(item.itemName || "");
    setPrice(item.cost || "");
    setImage(item.url || "");
    setDescription(item.feedback || "");
    setQuantity(item.quantity ?? "");
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this item?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/items/${id}`);
      setItems((prev) => prev.filter((it) => it.iditem !== id));
    } catch (err) {
      console.error("delete error", err);
      alert("Failed to delete");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-blue-600/10 flex items-center justify-center py-12 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Add Food Item
        </h2>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="foodName"
              className="block text-gray-700 font-medium mb-2"
            >
              Food Name
            </label>
            <input
              id="foodName"
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-pink-500 outline-none transition duration-200"
              value={foodName}
              onChange={(e) => setFoodName(e.target.value)}
              placeholder="e.g. Margherita Pizza"
              required
            />
          </div>
          <div>
            <label
              htmlFor="foodImage"
              className="block text-gray-700 font-medium mb-2"
            >
              Enter Food Image URL
            </label>
            <input
              id="foodImage"
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-pink-500 outline-none transition duration-200"
              value={Image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://www.image.jpg"
              required
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-gray-700 font-medium mb-2"
            >
              Price
            </label>
            <input
              id="price"
              type="number"
              min="0"
              step="0.01"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-pink-500 outline-none transition duration-200"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="e.g. 12.50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="Quantity"
              className="block text-gray-700 font-medium mb-2"
            >
              Quantity
            </label>
            <input
              id="Quantity"
              type="number"
              min="0"
              step="1"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-pink-500 outline-none transition duration-200"
              value={Quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="e.g. 12.50"
              required
            />
          </div>
          <div>
            <label
              htmlFor="category"
              className="block text-gray-700 font-medium mb-2"
            >
              Category
            </label>
            <select
              id="category"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-pink-500 outline-none transition duration-200"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-gray-700 font-medium mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-pink-500 outline-none transition duration-200 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the food item..."
              rows={3}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-gradient-to-r from-pink-500 to-indigo-500 text-white font-bold shadow-lg hover:from-pink-600 hover:to-indigo-600 transition duration-200"
          >
            Add Food Item
          </button>
          {submitted && (
            <div className="text-green-500 font-semibold text-center mt-2 animate-bounce">
              Food item saved successfully!
            </div>
          )}
        </form>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Menu</h3>
          <div className="grid grid-cols-1 gap-4">
            {items.length === 0 && (
              <div className="text-gray-500">No items yet</div>
            )}
            {items.map((item) => (
              <div
                key={item.iditem}
                className="flex items-center gap-4 bg-gray-50 p-3 rounded-lg"
              >
                <img
                  src={item.url || "/vite.svg"}
                  alt={item.itemName}
                  className="w-24 h-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <div className="font-semibold text-gray-800">
                    {item.itemName}
                  </div>
                  <div className="text-sm text-gray-500">{item.feedback}</div>
                </div>
                <div className="text-indigo-600 font-bold">
                  ₹{Number(item.cost).toFixed(2)}
                </div>
                <div className="text-sm text-gray-600">
                  Stock: {item.quantity ?? 0}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-yellow-400 rounded text-white"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.iditem)}
                    className="px-3 py-1 bg-red-500 rounded text-white"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
export default AddItem;
