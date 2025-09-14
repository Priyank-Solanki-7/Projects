import React, { useState } from "react";
import axios from "axios";

const AddCombo = ({ onSaved }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [books, setBooks] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        name,
        description,
        books: books ? books.split(",").map((s) => s.trim()) : [],
        price: Number(price) || 0,
        stock: Number(stock) || 0,
        imageUrl,
      };
      const res = await axios.post("http://localhost:5000/api/combos", body);
      if (res && res.data) {
        setName("");
        setDescription("");
        setBooks("");
        setPrice("");
        setStock("");
        setImageUrl("");
        onSaved && onSaved(res.data);
      }
    } catch (err) {
      console.error(err);
      alert(
        "Failed to save combo: " + (err.response?.data?.message || err.message)
      );
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold text-green-600 mb-4">
        ➕ Add New Combo
      </h2>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Combo Name"
          className="w-full border p-2 rounded"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          className="w-full border p-2 rounded"
          rows="3"
        ></textarea>
        <input
          value={books}
          onChange={(e) => setBooks(e.target.value)}
          type="text"
          placeholder="Books (comma separated titles)"
          className="w-full border p-2 rounded"
        />
        <input
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          type="number"
          placeholder="Price"
          className="w-full border p-2 rounded"
        />
        <input
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          type="number"
          placeholder="Stock Quantity"
          className="w-full border p-2 rounded"
        />
        <input
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          type="text"
          placeholder="Image URL (optional)"
          className="w-full border p-2 rounded"
        />
        <div className="flex gap-3">
          <button
            disabled={saving}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          >
            {saving ? "Saving..." : "Save Combo"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCombo;
