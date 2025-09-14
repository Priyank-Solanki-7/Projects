import { Link,Navigate, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.jpg";
import { useContext } from "react";
import { CartContext } from "../store/cartContextValue";

const Navbar = ({ employee }) => {
  const navigate = useNavigate();
  const handleCartNavigate = () => {
    navigate("/cart");
  }
  const { cart = [] } = useContext(CartContext) || {};
  const count = (cart || []).reduce((s, it) => s + (it.quantity || 1), 0);

  return (
    <div className="flex justify-between items-center bg-white shadow px-6 py-3">
      <div className="flex items-center space-x-3">
        <img src={logo} alt="logo" className="h-10" />
        <h1 className="text-green-600 font-bold text-xl">Buy School Book</h1>
      </div>
      <div className="flex items-center space-x-4">
        <span className="text-white px-3 py-1 rounded-full bg-green-600 text-sm">
          {employee.role}
        </span>

        {/* cart icon used as animation target */}
        <div id="nav-cart-icon" className="relative cursor-pointer">
          <span className="text-2xl" onClick={() => handleCartNavigate()}>🛒</span>
          {count > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs px-1 rounded-full">
              {count}
            </span>
          )}
        </div>

        <Link
          to="/"
          className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
        >
          Logout
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
