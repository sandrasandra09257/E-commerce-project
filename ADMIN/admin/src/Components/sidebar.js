import React from "react";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <div className="flex flex-col w-60 h-screen border-r border-gray-200 bg-white">
      {/* Logo / Title */}
      <div className="px-4 py-6 text-center border-b border-gray-300">
        <h1 className="text-xl font-bold text-gray-800 tracking-wide">
          FOREVER.
        </h1>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col items-center mt-8 space-y-4">
        <NavLink
          to="/add"
          className={({ isActive }) =>
            `w-40 text-center border-2 rounded-md py-2 font-semibold transition duration-300 ${
              isActive
                ? "bg-gray-400 border-gray-400 text-gray-800"
                : "bg-white hover:bg-gray-100 border-gray-300 text-gray-700"
            }`
          }
        >
          Add Items
        </NavLink>

        <NavLink
          to="/list"
          className={({ isActive }) =>
            `w-40 text-center border-2 rounded-md py-2 font-semibold transition duration-300 ${
              isActive
                ? "bg-gray-400 border-gray-400 text-gray-800"
                : "bg-white hover:bg-gray-100 border-gray-300 text-gray-700"
            }`
          }
        >
          List
        </NavLink>

        <NavLink
          to="/order"
          className={({ isActive }) =>
            `w-40 text-center border-2 rounded-md py-2 font-semibold transition duration-300 ${
              isActive
                ? "bg-gray-400 border-gray-400 text-gray-800"
                : "bg-white hover:bg-gray-100 border-gray-300 text-gray-700"
            }`
          }
        >
          Orders
        </NavLink>
      </div>
    </div>
  );
}

export default Sidebar;
