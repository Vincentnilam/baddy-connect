import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash} from 'react-icons/fa';
import { useNavigate } from "react-router";

const AuthPage: React.FC = () => {
	const [authMode, setAuthMode] = useState<"login"|"signup">("login");
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [error, setError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const navigate = useNavigate();

	const toggleAuthMode = () => setAuthMode(authMode === "login" ? "signup" : "login");

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!username || !password) {
			setError("Username or Password is required");
			return;
		}

		if (authMode === "signup" && password !== confirmPassword) {
			setError("Passwords do not match");
			return;
		}

		try {
			const res = await fetch("http://localhost:3000/auth/login", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({ username, password }),
			});

			if (res.ok) {
				const token = await res.json();
				localStorage.setItem("token", token.accessToken);
				navigate("/dashboard");
			} else {
				const errData = await res.json();
				setError(errData.message || "Invalid username/password");
			}
		} catch (err) {
			console.error("error during login: ", err);
			setError("An error occured. Please try again.");
		}
	};

	return (
		<div className="flex items-center justify-center h-screen bg-gray-100">
			<div className="bg-white p-8 rounded-lg shadow-md w-96">
				<h2 className="text-2xl font-bold mb-4 text-center">
					{ authMode === "login" ? "Login" : "Sign Up"}
				</h2>
				
				{error && <p className="text-red-500 mb-4">{error}</p>}

				<form onSubmit={handleSubmit}>
					<div className="mb-4">
						<label htmlFor="username" className="block text-gray-700 font-bold mb-2">
							Username
						</label>
						<input
							type="text"
							id="username"
							className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Enter your username"
						/>
					</div>
					<div className="mb-6">
						<label htmlFor="password" className="block text-gray-700 font-bold mb-2">
							Password
						</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								id="password"
								className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								placeholder="Enter your password"
								required
							/>
							<button
								type="button"
								className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <FaEye className="text-gray-500" /> : <FaEyeSlash className="text-gray-500" />}
							</button>
						</div>
					</div>
					
					{authMode === "signup" && (
						<div className="mb-6">
							<label htmlFor="confirmPassword" className="block text-gray-700 font-bold mb-2">
								Confirm Password
							</label>
							<div className="relative">
								<input
									type={showConfirmPassword? "text" : "password"}
									className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									placeholder="Confirm your password"
									required
								/>
								<button
									type="button"
									className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
									onClick={() => setShowConfirmPassword(!showConfirmPassword)}
								>
									{showConfirmPassword ? <FaEye className="text-gray-500" /> : <FaEyeSlash className="text-gray-500" />}
								</button>
							</div>
						</div>
					)}
					<div className="flex justify-center">
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 cursor-pointer"
						>
							{authMode === "login" ? "Log In" : "Sign Up"}
						</button>
					</div>
				</form>
				<div className="mt-4 text-center">
					<p className="text-gray-700">
						{authMode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
						<button className="text-blue-500 hover:underline cursor-pointer" onClick={toggleAuthMode}>
							{authMode === "login" ? "Sign Up" : "Log In"}
						</button>
					</p>
				</div>
			</div>
		</div>
	);
};

export default AuthPage;