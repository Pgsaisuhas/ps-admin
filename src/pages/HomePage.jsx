import React from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
	const navigate = useNavigate();
	const handleLogout = () => {
		Cookies.remove("token", { path: "/" });
		toast.success("Logged out successfully!");
		navigate("/login");
	};

	const token = Cookies.get("token");

	return (
		<div className="min-h-screen flex items-center justify-center p-6">
			<div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
				<h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the HomePage!</h1>
				<p className="text-gray-600 mb-8">Explore our content or manage your account.</p>
				{token && (
					<button
						onClick={handleLogout}
						className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
					>
						Logout
					</button>
				)}
			</div>
		</div>
	);
};

export default HomePage;