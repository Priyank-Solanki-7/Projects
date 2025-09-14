import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Inventory() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apiBase = "http://localhost:5000/api/books";

  const fetchBooks = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await axios.get(apiBase);
      const list = res.data || [];
      // deduplicate by _id or id (keep first occurrence)
      const deduped = Array.from(
        new Map(list.map((b) => [String(b._id || b.id), b])).values()
      );
      setBooks(deduped);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const sid = String(id || "").trim();
    if (!sid) return alert("Cannot delete: missing id");
    if (!confirm("Delete this book?")) return;
    try {
      await axios.delete(`${apiBase}/${sid}`);
      setBooks((b) => b.filter((x) => String(x._id || x.id) !== sid));
    } catch (err) {
      alert("Delete failed: " + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = async (book) => {
    // simple sequence of prompts to edit fields quickly
    const newTitle = prompt("Title", book.title);
    if (newTitle == null) return;
    const newAuthor = prompt("Author", book.author);
    if (newAuthor == null) return;
    const newPrice = prompt("Price", book.price);
    if (newPrice == null) return;
    const newStock = prompt("Stock", book.stock);
    if (newStock == null) return;
    const newImage = prompt(
      "Image URL (optional)",
      book.imageUrl || book.image || ""
    );
    const newCategory = prompt(
      "Category (GSEB / CBSE / Other)",
      book.category || "Other"
    );
    const newMedium = prompt(
      "Medium (Gujarati / English)",
      book.medium || "Gujarati"
    );
    const payload = {
      title: newTitle,
      author: newAuthor,
      price: Number(newPrice),
      stock: Number(newStock),
      imageUrl: newImage,
      category: newCategory || "Other",
      medium: newMedium || "Gujarati",
    };
    const id = book._id || book.id;
    try {
      const res = await axios.put(`${apiBase}/${id}`, payload);
      const updated = res.data;
      setBooks((b) =>
        b.map((x) =>
          String(x._id || x.id) === String(updated._id || updated.id)
            ? updated
            : x
        )
      );
    } catch (err) {
      alert("Update failed: " + (err.response?.data?.message || err.message));
    }
  };

  const filteredBooks = books.filter((book) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    const id = String(book._id || book.id || "");
    return (
      (book.title || "").toLowerCase().includes(q) ||
      (book.author || "").toLowerCase().includes(q) ||
      id.includes(q)
    );
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📦 Inventory</h2>
        <button
          onClick={() => navigate("/add-book")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          ➕ Add Book
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search by title or author..."
          className="w-full p-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Books Table */}
      {error && <div className="text-red-500 mb-3">{error}</div>}
      <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium">
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Category</th>
              <th className="p-3 border">Medium</th>

              <th className="p-3 border">Author</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Stock</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="9" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : filteredBooks.length > 0 ? (
              filteredBooks.map((book, idx) => (
                <tr
                  key={`${String(book._id || book.id)}-${idx}`}
                  className="hover:bg-gray-50"
                >
                  <td className="p-3 border">
                    {book._id || book.id || idx + 1}
                  </td>
                  <td className="p-3 border text-center">
                    <img
                      src={
                        book.imageUrl ||
                        book.image ||
                        "2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys"
                      }
                      alt={book.title}
                      className="w-12 h-16 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="p-3 border">{book.title}</td>
                  <td className="p-3 border">{book.category || "Other"}</td>
                  <td className="p-3 border">{book.medium || "Gujarati"}</td>

                  <td className="p-3 border">{book.author}</td>
                  <td className="p-3 border">
                    {typeof book.price === "number"
                      ? `₹${book.price}`
                      : book.price}
                  </td>
                  <td className="p-3 border">{book.stock}</td>
                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() => handleEdit(book)}
                      className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(book._id || book.id)}
                      className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  ❌ No books found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
