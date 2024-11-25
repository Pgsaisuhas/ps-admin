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
		Cookies.remove("token", { path: "/" });
		toast.success("Logged out successfully!");
		navigate("/login");
	};

	const token = Cookies.get("token");

	return (
		<div className="min-h-screen flex flex-col">
			{/* Header */}
			<header className="flex justify-between items-center p-6 shadow-md">
				<h1 className="text-3xl font-bold text-center flex-grow text-gray-800">HomePage</h1>
				{token && (
					<button
						onClick={handleLogout}
						className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
					>
						Logout
					</button>
				)}
			</header>

			{/* Main content */}
			<main className="flex-grow flex items-center justify-center p-6">
				<div className="max-w-lg w-full bg-white rounded-lg shadow-lg p-8 text-center">
					<p className="text-gray-600 mb-8">
						Explore our content or manage your account.
					</p>
					<ul>
						{problems.map((problem, index) => (
							<li key={index} className="text-gray-800 mb-4">
								{problem.title}
							</li>
						))}
					</ul>
				</div>
			</main>
		</div>
	);
};

export default HomePage;
