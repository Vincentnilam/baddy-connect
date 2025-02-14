import React, { useEffect, useState} from "react";
import { useNavigate } from "react-router";

const Dashboard: React.FC = () => {
    const [msg, setMsg] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);
	const navigate = useNavigate();

    useEffect(() => {
        const fetchMsg = async () => {
            const token = localStorage.getItem("token");

            if (!token) {
                navigate("/login");
                return;
            }
            
            try {
                const response = await fetch("http://localhost:3000/auth/me", {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setMsg(data.message);
                } else {
                    setError("Failed to fetch user data. Please re-login");
                    localStorage.removeItem("token");
                    navigate("/login");
                }
            } catch (err) {
                console.log(err);
                setError("An error occurred. Please try again.");
            }
        };

        fetchMsg();
    }, [navigate]);

    const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

    if (error) {
		return (
			<div className="flex items-center justify-center h-screen bg-gray-100">
				<div className="text-center">
					<p className="text-red-500 mb-4">{error}</p>
					<button
						onClick={() => navigate("/login")}
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md"
					>
						Go to Login
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md text-center">
				<h2 className="text-2xl font-bold mb-4">Welcome to the Dashboard!</h2>
				{msg ? <p className="text-lg">{msg}</p> : <p>Loading...</p>}
				<button
					onClick={handleLogout}
					className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md mt-4"
				>
					Logout
				</button>
			</div>
		</div>
	);
};

export default Dashboard;