import { useState } from "react";

const FeedbackForm = ({
  feature,
  handleFeedbackSubmit,
  handleFeedbackCancel,
  submitState,
}) => {
  const [feedbackText, setFeedbackText] = useState("");

  const handleTextChange = (e) => {
    setFeedbackText(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleFeedbackSubmit(feedbackText);
  };

  const handleCancel = () => {
    handleFeedbackCancel();
  };

  return (
    <form
      className="fixed xs:w-screen inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{ zIndex: "9999999" }}
      onSubmit={handleSubmit}
    >
      <div className="bg-lightyellow dark:bg-stilleto border-2 border-cerulean md:p-6 xs:w-[300px] md:w-[600px] xs:p-3 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-bold mb-4 text-center">
          {feature !== "General"
            ? `We'd love to hear your feedback about the ${feature} feature. This is a one time feedback so do try the feature extensively before reporting. We appreciate your input!`
            : "We'd love to hear your feedback about Bloomify. We appreciate your input!"}
        </h2>
        <textarea
          className="w-full p-2 border-2 border-cerulean text-black rounded mb-4"
          value={feedbackText}
          onChange={handleTextChange}
          placeholder="Your feedback"
        />
        <div className="flex justify-end space-x-4">
          <button
            type="submit"
            className="inline-flex h-12 px-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#007991,45%,#BCD8C1,55%,#007991)] bg-[length:200%_100%] font-medium text-lightyellow transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          >
            {submitState ? "Submitting..." : "Submit"}
          </button>
          <button
            type="button"
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-700"
            onClick={handleCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
};

export default FeedbackForm;
