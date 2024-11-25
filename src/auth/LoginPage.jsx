import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { postData } from "@/utils/fetch-api-data";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
// import { Cookie } from "lucide-react";

const LoginPage = () => {
	const navigate = useNavigate();

	// const jwt = Cookies.get("token");
	// useEffect(() => {
	// 	if (jwt) {
	// 		navigate("/");
	// 	}
	// }, [jwt, navigate]);

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		const data = {
			email: formData.get("email"),
			password: formData.get("password"),
		};

		try {
			const { response } = await postData("user/login", data);
			// console.log(response.Cookies)
			console.log(response);
			// Check response status
			if (response.status === 200) {
				// Cookies.set("token", response.data._id);
				navigate("/"); // Correctly redirect to the home page on success
				toast.success("Logged in successfully!");
			} else {
				toast.error("Failed to log in. Please check your credentials.");
			}
		} catch (error) {
			console.error("Login error:", error);
			toast.error("Failed to log in. Please check your credentials.");
		}
	};

	// // Redirect if already logged in
	// if (isLoggedIn) {
	// 	return <Navigate to="/" />;
	// }

	return (
		<div className="bg-background h-screen flex items-center justify-center p-6 lg:p-10">
			<div className="w-full max-w-md mx-auto">
				<Card className="rounded-3xl shadow-lg border border-gray-200">
					<CardHeader className="text-center p-6">
						<CardTitle className="text-2xl font-semibold">Admin Login</CardTitle>
						<CardDescription className="text-gray-500 mt-2">
							Enter your email and password
						</CardDescription>
					</CardHeader>
					<CardContent className="p-6 space-y-6">
						<form onSubmit={handleSubmit} className="space-y-5">
							<div className="space-y-1">
								<label
									htmlFor="email"
									className="text-sm font-medium text-gray-700"
								>
									Email
								</label>
								<Input
									placeholder="youremail@example.com"
									id="email"
									name="email"
									className="rounded-lg px-4 py-2 border border-gray-300 w-full"
								/>
							</div>
							<div className="space-y-1">
								<label
									htmlFor="password"
									className="text-sm font-medium text-gray-700"
								>
									Password
								</label>
								<Input
									placeholder="Enter your password here ..."
									type="password"
									id="password"
									name="password"
									autoComplete="new-password"
									className="rounded-lg px-4 py-2 border border-gray-300 w-full"
								/>
							</div>
							<Button
								type="submit"
								className="w-full rounded-3xl py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold transition duration-200 ease-in-out"
							>
								Login
							</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
};

export default LoginPage;
