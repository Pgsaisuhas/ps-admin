import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { getData } from "../utils/fetch-api-data"; // Adjust the path as necessary

const HomePage = () => {
	const navigate = useNavigate();
	const [problems, setProblems] = useState([]);

	useEffect(() => {
		const fetchProblems = async () => {
			try {
				// Use the backend URL from the environment variable
				// const endpoint = `${import.meta.env.VITE_BACKEND_URL}/api/problem/all`;
				const { response } = await getData("problem/all");
				console.log(response.data)
				// Set the problems if data was retrieved successfully
				setProblems(response.data);
			} catch (error) {
				console.error("Error fetching problem statements:", error);
				console.log(problems)
				toast.error("Failed to fetch problem statements.");
			}
		};

		fetchProblems();
	}, []);

	const handleLogout = () => {
		navigate("/login");
	};


	return (
		<div className="h-dvh flex items-center justify-center p-5">
			<div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
				<h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome to the HomePage!</h1>
				<p className="text-gray-600 mb-8">Explore our content or manage your account.</p>
				 
					<button
						onClick={handleLogout}
						className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
					>
						Logout
					</button>
				
			</div>
		</div>
	);
};

export default HomePage;
