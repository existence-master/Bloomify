"use client";
import { useState } from 'react';

const ErrorDisplay = ({ errorMessage }) => {
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    setVisible(false);
  };

  return (
    <>
      {visible && (
        <div className="flex justify-center items-center bg-white rounded-xl border-2 border-black p-2">
          <p>{errorMessage}</p>
          <button onClick={handleDismiss}>Dismiss</button>
        </div>
      )}
    </>
  );
};

export default ErrorDisplay;
