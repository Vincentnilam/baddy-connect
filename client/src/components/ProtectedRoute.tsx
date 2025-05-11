import React from "react";
import { Navigate } from "react-router";
import { JSX } from "react/jsx-runtime";
import { jwtDecode } from "jwt-decode";
import Forbidden from "./Forbidden";

interface ProtectedRouteProps {
	children: JSX.Element;
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
	const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/login" />;

    try {
      const decoded: any = jwtDecode(token);
      const userRole = decoded?.role;

      if (allowedRoles && !allowedRoles.includes(userRole)) {
        // navigate dashboard or forbidden?
        return <Forbidden />;
      }
    } catch(err) {
      console.error("Invalid token", err);
      return <Navigate to="/login" />;
    }
  
  return children;
};

export default ProtectedRoute;
