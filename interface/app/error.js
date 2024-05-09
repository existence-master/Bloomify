'use client' // Error components must be Client Components
 
import { useEffect } from 'react'
 
export default function Error({ error, reset }) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])
 
  return (
    <div className='bg-[#FFFAE3] w-full h-full flex justify-center items-center'>
      <h2 className='text-4xl text-red-500 font-semibold'>Something went wrong!</h2>
      <button
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
        className='rounded-xl border-2 border-black bg-[#007991] p-2'
      >
        Try again
      </button>
    </div>
  )
}