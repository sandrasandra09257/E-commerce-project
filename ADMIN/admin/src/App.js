import React, { useState, useEffect } from 'react';
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import AdminLogin from './Components/AdminLogin';
import Header from './Components/header';
import Sidebar from './Components/sidebar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import AddItems from '../src/pages/AddItems';
import List from '../src/pages/List';
import Orders from '../src/pages/Orders';



const ProtectedRoute = ({ token, children }) => {
  if (!token) {
    return <Navigate to="/AdminLogin" />;
  }
  return children;
};

function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <BrowserRouter>
      <ToastContainer />
      <Routes>
        {/* Login Page */}
        <Route path="/AdminLogin" element={<AdminLogin setToken={setToken} />} />

        {/* Protected Dashboard Layout */}
        <Route
          path="/*"
          element={
            <ProtectedRoute token={token}>
              <div className="flex h-screen bg-gray-50">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content Area */}
                <div className="flex flex-col flex-1">
                  <Header />

                  {/* Horizontal Line */}
                  <div className="border-t border-gray-300"></div>

                  {/* Page content */}
                  <div className="p-6 overflow-y-auto flex-1">
                    <Routes>
                      <Route path="/add" element={<AddItems token={token} />} />
                      <Route path="/list" element={<List token={token} />} />
                      <Route path="/order" element={<Orders token={token} />} />
                    </Routes>
                  </div>
                </div>
              </div>
            </ProtectedRoute>
          }
        />

        {/* Default route */}
        <Route path="/" element={<Navigate to="/AdminLogin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;