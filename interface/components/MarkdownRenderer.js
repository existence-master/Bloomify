// MarkdownRenderer component that renders Markdown content to HTML
// It uses the ReactMarkdown library to parse and render the Markdown

import ReactMarkdown from 'react-markdown'; // Importing the ReactMarkdown component
import remarkGfm from 'remark-gfm'; // Import the remark-gfm plugin


const MarkdownRenderer = ({ message }) => { // Component receives a message prop containing Markdown content
	return (
		<div>
			{/* Render the Markdown content within a div */}
			<ReactMarkdown
				remarkPlugins={[remarkGfm]}
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
					th: ({ node, ...props }) => (
						<th
							style={{
								border: "1px solid black",
								padding: "8px",
								textAlign: "left",
							}}
							{...props}
						/>
					),
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