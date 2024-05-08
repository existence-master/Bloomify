const Unauthenticated = () => {
  return (
    <div className="bg-[#FFFAE3] flex justify-center items-center h-screen">
        <div className="text-center">
            <h1 className="text-8xl font-bold mb-4 text-red-700">Unauthorized Access!</h1>
            <p className="text-lg">Please login before trying to access the platform. Thank you.</p>
        </div>
    </div>
  )
}

export default Unauthenticated