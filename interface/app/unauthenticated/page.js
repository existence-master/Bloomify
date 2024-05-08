import Image from "next/image"
import Link from "next/link"

const Unauthenticated = () => {
  return (
    <div className="bg-[#FFFAE3] flex flex-col justify-center items-center h-screen">
        <Image src="/navbarlogo.svg" width={200} height={50} alt="Bloomify Logo" className="mb-10"/>
        <div className="text-center">
            <h1 className="text-6xl font-bold mb-4 text-red-700">Unauthorized Access!</h1>
            <p className="text-xl">You are not logged in.</p>
            <p className="text-xl">Please <Link href="/login" className="text-blue-500 underline">login</Link> or <Link href="/login" className="text-blue-500 underline">signup</Link> before trying to access the platform. Thank you.</p>
        </div>
    </div>
  )
}

export default Unauthenticated