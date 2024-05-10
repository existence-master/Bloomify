import Image from "next/image"; // Import Next.js optimized image component
import Link from "next/link"; // Import Next.js client-side routing

const Unauthenticated = () => {
	return (
		<div className="bg-[#FFFAE3] flex flex-col justify-center items-center h-screen"> {/* Background color and full screen height */}
			<Image src="/navbarlogo.svg" width={200} height={50} alt="Bloomify Logo" className="mb-10" /> {/* Bloomify logo */}
			<div className="text-center"> {/* Centered text */}
				<h1 className="text-6xl font-bold mb-4 text-red-700">Unauthorized Access!</h1> {/* Bold warning message */}
				<p className="text-xl">You are not logged in.</p> {/* Message indicating the user is not logged in */}
				<p className="text-xl"> {/* Suggestion to login or signup */}
					Please <Link href="/login" className="text-blue-500 underline">login</Link> or <Link href="/signup" className="text-blue-500 underline">signup</Link> before trying to access the platform. Thank you.
				</p>
			</div> {/* End of centered text */}
		</div> 
	);
};

export default Unauthenticated; // Export the Unauthenticated component