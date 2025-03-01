import React from "react";
import { useState } from "react";
import { FaEye, FaEyeSlash, FaSpinner} from 'react-icons/fa';
import { useNavigate } from "react-router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/ReactToastify.css";

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

			const res = await fetch(`${import.meta.env.VITE_BACKEND_APP_URL}/auth/${endpoint}`, {
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
					toast.success("Signup successful! Please check your email for verification link!.");
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
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#121212] to-[#1E1E1E] p-4">
			<div className="bg-[#1E1E1E] text-white rounded-lg shadow-lg p-8 w-full max-w-md overflow-hidden">		
				<img src="/src/assets/logo.jpg" alt="Baddie Connect's Logo" className="mx-auto w-70 h-40 object-contain" />
				<h2 className="text-2xl font-bold mb-5 text-center">
					{ authMode === "login" ? "Login" : "Sign Up"}
				</h2>
				
				{error && <p className="text-red-500 mb-4">{error}</p>}

				<form onSubmit={handleSubmit}>
					{authMode === "signup" && (
						<div className="relative mb-8">
							<input
								type="email"
								id="email"
								value={email}
								onChange={handleEmailChange}
								className="peer w-full px-4 pt-6 pb-2 bg-[#252525] border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
								placeholder="Email"
							/>
							<label
								htmlFor="email"
								className={`absolute left-4 text-gray-500 text-base transition-all bg-[#252525]
									${email ? "top-2 text-sm text-blue-400" : "top-5 text-gray-500"}
									peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400`}
							>
								Email
							</label>
						</div>
					)}
					<div className="relative mb-8">
						<input
							type="text"
							id="username"
							className="peer w-full px-4 pt-6 pb-2 bg-[#252525] border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
							value={username}
							onChange={handleUsernameChange}
							placeholder="Username"
							required
						/>
						<label 
							htmlFor="username" 
							className={`absolute left-4 text-gray-500 text-base transition-all bg-[#252525]
								${username ? "top-2 text-sm text-blue-400" : "top-5 text-gray-500"}
								peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400`}
						>
								Username
						</label>
					</div>
					<div className="relative mb-8">
						<input
							type={showPassword ? "text" : "password"}
							id="password"
							className="peer w-full px-4 pt-6 pb-2 bg-[#252525] border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
							value={password}
							onChange={handlePasswordChange}
							placeholder="Enter your password"
							required
						/>
						<label 
							htmlFor="password" 
							className={`absolute left-4 text-gray-500 text-base transition-all bg-[#252525]
								${password ? "top-2 text-sm text-blue-400" : "top-5 text-gray-500"}
								peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400`}>
								Password
						</label>
						<button
							type="button"
							className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? <FaEye className="text-gray-400" /> : <FaEyeSlash className="text-gray-400" />}
						</button>
					</div>
					
					{authMode === "signup" && (
						<div className="relative mb-8">
							<input
								type={showConfirmPassword? "text" : "password"}
								className="peer w-full px-4 pt-6 pb-2 bg-[#252525] border border-gray-300 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-transparent"
								value={confirmPassword}
								onChange={handleConfirmPasswordChange}
								placeholder="Confirm your password"
								required
							/>
							<label 
								htmlFor="confirmPassword"
								className={`absolute left-4 text-gray-500 text-base transition-all bg-[#252525]
									${confirmPassword ? "top-2 text-sm text-blue-400" : "top-5 text-gray-500"}
									peer-focus:top-2 peer-focus:text-sm peer-focus:text-blue-400`}>
									Confirm Password
							</label>
							<button
								type="button"
								className="absolute inset-y-0 right-0 px-3 py-2 focus:outline-none"
								onClick={() => setShowConfirmPassword(!showConfirmPassword)}
							>
								{showConfirmPassword ? <FaEye className="text-gray-400" /> : <FaEyeSlash className="text-gray-400" />}
							</button>
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
				<p className="mt-4 text-center text-gray-400">
					{authMode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
					<button className="text-blue-400 font-semibold hover:underline cursor-pointer" onClick={toggleAuthMode}>
						{authMode === "login" ? "Sign Up" : "Log In"}
					</button>
				</p>
			</div>
			<ToastContainer position="top-right" autoClose={3000} hideProgressBar />
		</div>
	);
};

export default AuthPage;