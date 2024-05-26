import Link from "next/link"; // Import Next.js client-side routing
import Image from "next/image"; // Import Next.js optimized image component

const NotFound = () => {
  return (
	<>
	  <div className="bg-[#FFFAE3] flex flex-col justify-center items-center h-screen"> {/* Full-screen layout with background color */}
		<Image
		  src="/navbarlogo.svg" // Source for the Bloomify logo
		  width={200} // Image width
		  height={50} // Image height
		  alt="Bloomify Logo" // Alt text for accessibility
		  className="mb-10" // Margin at the bottom
		/>
		<div className="text-center"> {/* Centered text */}
		  <h1 className="text-3xl font-bold mb-4 text-red-600">404!</h1> {/* Bold and large font for the 404 error */}
		  <p className="text-lg mb-8">The page you are trying to access does not exist on this domain.</p> {/* Error message */}
		  <Link href="/"> {/* Link to the home page */}
			<p className="text-lg mb-8">Go back Home</p> {/* Instruction to go back home */}
		  </Link>
		</div> {/* End of centered text */}
	  </div> {/* End of full-screen layout */}
	</>
  );
};

export default NotFound; // Export the NotFound component for use