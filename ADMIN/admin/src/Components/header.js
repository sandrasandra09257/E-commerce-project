import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const navigate = useNavigate();

  const handleLogout = () => {
    // 🔹 Remove token from localStorage
    localStorage.removeItem("token");

    // 🔹 Show success message
    toast.success("Logged out successfully!");

    // 🔹 Redirect to Admin Login page
    navigate("/AdminLogin");
  };

  return (
    <div className="flex flex-col items-end">
      <button
        onClick={handleLogout}
        className="h-10 w-32 mt-7 rounded-2xl bg-slate-500 text-white font-medium hover:bg-slate-600 transition"
      >
        Logout
      </button>

      <div className="border-t border-gray-300 mt-2 w-full"></div>
    </div>
  );
}

export default Header;
