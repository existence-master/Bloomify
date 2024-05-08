import Link from "next/link";
import Image from "next/image";

const NotFound = () => {
    return (
        <>
            <div className="bg-[#FFFAE3] flex flex-col justify-center items-center h-screen">
                <Image src="/navbarlogo.svg" width={200} height={50} alt="Bloomify Logo" className="mb-10"/>
                <div className="text-center">
                    <h1 className="text-3xl font-bold mb-4 text-red-600">404!</h1>
                    <p className="text-lg mb-8">The page you are trying to access does not exist on this domain.</p>
                    <Link href="/"><p className="text-lg mb-8">Go back Home</p></Link>
                </div>
            </div>
        </>
    );
}

export default NotFound;