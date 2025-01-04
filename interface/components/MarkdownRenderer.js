// MarkdownRenderer component that renders Markdown content to HTML
// It uses the ReactMarkdown library to parse and render the Markdown

import ReactMarkdown from 'react-markdown'; // Importing the ReactMarkdown component
import remarkGfm from 'remark-gfm'; // Import the remark-gfm plugin
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css"; // Import KaTeX CSS for styling

const MarkdownRenderer = ({ message }) => {
	// Define custom padding for each header by text or identifier
	const headerPaddingMap = {
		"U": "12px",
		"Q": "10px",
		"M": "10px",
		"S": "108px",
		"T": "10px",
		"Default": "8px"
	};

	return (
		<div>
			<ReactMarkdown
				remarkPlugins={[remarkGfm, remarkMath]}
				rehypePlugins={[rehypeKatex]}
				components={{
					table: ({ node, ...props }) => (
						<table
							style={{
								width: "100%",
								borderCollapse: "collapse",
							}}
							{...props}
						/>
					),
					th: ({ node, children, ...props }) => {
						// Determine the padding based on header text
						const headerText = children[0];
						// console.log(headerText);
						const padding = headerPaddingMap[headerText] || headerPaddingMap["Default"];
						
						return (
							<th
								style={{
									border: "1px solid black",
									padding: `${headerPaddingMap["Default"]} ${padding}`,
									textAlign: "left",
								}}
								{...props}
							>
								{children}
							</th>
						);
					},
					td: ({ node, ...props }) => (
						<td
							style={{
								border: "1px solid black",
								padding: "8px",
								textAlign: "left",
							}}
							{...props}
						/>
					),
				}}
			>
				{message}
			</ReactMarkdown>
		</div>
	);
};


export default MarkdownRenderer; // Export the MarkdownRenderer component