'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='bg-[#FFFAE3] w-screen h-screen flex flex-col justify-center items-center'>
      <h2 className='text-4xl text-red-500 font-semibold mb-4'>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className='rounded-xl border-2 border-black bg-[#007991] p-2 mb-2 text-white'
      >
        Try again
      </button>
      <button
          onClick={() => {
              window.history.back();
          }}
          className='rounded-xl border-2 border-black bg-[#007991] p-2 mb-2 text-white'
          >
          Go back
      </button>

    </div>
  )
}