import ReactMarkdown from 'react-markdown';

const MarkdownRenderer = ({ message }) => {
  return (
    <div>
      <ReactMarkdown>{message}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;
