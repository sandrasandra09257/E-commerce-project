import React from "react";

function Header() {
  return (
    <div className="flex flex-col items-end">
      
      

        <button className=" h-10 w-32 mt-7 rounded-2xl bg-slate-500 text-white font-medium hover:bg-slate-600 transition">
          Logout
        </button>
    

      
      <div className="border-t border-gray-[30%] mt-2"></div>
    </div>
  );
}

export default Header;
