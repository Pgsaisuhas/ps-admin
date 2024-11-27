import React from "react";
import { Editor } from "@monaco-editor/react";

const CodeEditor = ({ language, code, readOnly = false, onChange = () => {} }) => {
	return (
		<div className="h-full">
			<Editor
				height="80vh"
				theme="vs-dark"
				language={language}
				value={code}
				options={{
					readOnly,
					scrollBeyondLastLine: false,
					padding: { top: 8, bottom: 8 }, // Adjust padding dynamically
				}}
				onChange={(value) => {
					if (!readOnly) {
						onChange(value);
					}
				}}
			/>
		</div>
	);
};

export default CodeEditor;
