import React, { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { NavLink, useNavigate } from "react-router-dom";

 const AdminLogin = ({ setToken }) => {
    const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const backend_url = process.env.REACT_APP_BACKEND_URL ; 
  console.log("Backend URL:", backend_url);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backend_url}/user/admin`, {
        email,
        password,
      });

      if (response.data.success) {
        console.log("Token:", response.data.token);
        setToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        toast.success("Login Successful");
        setTimeout(() => navigate("/Sidebar"), 1000);
      } else {
        toast.error(response.data.message || "Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Login failed. Please try again later.");
    }
  };

 return (
   <div className="flex items-center justify-center h-screen bg-gray-100">
     <div className="w-96 p-8 shadow-lg bg-white rounded-lg text-center">
       <h2 className="text-2xl font-bold mb-6">Admin Login</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4"> 
        <div className="w-full flex flex-col items-center">
            
   <label className="mb-2 font-medium">Email</label>
    <input type="email" placeholder="Enter your Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border rounded text-center" required />
     </div>
      <div className="w-full flex flex-col items-center"> 
        <label className="mb-2 font-medium">Password</label> 
        <input type="password" placeholder="Enter your Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border rounded text-center" required />
         </div> 
         <button type="submit" className="bg-black text-white p-2 rounded w-full" > Login </button> 
         </form> 
         </div> 
         </div> 
         ); 
        }; 
        export default AdminLogin;