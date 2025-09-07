import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import LoginScreen from "./components/LoginScreen.jsx";
import RegisterPage from "./components/RegisterPage.jsx";
import Menu from "./components/Menu.jsx";
import Orders from "./components/Orders.jsx";
import Tables from "./components/Tables.jsx";
import Layout from "./components/Layout.jsx";

const route = createBrowserRouter([
  // public pages without navbar
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginScreen /> },

  // all other routes use Layout (Navbar + Outlet)
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <App /> },
      { path: "deskbord", element: <App /> },
      { path: "orders", element: <Orders /> },
      { path: "tables", element: <Tables /> },
      { path: "menu", element: <Menu /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={route} />
  </StrictMode>
);
