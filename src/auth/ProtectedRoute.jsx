import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";


const ProtectedRoute = ({ isLoggedIn }) => {
	// const location = useLocation();

	if (!isLoggedIn) {
		// Redirect to login page, but store the current location for later redirection
		return <Navigate to="/login"  replace />;
	}

	// If logged in, render the child routes using Outlet
	return <Outlet />;
};

export default ProtectedRoute;
