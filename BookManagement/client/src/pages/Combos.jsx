import { useState, useEffect } from "react";
import axios from "axios";
import AddCombo from "./AddCombo";

const Combos = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [combos, setCombos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const fetchCombos = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:5000/api/combos");
      setCombos(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setCombos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCombos();
  }, []);

  const filteredCombos = combos.filter((combo) => {
    const q = searchTerm.trim().toLowerCase();
    if (!q) return true;
    return (
      (combo.name || "").toLowerCase().includes(q) ||
      (combo.books || []).join(" ").toLowerCase().includes(q) ||
      String(combo._id || combo.id || "").includes(q)
    );
  });

  return (
    <div className="p-6">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">🎁 Combos</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
        >
          ➕ Add Combo
        </button>
      </div>

      {/* Search Bar */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="🔍 Search by Combo Name, Books, or ID..."
          className="w-full p-2 border rounded-lg"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Combos Table */}
      <div className="bg-white shadow rounded-xl p-4 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-medium">
              <th className="p-3 border">Image</th>
              <th className="p-3 border">ID</th>
              <th className="p-3 border">Combo Name</th>
              <th className="p-3 border">Books Included</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Stock</th>
              <th className="p-3 border text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="7" className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : filteredCombos.length > 0 ? (
              filteredCombos.map((combo) => (
                <tr key={combo._id || combo.id} className="hover:bg-gray-50">
                  <td className="p-3 border text-center">
                    <img
                      src={
                        combo.imageUrl ||
                        combo.image ||
                        "https://picsum.photos/100/100"
                      }
                      alt={combo.name}
                      className="w-12 h-12 object-cover mx-auto rounded"
                    />
                  </td>
                  <td className="p-3 border">{combo._id || combo.id}</td>
                  <td className="p-3 border">{combo.name}</td>
                  <td className="p-3 border">
                    {(combo.books || []).join(", ")}
                  </td>
                  <td className="p-3 border">
                    {typeof combo.price === "number"
                      ? `₹${combo.price}`
                      : combo.price}
                  </td>
                  <td className="p-3 border">{combo.stock}</td>
                  <td className="p-3 border text-center space-x-2">
                    <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600">
                      Edit
                    </button>
                    <button className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600">
                      Delete
                    </button>
                    <button className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600 mt-2">
                      🛒 Add to Cart
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-4 text-gray-500">
                  ❌ No combos found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal for Add Combo */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-3/4 lg:w-1/2 p-4">
            <div className="flex justify-end">
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-600"
              >
                ✖
              </button>
            </div>
            <AddCombo
              onSaved={() => {
                setShowModal(false);
                fetchCombos();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Combos;
