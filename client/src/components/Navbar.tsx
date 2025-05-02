import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router";

const Navbar: React.FC = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <nav className="fixed top-4 left-1/2 transform -translate-x-1/2 w-[90%] p-4 flex justify-between items-center text-white max-w-4xl">
            <h1 className="text-lg font-semibold">Dashboard</h1>
            {/* Search Bar? */}
            <input
                type="text"
                placeholder="Search..."
                className="bg-[#2A2A2A] text-white px-4 py-2 rounded-md outline-none w-64"
            />
        </nav>
    );
}

export default Navbar;