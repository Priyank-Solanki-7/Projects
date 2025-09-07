import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const LoginScreen = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("http://localhost:3000/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.message || `Login failed (${res.status})`);
        setLoading(false);
        return;
      }
      setLoading(false);
      navigate("/deskbord");
    } catch (err) {
      setError(err.message || "Network error");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br  from-blue-300 via-blue-700 to-pink-800 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto mb-3 h-12 w-12 rounded-full bg-indigo-50 flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11c0 .667-.333 1-1 1s-1-.333-1-1 .333-1 1-1 1 .333 1 1z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">Welcome back</h2>
          <p className="text-sm text-gray-500">
            Sign in to continue to your account
          </p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label
              className="block text-gray-700 mb-2 font-medium"
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
          </div>

          <div>
            <label
              className="block text-gray-700 mb-2 font-medium"
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
                {showPassword ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10a9.963 9.963 0 014.508-8.1m15.495 3.6a10.05 10.05 0 012.497 4.5A9.963 9.963 0 0122 19c-1.334.838-2.773 1.488-4.252 1.825"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm7 0c0 5-4 9-9 9S3 17 3 12s4-9 9-9 9 4 9 9z"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {error && (
            <div className="text-sm text-red-600 text-center">{error}</div>
          )}

          <div className="flex items-center justify-between">
            <label className="inline-flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                className="form-checkbox h-4 w-4 text-indigo-600"
              />
              <span className="ml-2">Remember me</span>
            </label>
            <Link
              to="/forgot"
              className="text-sm text-indigo-600 hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg flex items-center justify-center"
              disabled={loading}
            >
              {loading && (
                <svg
                  className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  ></path>
                </svg>
              )}
              {loading ? "Signing in..." : "Login"}
            </button>
          </div>
        </form>

        <div className="mt-6">
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <div className="text-sm text-gray-400">or continue with</div>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <button className="btn-outline flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 48 48"
              >
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.6 0 6.2 1.6 7.6 3l5.6-5.6C34.2 4 29.6 2 24 2 14 2 5.7 7.9 2.6 16.3l6.8 5.3C11.6 15 17 9.5 24 9.5z"
                />
              </svg>
              Google
            </button>
            <button className="btn-outline flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.44-3.88-1.44-.53-1.36-1.3-1.72-1.3-1.72-1.06-.73.08-.72.08-.72 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.75.41-1.27.75-1.56-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.04 0 0 .97-.31 3.18 1.18a11.03 11.03 0 012.9-.39c.98 0 1.97.13 2.9.39 2.2-1.5 3.17-1.18 3.17-1.18.64 1.58.24 2.75.12 3.04.74.81 1.19 1.84 1.19 3.1 0 4.43-2.69 5.4-5.25 5.68.42.36.79 1.08.79 2.18 0 1.57-.01 2.84-.01 3.23 0 .31.2.68.8.56C20.71 21.39 24 17.08 24 12c0-6.35-5.15-11.5-12-11.5z" />
              </svg>
              GitHub
            </button>
          </div>

          <div className="mt-6 text-center text-gray-600">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 hover:underline font-semibold"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginScreen;
