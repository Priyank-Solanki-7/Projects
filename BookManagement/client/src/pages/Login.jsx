import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-md p-6 rounded-md w-80">
        <h2 className="text-center text-2xl font-bold text-green-600 mb-4">Login</h2>
        <form className="flex flex-col space-y-3">
          <input type="email" placeholder="Email" className="border p-2 rounded" />
          <input type="password" placeholder="Password" className="border p-2 rounded" />
          <Link to="/books" className="bg-green-500 text-center text-white py-2 rounded hover:bg-green-600">
            Login
          </Link>
        </form>
      </div>
    </div>
  );
}
export default Login