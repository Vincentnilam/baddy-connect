import React from "react";
import { useNavigate } from "react-router";

const Forbidden: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-[#121212] text-white px-4">
      <h1 className="text-4xl font-bold mb-4">403 - Forbidden</h1>
      <p className="text-gray-400 text-center max-w-md">
        You don’t have permission to access this page. Please contact an administrator if you believe this is an error.
      </p>
      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-semibold"
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default Forbidden;
