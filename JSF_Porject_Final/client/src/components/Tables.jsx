import { useEffect, useState } from "react";
import axios from "axios";

const STATUSES = ["available", "occupied", "cleaning", "dirty", "reserved"];

const Tables = () => {
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [seats, setSeats] = useState(4);

  const fetchTables = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/tables");
      setTables(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load tables");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTables();
  }, []);

  const create = async () => {
    try {
      await axios.post("http://localhost:3000/api/tables", { name, seats });
      setName("");
      setSeats(4);
      fetchTables();
    } catch (err) {
      console.error(err);
      alert("Create failed");
    }
  };

  const update = async (id, patch) => {
    try {
      const res = await axios.put(
        `http://localhost:3000/api/tables/${id}`,
        patch
      );
      setTables((prev) =>
        prev.map((t) => (t.id === res.data.id ? res.data : t))
      );
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const remove = async (id) => {
    if (!confirm("Delete table?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/tables/${id}`);
      fetchTables();
    } catch (err) {
      console.error(err);
      alert("Delete failed");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Tables</h1>
      <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <input
          className="p-2 border"
          placeholder="Table name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="number"
          className="p-2 border"
          value={seats}
          onChange={(e) => setSeats(e.target.value)}
        />
        <button
          onClick={create}
          className="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Add Table
        </button>
      </div>

      {loading && <div>Loading...</div>}

      <div className="grid grid-cols-1 gap-4">
        {tables.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between bg-white p-4 rounded shadow"
          >
            <div>
              <div className="font-semibold">{t.name}</div>
              <div className="text-sm text-gray-500">Seats: {t.seats}</div>
              <div className="mt-1">
                <span className="inline-block text-sm px-2 py-0.5 rounded-full bg-gray-100 text-gray-700">
                  Status: <strong className="ml-1">{t.status}</strong>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={t.status}
                onChange={(e) => update(t.id, { status: e.target.value })}
                className="border p-1 rounded"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
              <button
                onClick={() => update(t.id, { status: "cleaning" })}
                className="px-2 py-1 bg-yellow-400 rounded"
              >
                Mark Cleaning
              </button>
              <button
                onClick={() => update(t.id, { status: "available" })}
                className="px-2 py-1 bg-green-600 text-white rounded"
              >
                Mark Ready
              </button>
              <button
                onClick={() => remove(t.id)}
                className="px-2 py-1 bg-red-500 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tables;
