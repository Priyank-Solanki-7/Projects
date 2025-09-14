import React from "react";
import { NavLink } from "react-router-dom";

function SidebarItem({ label, icon, to }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 w-full text-left px-4 py-2 rounded-xl transition-colors select-none hover:bg-slate-100 ${
          isActive ? "bg-slate-100 text-slate-900" : "text-slate-600"
        }`
      }
    >
      <span className="text-lg w-6 text-center">{icon}</span>
      <span className="text-sm font-medium">{label}</span>
    </NavLink>
  );
}
export default SidebarItem;