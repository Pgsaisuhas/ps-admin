import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { getData } from "../utils/fetch-api-data"; // Adjust the path as necessary
import { GrView } from "react-icons/gr";

const HomePage = () => {
	const navigate = useNavigate();
	const [problems, setProblems] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchProblems = async () => {
			try {
				const { response } = await getData("problem/all");
				console.log("API Response:", response); // Log the full response

				if (response.data && Array.isArray(response.data.data)) {
					setProblems(response.data.data);
				} else {
					console.error("Expected an array of problems but got:", response.data);
					toast.error("Failed to fetch problem statements.");
				}
			} catch (error) {
				console.error("Error fetching problem statements:", error);
				toast.error("Failed to fetch problem statements.");
			} finally {
				setLoading(false);
			}
		};

		fetchProblems();
	}, []);

	const handleLogout = () => {
		navigate("/login");
	};

	return (
		<div className="h-dvh flex flex-col">
			<header className="w-full shadow-md flex items-center justify-between px-8 py-4 bg-neutral-100 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 transition duration-300">
				<h1 className="text-2xl font-bold text-center flex-1">HomePage</h1>
				<button
					onClick={handleLogout}
					className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-300"
				>
					Logout
				</button>
			</header>

			<main className="flex-grow p-5">
				{loading ? (
					<p>Loading problems...</p>
				) : problems.length > 0 ? (
					<div className="overflow-x-auto shadow-md rounded-lg">
						<table className="min-w-full divide-y divide-gray-200 bg-black">
							<thead className="bg-transparent">
								<tr>
									<th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase">
										Problem ID
									</th>
									<th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase">
										Problem Statement
									</th>
									<th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase">
										Toughness Level
									</th>
									<th scope="col" className="px-6 py-3 text-left text-xs font-medium tracking-wider text-white uppercase">
										Preview
									</th>
								</tr>
							</thead>
							<tbody className="bg-gray-800 divide-y divide-gray-200">
								{problems.map(({ _id, problemId, problemStatement, toughnessLevel }) => (
									<tr key={_id}>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium text-gray-50">{problemId}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium text-gray-50">{problemStatement}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap">
											<div className="text-sm font-medium text-gray-50">{toughnessLevel}</div>
										</td>
										<td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
											<GrView
												onClick={() => navigate(`/detailed/${problemId}`)}
												style={{ cursor: 'pointer' }}
											/>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				) : (
					<p>No problems available</p>
				)}
			</main>
		</div>
	);
};

export default HomePage;
