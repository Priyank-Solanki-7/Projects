import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-black/75 via-black/75 to-black/80 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <div className="flex-shrink-0 flex items-center">
            <img
              className="h-9 w-9 rounded-full shadow-xl border-2 border-white"
              src="https://img.icons8.com/fluency/96/restaurant.png"
              alt="Restaurant Logo"
            />
            <span className="ml-3 text-2xl font-bold text-white tracking-wide drop-shadow">
              RestoManage
            </span>
          </div>
          {/* Menu */}
          <div className="hidden md:flex space-x-8">
            <Link
              to="/deskbord"
              className="text-white hover:text-yellow-300 font-semibold transition duration-150 px-3 py-2 rounded"
            >
              Dashboard
            </Link>
            <Link
              to="/orders"
              className="text-white hover:text-yellow-300 font-semibold transition duration-150 px-3 py-2 rounded"
            >
              Orders
            </Link>
            <Link
              to="/menu"
              className="text-white hover:text-yellow-300 font-semibold transition duration-150 px-3 py-2 rounded"
            >
              Menu
            </Link>
            <Link
              to="/tables"
              className="text-white hover:text-yellow-300 font-semibold transition duration-150 px-3 py-2 rounded"
            >
              Tables
            </Link>
            <Link
              to="/staff"
              className="text-white hover:text-yellow-300 font-semibold transition duration-150 px-3 py-2 rounded"
            >
              Staff
            </Link>
            <Link
              to="/reports"
              className="text-white hover:text-yellow-300 font-semibold transition duration-150 px-3 py-2 rounded"
            >
              Reports
            </Link>
          </div>
          {/* User Profile */}
          <div className="flex items-center space-x-4">
            <button className="bg-yellow-400 text-indigo-800 bg-opacity-20 hover:bg-yellow-400 hover:text-red-800 font-semibold px-4 py-2 rounded-lg shadow transition duration-200">
              Profile
            </button>
            <Link to="/login">
              <button className="bg-yellow-400 text-indigo-800 font-bold px-4 py-2 rounded-lg shadow hover:bg-yellow-500 transition duration-200">
                Logout
              </button>
            </Link>
          </div>
        </div>
      </div>
      {/* Mobile Menu */}
      <div className="md:hidden px-4 pb-4">
        <div className="flex flex-col space-y-2">
          <a
            href="#dashboard"
            className="text-white hover:text-yellow-300 font-semibold transition px-3 py-2 rounded"
          >
            Dashboard
          </a>
          <a
            href="#orders"
            className="text-white hover:text-yellow-300 font-semibold transition px-3 py-2 rounded"
          >
            Orders
          </a>
          <a
            href="#menu"
            className="text-white hover:text-yellow-300 font-semibold transition px-3 py-2 rounded"
          >
            Menu
          </a>
          <a
            href="#tables"
            className="text-white hover:text-yellow-300 font-semibold transition px-3 py-2 rounded"
          >
            Tables
          </a>
          <a
            href="#staff"
            className="text-white hover:text-yellow-300 font-semibold transition px-3 py-2 rounded"
          >
            Staff
          </a>
          <a
            href="#reports"
            className="text-white hover:text-yellow-300 font-semibold transition px-3 py-2 rounded"
          >
            Reports
          </a>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
