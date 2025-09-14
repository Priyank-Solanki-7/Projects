import { useState, useEffect } from "react";
import axios from "axios";

const StaffForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("Male");
  const [salary, setSalary] = useState("");
  const [role, setRole] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [staffList, setStaffList] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/staff");
      setStaffList(res.data || []);
    } catch (err) {
      console.error("fetch staff error", err);
    }
  };

  const reset = () => {
    setName("");
    setEmail("");
    setAge("");
    setGender("Male");
    setSalary("");
    setRole("");
    setImageUrl("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        name,
        email,
        age: age ? Number(age) : null,
        gender,
        salary: salary ? Number(salary) : null,
        role,
        image_url: imageUrl,
      };
      await axios.post("http://localhost:3000/api/staff", payload);
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
      reset();
      fetchStaff();
    } catch (err) {
      console.error("save staff error", err);
      alert(err?.response?.data?.error || "Failed to save staff");
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this staff member?")) return;
    try {
      await axios.delete(`http://localhost:3000/api/staff/${id}`);
      setStaffList((prev) => prev.filter((s) => s.id !== id));
    } catch (err) {
      console.error("delete staff error", err);
      alert("Failed to delete");
    }
  };

  return (
    <div className="p-6 w-full">
      {/* Centered form card */}
      <div className="mx-auto max-w-md bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-bold mb-4 text-center">
          Add Staff Member
        </h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <input
              required
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full"
            />
          </div>
          <div>
            <input
              required
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
            />
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>
          <div className="flex gap-2">
            <input
              type="number"
              step="0.01"
              placeholder="Salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
            />
            <input
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <div>
            <input
              placeholder="Image URL"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full"
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Save
          </button>
          {submitted && <div className="text-green-600">Saved</div>}
        </form>
      </div>

      {/* Staff list below the card, centered and constrained */}
      <div className="mt-8 max-w-3xl mx-auto">
        <h3 className="text-xl">Staff List</h3>
        <div className="space-y-2 mt-2">
          {staffList.length === 0 && (
            <div className="text-gray-500">No staff yet</div>
          )}
          {staffList.map((s) => (
            <div
              key={s.id}
              className="flex flex-col md:flex-row items-center md:items-start gap-4 border p-3 rounded text-center md:text-left"
            >
              <img
                src={s.image_url || "/vite.svg"}
                alt={s.name}
                className="w-20 h-20 object-cover rounded mx-auto md:mx-0"
              />
              <div className="flex-1">
                <div className="font-semibold text-lg">
                  {s.name}{" "}
                  <span className="text-sm text-gray-500">({s.role})</span>
                </div>
                <div className="text-sm text-gray-600">
                  {s.email} • Age: {s.age ?? "-"} • {s.gender}
                </div>
                <div className="text-sm text-indigo-600 font-semibold mt-1 md:mt-0">
                  ₹{s.salary ?? "-"}
                </div>
              </div>
              <div className="mt-3 md:mt-0">
                <button
                  onClick={() => handleDelete(s.id)}
                  className="px-3 py-1 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffForm;
