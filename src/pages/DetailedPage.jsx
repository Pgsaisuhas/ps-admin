import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getData, putData } from "@/utils/fetch-api-data";
import CodeEditor from "@/components/CodeEditor";
import { MdOutlineArrowBackIosNew, MdEdit, MdSave, MdClose } from "react-icons/md";

const DetailedPage = () => {
	const { problemId } = useParams();
	const [problemData, setProblemData] = useState(null);
	const [isLoading, setIsLoading] = useState(true);
	const [selectedLanguage, setSelectedLanguage] = useState("python");
	const [codeType, setCodeType] = useState("template");
	const [editState, setEditState] = useState({
		problemStatement: false,
		toughnessLevel: false,
		templateCodePy: false,
		templateCodeJava: false,
		templateCodeCpp: false,
		driverCodePy: false,
		driverCodeJava: false,
		driverCodeCpp: false,
	});
	const [editValues, setEditValues] = useState({});

	useEffect(() => {
		const fetchProblemData = async () => {
			try {
				const { response } = await getData(`problem/${problemId}`);
				setProblemData(response.data);
				setEditValues(response.data);
			} catch (error) {
				console.error("Error fetching problem data:", error);
			} finally {
				setIsLoading(false);
			}
		};

		if (problemId) fetchProblemData();
	}, [problemId]);

	const handleEdit = (field) => {
		setEditState((prev) => ({ ...prev, [field]: true }));
	};

	const handleCancel = (field) => {
		setEditState((prev) => ({ ...prev, [field]: false }));
		setEditValues((prev) => ({ ...prev, [field]: problemData[field] }));
	};

	const handleSave = async (field) => {
		try {
			await putData(`problem/update/${problemId}`, {
				[field]: editValues[field],
			});
			setProblemData((prev) => ({ ...prev, [field]: editValues[field] }));
			setEditState((prev) => ({ ...prev, [field]: false }));
		} catch (error) {
			console.error("Error updating field:", error);
		}
	};

	const handleChange = (field, value) => {
		console.log("Field:", field, "Value:", value);
		setEditValues((prev) => ({ ...prev, [field]: value }));
	};

	if (isLoading) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p className="text-lg text-gray-500">Loading...</p>
			</div>
		);
	}

	if (!problemData) {
		return (
			<div className="flex items-center justify-center h-screen">
				<p className="text-lg text-red-500">Problem data not found.</p>
			</div>
		);
	}

	const languageOptions = [
		{ label: "Python", value: "python" },
		{ label: "Java", value: "java" },
		{ label: "C++", value: "cpp" },
	];

	const codeTypeOptions = [
		{ label: "Template Solution", value: "template" },
		{ label: "Driver Code", value: "driver" },
	];

	const getCodeForLanguage = () => {
		const isEditing =
			editState[
				`${codeType}Code${
					selectedLanguage.charAt(0).toUpperCase() + selectedLanguage.slice(1)
				}`
			];
		if (codeType === "template") {
			return {
				python: isEditing ? editValues.templateCodePy : problemData.templateCodePy,
				java: isEditing ? editValues.templateCodeJava : problemData.templateCodeJava,
				cpp: isEditing ? editValues.templateCodeCpp : problemData.templateCodeCpp,
			}[selectedLanguage];
		}
		if (codeType === "driver") {
			return {
				python: isEditing ? editValues.driverCodePy : problemData.driverCodePy,
				java: isEditing ? editValues.driverCodeJava : problemData.driverCodeJava,
				cpp: isEditing ? editValues.driverCodeCpp : problemData.driverCodeCpp,
			}[selectedLanguage];
		}
		return "";
	};

	// Function to get the correct code field name
	const getCodeFieldName = (type, lang) => {
		const langMap = {
			python: "Py",
			java: "Java",
			cpp: "Cpp",
		};
		return `${type}Code${langMap[lang]}`;
	};

	const currentCodeField = getCodeFieldName(codeType, selectedLanguage);

	return (
		<div className="flex flex-col lg:flex-row h-screen overflow-hidden">
			<div className="lg:w-1/3 pt-6 p-6 overflow-y-auto bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-gray-200">
				<div className="flex justify-between">
					<button
						className="mb-4 px-6 py-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-700 transition duration-300"
						onClick={() => (window.location.href = "/")}
					>
						<MdOutlineArrowBackIosNew />
					</button>
				</div>
				<h1 className="text-2xl font-semibold  text-center">Problem ID: {problemId}</h1>

				<div className="mb-6">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-medium">Problem Statement</h2>
						{!editState.problemStatement ? (
							<button
								onClick={() => handleEdit("problemStatement")}
								className="p-2 text-blue-500 hover:text-blue-700"
							>
								<MdEdit size={20} />
							</button>
						) : (
							<div className="flex gap-2">
								<button
									onClick={() => handleSave("problemStatement")}
									className="p-2 text-green-500 hover:text-green-700"
								>
									<MdSave size={20} />
								</button>
								<button
									onClick={() => handleCancel("problemStatement")}
									className="p-2 text-red-500 hover:text-red-700"
								>
									<MdClose size={20} />
								</button>
							</div>
						)}
					</div>
					{editState.problemStatement ? (
						<textarea
							value={editValues.problemStatement}
							onChange={(e) => handleChange("problemStatement", e.target.value)}
							className="mt-2 w-full p-2 border rounded bg-gray-700 text-white"
							rows="4"
						/>
					) : (
						<p className="mt-2">{problemData.problemStatement}</p>
					)}
				</div>

				<div className="mb-6">
					<div className="flex justify-between items-center">
						<h2 className="text-xl font-medium">Toughness Level</h2>
						{!editState.toughnessLevel ? (
							<button
								onClick={() => handleEdit("toughnessLevel")}
								className="p-2 text-blue-500 hover:text-blue-700"
							>
								<MdEdit size={20} />
							</button>
						) : (
							<div className="flex gap-2">
								<button
									onClick={() => handleSave("toughnessLevel")}
									className="p-2 text-green-500 hover:text-green-700"
								>
									<MdSave size={20} />
								</button>
								<button
									onClick={() => handleCancel("toughnessLevel")}
									className="p-2 text-red-500 hover:text-red-700"
								>
									<MdClose size={20} />
								</button>
							</div>
						)}
					</div>
					{editState.toughnessLevel ? (
						<select
							value={editValues.toughnessLevel}
							onChange={(e) => handleChange("toughnessLevel", e.target.value)}
							className="mt-2 p-2 border rounded bg-gray-700 text-white"
						>
							<option value="hacker">Hacker</option>
							<option value="guru">Guru</option>
							<option value="coder">Coder</option>
							<option value="novice">Novice</option>
						</select>
					) : (
						<p
							className={`mt-2 inline-block px-3 py-1 rounded-full text-sm ${
								problemData.toughnessLevel === "hacker"
									? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300"
									: "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
							}`}
						>
							{problemData.toughnessLevel}
						</p>
					)}
				</div>

				<div className="mb-6">
					<h2 className="text-xl font-medium">Language Selection</h2>
					<select
						className="mt-2 p-2 border border-gray-300 dark:border-gray-700 bg-gray-800 text-white rounded"
						value={selectedLanguage}
						onChange={(e) => setSelectedLanguage(e.target.value)}
					>
						{languageOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>

				<div className="mb-6">
					<h2 className="text-xl font-medium">Code Type</h2>
					<select
						className="mt-2 p-2 border border-gray-300 dark:border-gray-700 bg-gray-800 text-white rounded"
						value={codeType}
						onChange={(e) => setCodeType(e.target.value)}
					>
						{codeTypeOptions.map((option) => (
							<option key={option.value} value={option.value}>
								{option.label}
							</option>
						))}
					</select>
				</div>
			</div>

			<div className="lg:w-full p-6 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-200">
				<div className="flex justify-between items-start mb-4">
					<div className="mt-2 space-x-3">
						<h2 className="text-xl font-semibold">Selected Options</h2>
						<div className="mt-2 inline-block px-4 py-2 rounded-full text-sm bg-yellow-200 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-200">
							<strong>Language:</strong> {selectedLanguage}
						</div>
						<div className="mt-2 inline-block px-4 py-2 rounded-full text-sm bg-purple-200 dark:bg-purple-800 text-purple-700 dark:text-purple-200">
							<strong>Code Type:</strong> {codeType}
						</div>
					</div>
					<div className="flex gap-3">
						{!editState[currentCodeField] ? (
							<button
								onClick={() => handleEdit(currentCodeField)}
								className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-800 flex items-center gap-2 transition duration-300"
							>
								<MdEdit size={20} /> Edit Code
							</button>
						) : (
							<>
								<button
									onClick={() => handleSave(currentCodeField)}
									className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-800 flex items-center gap-2 transition duration-300"
								>
									<MdSave size={20} /> Save
								</button>
								<button
									onClick={() => handleCancel(currentCodeField)}
									className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-800 flex items-center gap-2 transition duration-300"
								>
									<MdClose size={20} /> Cancel
								</button>
							</>
						)}
					</div>
				</div>
				<CodeEditor
					language={selectedLanguage}
					code={getCodeForLanguage()}
					readOnly={!editState[currentCodeField]}
					onChange={(value) => handleChange(currentCodeField, value)}
				/>
			</div>
		</div>
	);
};

export default DetailedPage;
