import React from "react";
import { Navigate } from "react-router";
import { JSX } from "react/jsx-runtime";

interface ProtectedRouteProps {
	children: JSX.Element;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
	const token = localStorage.getItem("token");

	return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
