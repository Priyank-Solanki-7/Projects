import { Link } from "react-router-dom";
import image from "../assets/images/logo.jpg";

const Sidebar = ({ employee }) => {
  return (
    <div className="bg-black text-white w-64 min-h-screen flex flex-col p-4">
      {/* Employee Info */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={image}
          alt="employee"
          className="w-20 h-20 rounded-full border-2 border-green-500"
        />
        <h3 className="mt-2 font-bold p-2">{employee.name}</h3>
        <span className="bg-green-500 text-black text-xs px-2 py-1 rounded-full">
          {employee.role}
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-5">
        <Link to="/dashboard" className="hover:text-green-500">Dashboard</Link>
        <Link to="/inventory" className="hover:text-green-500">Inventory</Link>
        <Link to="/books" className="hover:text-green-500">Books</Link>
        <Link to="/combos" className="hover:text-green-500">Combos</Link>
        <Link to="/cart" className="hover:text-green-500">Cart</Link>
        <Link to="/orders" className="hover:text-green-500">Orders</Link>
        <Link to="/reports" className="hover:text-green-500">Reports</Link>
        <Link to="/customers" className="hover:text-green-500">Customers</Link>
        <Link to="/employees" className="hover:text-green-500">Employees</Link>
        <Link to="/profile" className="hover:text-green-500">My Profile</Link>
      </nav>
    </div>
  );
}
export default Sidebar;