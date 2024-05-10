"use client"; // This component will be used on the client-side

import Link from "next/link"; // Client-side routing with Next.js
import Image from "next/image"; // Optimized image component
import { useState, useEffect, useRef } from "react"; // React hooks for state management and side effects

const Home = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track if the dropdown is open
  const dropdownRef = useRef(null); // Reference for the dropdown element

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Attach event listener for clicks
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up event listener on component unmount
    };
  }, []); // Empty dependency array ensures this effect runs once on mount

  // Function to toggle the dropdown menu
  const toggleMenu = () => {
    setIsOpen((prev) => !prev); // Toggle the isOpen state
  };

  return (
    <>
      <div className="bg-[#fffbe6]"> {/* Main container with background color */}
        <nav className="bg-transparent mb-20"> {/* Navigation bar with transparent background */}
          <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4"> {/* Container with flex layout */}
            {/* Logo and Home link */}
            <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
              <Image src="navbarlogo.svg" alt="Bloomify Logo" width={183.37} height={45.91} className="h-8" />
            </Link>

            {/* Mobile Navbar with dropdown menu */}
            <div ref={dropdownRef}> {/* Reference for dropdown */}
              <button
                onClick={toggleMenu} // Toggle the menu on click
                type="button"
                className="inline-flex mr-2 items-center bg-transparent p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none"
                aria-controls="navbar-default" // Accessibility attribute
                aria-expanded={isOpen ? "true" : "false"} // Indicate if menu is open
              >
                <span className="sr-only">Open main menu</span> {/* Screen reader text */}
                <svg
                  className="w-5 h-5" // Icon size
                  aria-hidden="true" // Accessibility attribute
                  xmlns="http://www.w3.org/2000/svg" // SVG namespace
                  fill="none" // No fill color
                  viewBox="0 0 17 14" // SVG viewbox
                >
                  <path
                    stroke="currentColor" // Stroke color using current text color
                    strokeLinecap="round" // Rounded line caps
                    strokeLinejoin="round" // Rounded line joins
                    strokeWidth="2" // Line thickness
                    d="M1 1h15M1 7h15M1 13h15" // Path data for hamburger icon
                  />
                </svg>
              </button>

              {/* Dropdown menu when open */}
              {isOpen && (
                <div className="bg-white absolute right-4 top-10 rounded-xl border-2 border-black"> {/* Dropdown styling */}
                  <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-transparent"> {/* List of links */}
                    <li>
                      <Link href="/" className="block py-2 px-3 font-bold text-[#007991] rounded md:bg-transparent md:p-0" aria-current="page">Home</Link> {/* Home link */}
                    </li>
                    <li>
                      <Link href="/about" className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">About</Link> {/* About link */}
                    </li>
                    <li>
                      <Link href="/contactus" className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">Contact Us</Link> {/* Contact Us link */}
                    </li>
                    <li>
                      <Link href="/login" className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">Login</Link> {/* Login link */}
                    </li>
                    <li>
                      <Link href="/signup" className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">Signup</Link> {/* Signup link */}
                    </li>
                    <li>
                      <Link href="https://github.com/existence-master/Bloomify/">
                        <button type="button" className="text-white bg-black hover:bg-[#007991] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">GitHub</button>
                      </Link> {/* GitHub button */}
                    </li>
                  </ul> {/* End of dropdown menu */}
                </div> 
              )}
            </div> {/* End of mobile navbar */}

            {/* Desktop Navbar */}
            <div className="hidden w-full md:block md:w-auto" id="navbar-default"> {/* Navbar for desktop */}
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-transparent"> {/* List of links */}
                <li>
                  <Link href="/" className="block py-2 px-3 font-bold text-[#007991] rounded md:bg-transparent md:p-0" aria-current="page">Home</Link> {/* Home link */}
                </li>
                <li>
                  <Link href="/about" className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">About</Link> {/* About link */}
                </li>
                <li>
                  <Link href="/contactus" className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">Contact Us</Link> {/* Contact Us link */}
                </li>
                <li>
                  <Link href="/login" className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">Login</Link> {/* Login link */}
                </li>
                <li>
                  <Link href="/signup" className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0">Signup</Link> {/* Signup link */}
                </li>
                <li>
                  <Link href="https://github.com/existence-master/Bloomify/"> {/* GitHub link */}
                    <button type="button" className="text-white bg-black hover:bg-[#007991] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2">GitHub</button> {/* GitHub button */}
                  </Link> {/* End of GitHub link */}
                </li>
              </ul> {/* End of desktop navbar */}
            </div> {/* End of desktop navigation */}
          </div> {/* End of navigation container */}
        </nav> {/* End of navigation bar */}

        {/* Main content sections */}
        <div className="xs:max-md:hidden"> {/* Content visible on larger screens */}
          <section className="max-w-full bg-transparent dark:bg-transparent py-12 z-0 overflow-hidden"> {/* Main landing section */}
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-4"> {/* Container with flex layout */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0"> {/* First section with heading and text */}
                <h2 className="text-xl font-bold text-red-800 mb-4">Educational Assessment Redefined</h2> {/* Heading */}
                <p className="font-Poppins text-3xl text-gray-600 leading-relaxed mb-8">An Open-Source <span className="font-bold text-[#007991]">Chatbot</span> Designed To <span className="font-bold text-[#007991]">Revolutionize</span> The Assessment Process In Educational Institutes</p> {/* Main message */}
                <Link href="/signup"> {/* Link to signup page */}
                  <button type="button" className="w-50 text-2xl ml-40 text-white font-semibold bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-5 py-2.5 text-center me-2 mb-2">Join Us</button> {/* Signup button */}
                </Link>
              </div> {/* End of first section */}
              <div className="w-full md:w-1/2 relative"> {/* Section with the Bloom's Taxonomy image */}
                <Image 
                  src="bloomTriangle.svg" // Image source
                  alt="Bloom's Taxonomy" // Alt text
                  className="max-w-full mx-auto relative translate-x-1/4 top-1/2 z-10" // Styling for the image
                  width={478.55} // Image width
                  height={469.26} // Image height
                />
              </div> {/* End of Bloom's Taxonomy section */}
            </div> {/* End of container for flex layout */}
          </section> {/* End of first main section */}

          {/* Section about the product features */}
          <section className="bg-transparent dark:bg-transparent py-12 h-1/12"> {/* Feature section */}
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-4"> {/* Container with flex layout */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0"> {/* Information about Bloomify */}
                <h2 className="text-3xl font-bold text-[#007991] mb-8 ml-2">About Us</h2> {/* About heading */}
                <p className="footer-linear-bg rounded-xl p-8 leading-relaxed text-xl text-white justify-normal">Bloomify is an innovative educational tool designed to revolutionize the assessment process in academic institutions. It addresses the prevalent challenges of exam paper creation by leveraging Bloom's Taxonomy, a well-established framework for classifying cognitive skills. Bloomify aims to promote deeper understanding, critical thinking, and practical application of knowledge among students by ensuring that exam questions align with Bloom's Taxonomy levels. It was designed to counteract the dominance of rote learning in exams, encourage holistic learning experiences, and foster the development of essential skills necessary for success in the real world.</p> {/* About Bloomify */}
              </div> {/* End of About Us section */}

              <div className="vertical-line"></div> {/* Vertical divider */}

              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0"> {/* Features section */}
                <h2 className="text-xl font-bold text-red-800 mb-4">FEATURES</h2> {/* Features heading */}
                <p className="text-xl mb-2"><span className="font-bold">AI-Powered Question Classification:</span> Instantly categorize questions into Bloom's Taxonomy levels.</p> {/* Feature 1 */}
                <p className="text-xl mb-2"><span className="font-bold">Suggestive Transformation:</span> Elevate question complexity with AI-driven suggestions for higher-order thinking.</p> {/* Feature 2 */}
                <p className="text-xl mb-2"><span className="font-bold">Paper Generation Wizardry:</span> Generate balanced question papers effortlessly based on customizable parameters.</p> {/* Feature 3 */}
                <p className="text-xl mb-2"><span className="font-bold">Intuitive User Interface:</span> Seamlessly navigate and utilize Bloomify's powerful features with ease.</p> {/* Feature 4 */}
                <p className="text-xl"><span className="font-bold">Customizable Syllabus Integration:</span> Easily adapt Bloomify to align with your institution's unique syllabus requirements.</p> {/* Feature 5 */}
              </div> {/* End of Features section */}
            </div> {/* End of flex container */}
          </section> {/* End of Features section */}

          {/* Section about the product versus research */}
          <section className="bg-transparent dark:bg-transparent py-12 overflow-hidden"> {/* Product vs Research section */}
            <div className="container max-w-full mx-auto flex flex-col md:flex-row items-center justify-center sm:px-6 lg:px-4 gap-10 relative"> {/* Flex container */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0"> {/* Information about Bloomify's research */}
                <div className="absolute -top-24 bg-[#007991] rounded-full p-24 leading-relaxed text-sm text-white justify-normal -left-16 w-96 h-96"> {/* Research information */}
                  <p className="text-justify">From accurate question classification to dynamic suggestion and generation features driven by cutting-edge AI, Bloomify streamlines the assessment process, saving you time and promoting higher-order thinking among students.</p>
                </div> {/* End of research information */}
              </div> {/* End of first research information section */}
              
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0"> {/* Product vs Research content */}
                <h2 className="text-3xl font-bold text-[#007991] mb-8 ml-2 self-center">Product VS Research</h2> {/* Heading */}
                <p className="bg-[#222E50] rounded-xl p-8 leading-relaxed text-xl text-white justify-normal">The development of Bloomify was driven by extensive research efforts aimed at addressing prevalent challenges in educational assessment. Leveraging insights from Bloom's Taxonomy, our research team embarked on a journey to revolutionize assessment practices through the integration of artificial intelligence. Through meticulous data collection, analysis, and experimentation with cutting-edge natural language processing techniques, we laid the foundation for Bloomify's advanced features. Our research endeavors were guided by a commitment to enhancing cognitive assessment, fostering critical thinking skills, and promoting practical application of knowledge. The resulting product, Bloomify, represents the culmination of our research efforts, offering educators a powerful tool to create balanced question papers aligned with Bloom's Taxonomy effortlessly.</p> {/* Product vs Research description */}
              </div> {/* End of Product vs Research section */}
        </div>
      </section>
      <hr className="my-6 border-[#222E50] border-8 sm:mx-auto lg:my-8 mb-2" />
      <hr className="my-6 border-[#007991] border-8 sm:mx-auto lg:my-8 mt-2" />
      <section className="bg-transparent dark:bg-transparent py-12">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-4">
            <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb--0"> {/* Additional research information */}
                <div className="absolute bg-[#007991] rounded-full p-24 leading-relaxed text-sm text-white justify-normal -bottom-40 -right-16 w-96 h-96"> {/* Additional research section */}
                  <p className="text-justify">Revolutionize your assessment practices with Bloomify – the all-in-one platform empowering educators to effortlessly create balanced exam papers aligned with Bloom's Taxonomy.</p> {/* Bloomify value proposition */}
                </div> {/* End of additional research section */}
              </div> {/* End of additional research information */}
            </div> {/* End of Product vs Research section */}
          </section> {/* End of Product vs Research section */}

          {/* Footer and additional content */}
          <hr className="my-6 border-[#222E50] border-8 sm:mx-auto lg:my-8 mb-2" /> {/* Horizontal separator */}
          <hr className="my-6 border-[#007991] border-8 sm:mx-auto lg:my-8 mt-2" /> {/* Additional horizontal separator */}
          
          {/* Open-source information section */}
          <section className="bg-transparent py-12 overflow-hidden"> {/* Open-source information section */}
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-4"> {/* Container for content */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0"> {/* Open-source information */}
                <h2 className="w-full text-3xl font-bold text-[#222E50] mb-10 ml-2 text-center font-sans">We are open-source!</h2> {/* Heading */}
                <Link
                  href="https://github.com/existence-master/Bloomify/" // Link to GitHub repository
                  className="rounded-xl border-2 border-black bg-gray-200 p-4 text-l font-normal text-black self-center mt-10 mb-10"
                >
                  https://github.com/existence-master/Bloomify/
                </Link> {/* GitHub repository link */}
                <h2 className="text-2xl text-[#222E50] mb-20 ml-2 self-center font-sans">Explore the GitHub Repository</h2> {/* Call to explore the repository */}
              </div> {/* End of open-source information */}

              <div className="w-full md:w-1/2 flex flex-col items-center"> {/* Additional footer content */}
                <div className="bg-[#007991] rounded-full p-24 leading-relaxed text-sm text-white justify-normal w-80 h-80"> {/* Content inside a rounded container */}
                  <p className="text-justify mt-6">From accurate question classification to dynamic suggestion and generation features driven by cutting-edge AI, Bloomify streamlines the assessment process, saving you time and promoting higher-order thinking among students.</p> {/* Product description */}
                </div> {/* End of rounded container */}
              </div> {/* End of additional footer content */}
            </div> {/* End of content container */}
          </section> {/* End of open-source section */}
        </div> {/* End of desktop content */}

        {/* Mobile content section */}
        <div className="md:hidden"> {/* Mobile-only section */}
          <section className="max-w-full bg-transparent overflow-hidden"> {/* Mobile section */}
            <div className="w-full flex flex-col justify-center items-center"> {/* Flex container */}
              <h2 className="font-bold text-xl text-red-800 mb-4">Educational Assessment Redefined</h2> {/* Mobile heading */}
              <div className="w-full flex flex-col justify-center items-center relative"> {/* Mobile image section */}
                <Image
                  src="bloomTriangle.svg" // Image source
                  alt="Bloom's Taxonomy" // Alt text
                  width={200} // Image width
                  height={200} // Image height
                />
              </div> {/* End of mobile image section */}
              
              <div className="w-full flex flex-col items-center justify-center"> {/* Mobile text section */}
                <p className="text-center w-full font-Poppins text-2xl text-gray-600 mt-4 mb-4 p-4">An Open-Source <span className="font-bold text-[#007991]">Chatbot</span> Designed To <span className="font-bold text-[#007991]">Revolutionize</span> The Assessment Process In Educational Institutes</p> {/* Mobile text */}
                
                <div className="w-full flex justify-center"> {/* Mobile call-to-action */}
                  <Link href="/signup"> {/* Link to signup page */}
                    <button
                      type="button"
                      className="text-2xl text-white font-semibold bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-xl border-2 border-black px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Join Us
                    </button> {/* Mobile signup button */}
                  </Link> {/* End of Link */}
                </div> {/* End of call-to-action */}
              </div> {/* End of mobile text section */}
            </div> {/* End of flex container */}
          </section> {/* End of mobile section */}

          {/* About Us section for mobile */}
          <section className="bg-transparent mt-10"> {/* Mobile About Us section */}
            <div className="p-2"> {/* Container */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0"> {/* Mobile About Us content */}
                <h2 className="text-3xl font-bold text-[#007991] mb-8 ml-2">About Us</h2> {/* Mobile About Us heading */}
                <p className="footer-linear-bg rounded-xl p-8 leading-relaxed text-l text-justify text-white">Bloomify is an innovative educational tool designed to revolutionize the assessment process in academic institutions. It addresses the prevalent challenges of exam paper creation by leveraging Bloom's Taxonomy, a well-established framework for classifying cognitive skills. Bloomify aims to promote deeper understanding, critical thinking, and practical application of knowledge among students by ensuring that exam questions align with Bloom's Taxonomy levels. It was designed to counteract the dominance of rote learning in exams, encourage holistic learning experiences, and foster the development of essential skills necessary for success in the real world.</p> {/* Mobile About Us description */}
              </div> {/* End of mobile About Us content */}
              <hr className="border-2 border-black mt-4 mb-8"/> {/* Horizontal divider */}
              
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0"> {/* Mobile features section */}
                <h2 className="text-xl font-bold text-red-800 mb-4">FEATURES</h2> {/* Features heading */}
                <div className="text-center"> {/* Feature list */}
                  <p className="text-xl mb-3"><span className="font-bold">AI-Powered Question Classification:</span> Instantly categorize questions into Bloom's Taxonomy levels.</p> {/* Feature 1 */}
                  <p className="text-xl mb-3"><span className="font-bold">Suggestive Transformation:</span> Elevate question complexity with AI-driven suggestions for higher-order thinking.</p> {/* Feature 2 */}
                  <p className="text-xl mb-3"><span className="font-bold">Paper Generation Wizardry:</span> Generate balanced question papers effortlessly based on customizable parameters.</p> {/* Feature 3 */}
                  <p className="text-xl mb-3"><span className="font-bold">Intuitive User Interface:</span> Seamlessly navigate and utilize Bloomify's powerful features with ease.</p> {/* Feature 4 */}
                  <p className="text-xl"><span className="font-bold">Customizable Syllabus Integration:</span> Easily adapt Bloomify to align with your institution's unique syllabus requirements.</p> {/* Feature 5 */}
                </div> {/* End of feature list */}
              </div> {/* End of mobile features section */}
            </div> {/* End of container */}
          </section> {/* End of mobile About Us section */}
        </div> {/* End of mobile-only content */}

        {/* Footer section */}
        <footer className="footer-linear-bg"> {/* Footer with linear background */}
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8"> {/* Container for footer */}
            <div className="md:flex md:justify-between"> {/* Flex container */}
              <div className="mb-6 md:mb-0"> {/* Logo section */}
                <Image 
                  src="navbarlogo.svg" // Source for the Bloomify logo
                  alt="Bloomify Logo" // Alt text
                  className="bg-white border-8 border-white rounded-xl" // Styling
                  width={183.37} // Width of the logo
                  height={66.24} // Height of the logo
                />
              </div> {/* End of logo section */}

              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3"> {/* Footer content */}
                <div> {/* Resource section */}
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2> {/* Resource heading */}
                  <ul className="text-gray-500 dark:text-gray-400 font-medium"> {/* Resource list */}
                    <li className="mb-4">
                      <Link href="/" className="hover:underline">Bloomify</Link> {/* Link to Home */}
                    </li>
                    <li>
                      <a href="#" className="hover:underline">Existence Website</a> {/* Link to an external website */}
                    </li>
                  </ul> {/* End of resource list */}
                </div> {/* End of resource section */}
                
                <div> {/* Follow Us section */}
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2> {/* Follow Us heading */}
                  <ul className="text-gray-500 dark:text-gray-400 font-medium"> {/* Follow Us list */}
                    <li className="mb-4">
                      <Link href="https://github.com/existence-master/Bloomify" className="hover:underline">Github</Link> {/* GitHub link */}
                    </li>
                    <li>
                      <Link href="https://www.linkedin.com/company/existence-3/" className="hover:underline">LinkedIn</Link> {/* LinkedIn link */}
                    </li>
                  </ul> {/* End of Follow Us list */}
                </div> {/* End of Follow Us section */}
                
                <div> {/* Legal section */}
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2> {/* Legal heading */}
                  <ul className="text-gray-500 dark:text-gray-400 font-medium"> {/* Legal list */}
                    <li className="mb-4">
                      <a href="#" className="hover:underline">Privacy Policy</a> {/* Link to Privacy Policy */}
                    </li>
                    <li className="mb-4">
                      <a href="#" className="hover:underline">White Paper Link</a> {/* Link to a White Paper */}
                    </li>
                    <li>
                      <a href="#" className="hover:underline">License</a> {/* Link to License information */}
                    </li>
                  </ul> {/* End of Legal list */}
                </div> {/* End of Legal section */}
              </div> {/* End of footer content grid */}
            </div> {/* End of flex container */}
            
            <hr className="my-6 border-white sm:mx-auto lg:my-8" /> {/* Footer separator */}
            
            <div className="sm:flex sm:items-center sm:justify-between"> {/* Final footer content */}
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">Bloomify™</a>. All Rights Reserved.</span> {/* Footer copyright text */}
              
              <div className="flex mt-5 sm:justify-center sm:mt-0"> {/* Footer content */}
                <span className="text-white translate-y-5">Powered by</span> {/* Footer "Powered by" text */}
                <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"> {/* Footer external link */}
                  <Image 
                    src="existence.svg" // Source for Existence logo
                    alt="Existence Logo" // Alt text
                    width={217} // Width
                    height={62} // Height
                    className="rounded-xl" // Styling
                  />
                </a> {/* End of footer external link */}
              </div> {/* End of final footer content */}
            </div> {/* End of final footer content */}
          </div> {/* End of footer container */}
        </footer> {/* End of footer */}
      </div> {/* End of main container */}
    </>
  ); // End of component return
};

export default Home; // Export the Home component