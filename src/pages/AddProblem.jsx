import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "@/utils/fetch-api-data"; // Custom API function to post data
import CodeEditor from "@/components/CodeEditor"; // Reusable code editor component
import { MdSave, MdCancel } from "react-icons/md";
import { toast } from "sonner";

const AddProblem = () => {
	const navigate = useNavigate();

	const [problemData, setProblemData] = useState({
		problemStatement: "",
		toughnessLevel: "novice",
		templateCodePy: "",
		templateCodeJava: "",
		templateCodeCpp: "",
		driverCodePy: "",
		driverCodeJava: "",
		driverCodeCpp: "",
	});

	const [selectedLanguage, setSelectedLanguage] = useState("python");
	const [codeType, setCodeType] = useState("template");

	// Mapping for Monaco Editor's supported languages
	const languageMap = {
		python: "python",
		java: "java",
		cpp: "cpp",
	};

	const handleChange = (field, value) => {
		setProblemData((prev) => ({ ...prev, [field]: value }));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			console.log("Form Details:", problemData);
			await postData(`problem/add`, problemData);
			toast.success("Problem saved successfully!");

			setTimeout(() => {
				navigate("/"); // Navigate to home after 3 seconds
			}, 3000);
		} catch (error) {
			toast.error("Error saving problem data!");
		}
	};

	const getCodeForLanguage = () => {
		if (codeType === "template") {
			return {
				python: problemData.templateCodePy,
				java: problemData.templateCodeJava,
				cpp: problemData.templateCodeCpp,
			}[selectedLanguage];
		}
		if (codeType === "driver") {
			return {
				python: problemData.driverCodePy,
				java: problemData.driverCodeJava,
				cpp: problemData.driverCodeCpp,
			}[selectedLanguage];
		}
		return "";
	};

	const getCodeFieldName = () => {
		const langMap = { python: "Py", java: "Java", cpp: "Cpp" };
		return `${codeType}Code${langMap[selectedLanguage]}`;
	};

	return (
		<div className="flex h-screen overflow-hidden">
			{/* Left Column - Form Elements */}
			<div className="w-1/3 p-6 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200 overflow-y-auto">
				<h1 className="text-2xl font-semibold text-center mb-6">Add New Problem</h1>

				<form onSubmit={handleSubmit}>
					{/* Problem Statement */}
					<div className="mb-6">
						<h2 className="text-xl font-medium">Problem Statement</h2>
						<textarea
							value={problemData.problemStatement}
							onChange={(e) => handleChange("problemStatement", e.target.value)}
							className="mt-2 w-full p-2 border rounded bg-gray-700 text-white"
							rows="4"
							placeholder="Enter the problem statement here"
							required
						/>
					</div>

					{/* Toughness Level */}
					<div className="mb-6">
						<h2 className="text-xl font-medium">Toughness Level</h2>
						<select
							value={problemData.toughnessLevel}
							onChange={(e) => handleChange("toughnessLevel", e.target.value)}
							className="mt-2 p-2 border rounded bg-gray-700 text-white"
							required
						>
							<option value="novice">Novice</option>
							<option value="coder">Coder</option>
							<option value="hacker">Hacker</option>
							<option value="guru">Guru</option>
							<option value="Master">Master</option>
						</select>
					</div>

					{/* Language Selection */}
					<div className="mb-6">
						<h2 className="text-xl font-medium">Language Selection</h2>
						<select
							className="mt-2 p-2 border border-gray-300 dark:border-gray-700 bg-gray-800 text-white rounded"
							value={selectedLanguage}
							onChange={(e) => setSelectedLanguage(e.target.value)}
						>
							<option value="python">Python</option>
							<option value="java">Java</option>
							<option value="cpp">C++</option>
						</select>
					</div>

					{/* Code Type Selection */}
					<div className="mb-6">
						<h2 className="text-xl font-medium">Code Type</h2>
						<select
							className="mt-2 p-2 border border-gray-300 dark:border-gray-700 bg-gray-800 text-white rounded"
							value={codeType}
							onChange={(e) => setCodeType(e.target.value)}
						>
							<option value="template">Template Solution</option>
							<option value="driver">Driver Code</option>
						</select>
					</div>

					{/* Submit Buttons */}
					<div className="mt-6 flex gap-4 justify-center">
						<button
							type="submit"
							className="px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
						>
							<MdSave className="inline-block mr-2" />
							Save Problem
						</button>
						<button
							type="button"
							onClick={() => navigate("/")}
							className="px-6 py-2 bg-gray-500 text-white font-bold rounded hover:bg-gray-700 transition duration-300"
						>
							<MdCancel className="inline-block mr-2" />
							Cancel
						</button>
					</div>
				</form>
			</div>

			{/* Right Column - Code Editor */}
			<div className="w-2/3 p-6 bg-gray-100 dark:bg-gray-900 overflow-hidden">
				<h2 className="text-xl font-medium mb-4">Code Editor</h2>
				<CodeEditor
					language={languageMap[selectedLanguage]} // Pass the correct language
					code={getCodeForLanguage()} // Get the current code based on language and code type
					onChange={(value) => handleChange(getCodeFieldName(), value)}
				/>
			</div>
		</div>
	);
};

export default AddProblem;
