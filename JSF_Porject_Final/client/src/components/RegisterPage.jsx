import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const RegisterPage =()=>{
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [validationError,setvalidationError] = useState({});

  const validate = () =>{
    const newError = {};
    if(!name || name.trim().length===0) newError.name = "Name is required";
    if(!email) newError.email = "Email is required";
    else {
      const re = /\S+@\S+\.\S+/;
      if(!re.test(email)) newError.email = "Invalid email";
    }
    if(!password) newError.password = "Password is required";
    if(password !== confirmPassword) newError.confirmPassword = "Passwords do not match";
    return newError;
  }

  const handleSubmit = async (e)=>{
    e.preventDefault();
    const validateError = validate();
    setvalidationError(validateError);
    if(Object.keys(validateError).length>0) return;

    try{
      const res = await fetch("http://localhost:3000/register",{
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({
          fullName: name,
          email,
          password,
          confirmPassword
        })
      });
      const data = await res.json();
      if(res.ok){
        // go to login page
        navigate("/login");
      } else {
        // show server validation
        alert(data.message || "Registration failed");
      }
    }catch(err){
      console.error(err);
      alert("Network error");
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
          Create Account
        </h2>
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="name">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-indigo-500 outline-none transition duration-200"
              value={name}
              onChange={e => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
            {validationError.name && <div className="text-red-500 text-sm">{validationError.name}</div>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-indigo-500 outline-none transition duration-200"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
            {validationError.email && <div className="text-red-500 text-sm">{validationError.email}</div>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-indigo-500 outline-none transition duration-200"
                value={password}
                onChange={e => setPassword(e.target.value)}
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
            {validationError.password && <div className="text-red-500 text-sm">{validationError.password}</div>}
          </div>
          <div>
            <label className="block text-gray-700 mb-2 font-medium" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                id="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                className="w-full px-4 py-3 rounded-lg bg-gray-100 border-2 border-transparent focus:border-indigo-500 outline-none transition duration-200"
                value={confirmPassword}
                onChange={e => setConfirmPassword(e.target.value)}
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
            {validationError.confirmPassword && <div className="text-red-500 text-sm">{validationError.confirmPassword}</div>}
          </div>
          <button
            type="submit"
            className="w-full py-3 rounded-lg bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition duration-200 shadow-lg"
          >
            Register
          </button>
        </form>
        <div className="mt-6 text-center text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline font-semibold">
            Sign In
          </Link>
        </div>
      </div>
    </div>
  );
};
export default RegisterPage;