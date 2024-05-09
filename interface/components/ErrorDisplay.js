"use client";
import { useState } from 'react';

const ErrorDisplay = ({ errorMessage, handleError}) => {
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    setVisible(false);
    handleError()
  };

  return (
    <>
      {visible && (
        <div className="flex flex-col w-[400px] justify-center items-center bg-white rounded-xl border-2 border-black p-2">
          <p className='text-xl text-red-600 mb-4'>{errorMessage}</p>
          <button onClick={handleDismiss} className='rounded-xl bg-[#007991] p-2 text-white mb-4 border-2 border-black'>Dismiss</button>
        </div>
      )}
    </>
  );
};

export default ErrorDisplay;
