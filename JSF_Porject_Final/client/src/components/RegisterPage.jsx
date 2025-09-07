import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const RegisterPage = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError, setvalidationError] = useState({});

  const validate = () => {
    const newError = {};
    if (!name || name.trim().length === 0) newError.name = "Name is required";
    if (!email) newError.email = "Email is required";
    else {
      const re = /\S+@\S+\.\S+/;
      if (!re.test(email)) newError.email = "Invalid email";
    }
    if (!password) newError.password = "Password is required";
    if (password !== confirmPassword)
      newError.confirmPassword = "Passwords do not match";
    return newError;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validateError = validate();
    setvalidationError(validateError);
    if (Object.keys(validateError).length > 0) return;

    try {
      const res = await axios.post("http://localhost:3000/register", {
        fullName: name,
        email,
        password,
        confirmPassword,
      });
      // success (201 or 200)
      if (res && (res.status === 200 || res.status === 201)) {
        navigate("/login");
      } else {
        alert(res.data?.message || "Registration failed");
      }
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message || err.message || "Network error";
      alert(msg);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-300 via-blue-700 to-pink-800 flex items-center justify-center">
      <div className="bg-zinc rounded-xl shadow-lg p-8 w-full max-w-md bg-white">
        <h2 className="text-3xl font-bold text-black mb-6 text-center">
          Create Account
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-black mb-2 font-medium"
              htmlFor="name"
            >
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-indigo-500 outline-none transition duration-200"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
            {validationError.name && (
              <div className="text-red-500 text-sm">{validationError.name}</div>
            )}
          </div>
          <div>
            <label
              className="block text-black mb-2 font-medium"
              htmlFor="email"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-indigo-500 outline-none transition duration-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            {validationError.email && (
              <div className="text-red-500 text-sm">
                {validationError.email}
              </div>
            )}
          </div>
          <div>
            <label
              className="block text-black mb-2 font-medium"
              htmlFor="password"
            >
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-indigo-500 outline-none transition duration-200"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 hover:text-indigo-500 transition"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {validationError.password && (
              <div className="text-red-500 text-sm">
                {validationError.password}
              </div>
            )}
          </div>
          <div>
            <label
              className="block text-black mb-2 font-medium"
              htmlFor="confirmPassword"
            >
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-indigo-500 outline-none transition duration-200"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-3 text-gray-500 hover:text-indigo-500 transition"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                tabIndex={-1}
              >
                {showConfirmPassword ? "Hide" : "Show"}
              </button>
            </div>
            {validationError.confirmPassword && (
              <div className="text-red-500 text-sm">
                {validationError.confirmPassword}
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-orange-700 text-white font-semibold hover:bg-orange-800 transition duration-200 shadow-lg"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center text-black">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-xl text-blue-700 hover:underline font-semibold"
          >
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;
