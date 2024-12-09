import React from "react";
import MarkdownEditor from "@uiw/react-markdown-editor";

const MarkDown = ({ value, setValue }) => {
	return (
		<div className="h-full">
			<MarkdownEditor
				value={value}
				onChange={(newValue) => setValue(newValue)}
				className="h-full"
			/>
		</div>
	);
};

export default MarkDown;
