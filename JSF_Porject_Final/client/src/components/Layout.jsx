import Navbar from "./Navbar.jsx";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <main className="mt-4">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
