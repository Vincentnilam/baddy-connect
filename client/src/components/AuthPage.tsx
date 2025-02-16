import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner} from 'react-icons/fa';
import { useNavigate } from "react-router";

const AuthPage: React.FC = () => {
	const [authMode, setAuthMode] = useState<"login"|"signup">("login");
	
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [loading, setLoading] = useState(false);

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	
	const [error, setError] = useState('');
	
	const navigate = useNavigate();

	const toggleAuthMode = () => {
		setAuthMode(authMode === "login" ? "signup" : "login");
		setError("");
		setEmail("");
		setUsername("");
		setPassword("");
		setConfirmPassword("");
		setShowConfirmPassword(false);
		setShowPassword(false);
	}

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!username || !password) {
			setError("Username or Password is required");
			return;
		}

		if (authMode === "signup") {
			if (!email) {
				setError("Email is required");
				return;
			}

			if (password !== confirmPassword) {
				setError("Passwords do not match");
				return;
			} 
		}

		setLoading(true);

		try {
			// either login/signup based on authMode for endpoint and body
			const endpoint = authMode === "login" ? "login" : "signup";
			const body = authMode === "login" ? {username, password} : {username, email, password};

			const res = await fetch(`http://localhost:3000/auth/${endpoint}`, {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify(body),
			});

			const data = await res.json();

			if (res.ok) {
				if (authMode === "login") {
					localStorage.setItem("token", data.accessToken);
					navigate("/dashboard");
				} else {
					// alert successful and redirect to login
					alert("Signup successful! Please log-in");
					toggleAuthMode();
				}
			} else {
				setError(data.message || "Invalid username/password");
			}

		} catch (err) {
			console.error("error during login: ", err);
			setError("An error occured. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const newEmail = e.target.value;
		setEmail(newEmail);

		if (!newEmail) {
			setError("");
		} else if (!emailRegex.test(newEmail)) {
			setError("Invalid e-mail format.");
		} else {
			setError("");
		}
	}

	const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
		setError("");
	}

	const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
		setError("");
	}

	const handleConfirmPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPassword(e.target.value);
		setError("");
	}

	return (
		<div className="h-screen flex items-center justify-center bg-gradient-to-br from-[#072b8f] to-[rgb(218,223,231)]">
			<div className="bg-white rounded-lg shadow-lg flex w-[1000px] h-[600px] overflow-hidden">		
				{/* left */}
				<div 
						className="w-1/2 bg-cover bg-center flex items-center justify-center"
						style={{ backgroundImage: "url('/src/assets/logo.jpg')" }}
				>
				</div>
				{/* right */}
				<div className="w-1/2 p-6 flex flex-col justify-center">
					<h2 className="text-2xl font-bold mb-4 text-center">
						{ authMode === "login" ? "Login" : "Sign Up"}
					</h2>
					
					{error && <p className="text-red-500 mb-4">{error}</p>}

					<form onSubmit={handleSubmit}>
						{authMode === "signup" && (
							<div className="mb-4">
								<label htmlFor="email" className="block text-gray-700 font-bold mb-2">
										E-mail
								</label>
								<input
									type="email"
									id="email"
									className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={email}
									onChange={handleEmailChange}
									placeholder="Enter your e-mail"
								/>
							</div>
						)}
						<div className="mb-4">
							<label htmlFor="username" className="block text-gray-700 font-bold mb-2">
								Username
							</label>
							<input
								type="text"
								id="username"
								className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
								value={username}
								onChange={handleUsernameChange}
								placeholder="Enter your username"
								required
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
									onChange={handlePasswordChange}
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
										onChange={handleConfirmPasswordChange}
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
								className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 disabled:opacity-50 cursor-pointer flex items-center justify-center min-w-[100px] h-[40px]"
								disabled={loading || !!error}
							>
								{loading ? <FaSpinner className="animate-spin" /> : authMode === "login" ? "Log In" : "Sign Up"}
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
		</div>
	);
};

export default AuthPage;