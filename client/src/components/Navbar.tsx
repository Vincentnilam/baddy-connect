import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router";
import { User } from "../types/User";

const Navbar: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchUser = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }
  
        try {
          const response = await fetch(
            `${import.meta.env.VITE_BACKEND_APP_URL}/auth/me`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            setError("Failed to fetch user data. Please re-login.");
            localStorage.removeItem("token");
            navigate("/login");
          }
        } catch (err) {
          console.error("Fetch error:", err);
          setError("An unexpected error occurred.");
          localStorage.removeItem("token");
          navigate("/login");
        }
      };
  
      fetchUser();
    }, [navigate]);
  
    const handleLogout = () => {
      localStorage.removeItem("token");
      navigate("/login");
    };
  
    return (
        <nav className="fixed top-0 left-0 right-0 w-full px-6 py-4 flex justify-between items-center text-white bg-[#1A1A1A] border-b border-gray-700 z-50">

        <h1 className="text-lg font-semibold">BaddyConnect</h1>
  
        <div className="flex space-x-4 items-center">
          { (user?.role === "organizer" || user?.role === "admin")  && (
            <button
              onClick={() => navigate("/events/create")}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md text-sm"
            >
              Create Event
            </button>
          )}
          {user && (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="bg-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md text-sm"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md text-sm"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </nav>
    );
  };
  
  export default Navbar;