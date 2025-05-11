import React, { useState, useEffect, useRef } from "react";
import Sidebar from "./Sidebar";
import { Menu, Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { jwtDecode } from "jwt-decode";

const LayoutShell: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [role, setRole] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        setRole(decoded?.role);
      } catch (err) {
        console.error("Invalid token");
      }
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Mobile toggle button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="sm:hidden fixed top-4 left-4 z-50 bg-[#1A1A1A] p-2 rounded-md text-white"
      >
        <Menu size={24} />
      </button>

      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      <main className="sm:ml-64 p-4 pt-6">{/* sm:ml-64 offsets sidebar */}
        {children}
      </main>

      {/* Floating Create Event button for mobile */}
      {(role === "organizer" || role === "admin") && (
        <button
          onClick={() => navigate("/events/create")}
          className="sm:hidden fixed bottom-6 right-6 z-40 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-full shadow-lg flex items-center gap-2"
        >
          <Plus size={20} />
          <span className="text-sm font-medium">Create</span>
        </button>
      )}
    </div>
  );
};

export default LayoutShell;
