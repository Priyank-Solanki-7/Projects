import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import Books from "./pages/Books";
import Combos from "./pages/Combos";
import Cart from "./pages/Cart";
import Orders from "./pages/Orders";
import Reports from "./pages/Reports";
import Customers from "./pages/Customers";
import Employees from "./pages/Employees";
import Profile from "./pages/Profile";
import AddBook from "./pages/AddBook";
import AddCombo from "./pages/AddCombo";
import Checkout from "./pages/Checkout";
import  CartProvider  from "./store/CartContext";

const App = () => {
  const employee = {
    name: "John Doe",
    role: "Manager",
    image: "https://via.placeholder.com/150",
  };

  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Login />} />

        {/* Protected Layout */}
        <Route
          path="/*"
          element={
            <CartProvider>
              <div className="flex">
                <Sidebar employee={employee} />
                <div className="flex flex-col w-full">
                  <Navbar employee={employee} />
                  <div className="flex-1 bg-gray-50 min-h-screen p-6">
                    <Routes>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/inventory" element={<Inventory />} />
                      <Route path="/books" element={<Books />} />
                      <Route path="/combos" element={<Combos />} />
                      <Route path="/cart" element={<Cart />} />
                      <Route path="/checkout" element={<Checkout />} />
                      <Route path="/orders" element={<Orders />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/customers" element={<Customers />} />
                      <Route path="/employees" element={<Employees />} />
                      <Route path="/profile" element={<Profile />} />
                      <Route path="/add-book" element={<AddBook />} />
                      <Route path="/add-combo" element={<AddCombo />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </CartProvider>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
