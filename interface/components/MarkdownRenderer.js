// MarkdownRenderer component that renders Markdown content to HTML
// It uses the ReactMarkdown library to parse and render the Markdown

import ReactMarkdown from 'react-markdown'; // Importing the ReactMarkdown component

const MarkdownRenderer = ({ message }) => { // Component receives a message prop containing Markdown content
	return (
		<div>
			{/* Render the Markdown content within a div */}
			<ReactMarkdown>{message}</ReactMarkdown>
		</div>
	);
};

export default MarkdownRenderer; // Export the MarkdownRenderer component