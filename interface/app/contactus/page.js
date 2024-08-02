"use client"; // Indicate that this component runs on the client-side

import Link from "next/link"; // Next.js Link component for client-side navigation
import Image from "next/image"; // Next.js optimized image component
import { useState, useEffect, useRef } from "react"; // React hooks for state management and side effects

const ContactUs = () => {
  // State to track if the dropdown menu is open
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference to the dropdown menu

  // Effect to handle clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false); // Close the dropdown if click is outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside); // Attach the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Clean up on component unmount
    };
  }, []); // Empty dependency array ensures this effect runs once on component mount

  // Toggle the dropdown menu open/close
  const toggleMenu = () => {
    setIsOpen((prev) => !prev); // Toggle the state
  };

  return (
    <>
      <div className="bg-[#fffbe6]">
        {/* Main container with background color and full-screen dimensions */}
        {/* Navigation bar */}
        <nav class="bg-lightyellow fixed w-full z-20 top-0 start-0 rounded-b-xl border-b border-2 border-gray-600">
          <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <a href="#" class="flex items-center space-x-3 rtl:space-x-reverse">
              <Image
                src="/navbarlogo.svg"
                width={100}
                height={25}
                alt="Bloomify Logo"
              />
            </a>
            <button
              onClick={toggleMenu}
              type="button"
              class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
              aria-controls="navbar-multi-level"
              aria-expanded="false"
            >
              <span class="sr-only">Open main menu</span>
              <svg
                class="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
            <div
              class="hidden w-full md:block md:w-auto"
              id="navbar-multi-level"
            >
              <ul class="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-lightyellow md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0">
                <li>
                  <a
                    href="/"
                    class="block py-2 px-3 text-cerulean rounded md:p-0"
                    aria-current="page"
                  >
                    Home
                  </a>
                </li>
                <li>
                  <a
                    href="/about"
                    class="block py-2 px-3 text-midnightAzure rounded hover:text-cerulean md:p-0"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    class="block py-2 px-3 text-midnightAzure rounded hover:text-cerulean md:p-0"
                  >
                    Contact
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
                    class="block py-2 px-3 text-midnightAzure rounded hover:text-cerulean md:p-0"
                  >
                    <button className="inline-flex h-8 animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#007991,45%,#BCD8C1,55%,#007991)] bg-[length:200%_100%] px-3 font-medium text-lightyellow transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                      Login
                    </button>
                  </a>
                </li>
              </ul>
            </div>
            {isOpen && (
              <div className="fixed inset-0 flex z-50 mt-12">
                <div className="fixed inset-0 bg-black opacity-50"></div>
                <div className="absolute inset-y-0 right-0 flex flex-col w-full max-w-lg">
                  <button
                    data-collapse-toggle="navbar-sticky"
                    type="button"
                    className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                    aria-controls="navbar-sticky"
                    aria-expanded="false"
                    onClick={() => setIsOpen(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                  <div className="w-full bg-lightyellow rounded-lg">
                    <ul className="py-4 px-2 space-y-2">
                      <li>
                        <a
                          href="/"
                          className="block py-2 px-3 dark:text-paleRose text-lividBrown hover:text-tickleMePink rounded"
                        >
                          Home
                        </a>
                      </li>
                      <li>
                        <a
                          href="/about"
                          className="block py-2 px-3 dark:text-paleRose text-lividBrown hover:text-tickleMePink rounded"
                        >
                          About
                        </a>
                      </li>
                      <li>
                        <a
                          href="#"
                          className="block py-2 px-3 dark:text-paleRose text-lividBrown hover:text-tickleMePink rounded"
                        >
                          Contact Us
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        </nav>
        {/* End of navigation bar */}
        {/* Contact Us section */}
        <section class="bg-lightyellow w-full xs:h-[800px]" id="github">
          <div class="mx-auto max-w-screen-md h-screen flex flex-col justify-center text-center">
            <h1 class="mb-4 text-4xl font-inter font-semibold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl">
              We are always open to suggestions.
            </h1>
            <p className="font-Poppins self-center text-3xl text-gray-600 leading-relaxed mb-8 xs:text-xl">
              {/* Contact message */}
              Feel free to reach out to us with any questions, feedback, or
              inquiries you may have. Our team is here to assist you. You can
              contact us via email at:
              <a
                href="mailto:existence.bloomify@gmail.com"
                className="text-blue-500 underline"
              >
                existence.bloomify@gmail.com
              </a>
              . We value your input and strive to provide the best possible
              experience for our users. Don't hesitate to get in touch — we're
              eager to hear from you!
            </p>
          </div>
        </section>
        {/* End of Contact Us section */}
        {/* Footer section */}
        <footer className="footer-linear-bg w-full">
          {/* Footer background style */}
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            {/* Container for the footer */}
            <div className="md:flex md:justify-between">
              {/* Flex layout for the footer */}
              <div className="mb-6 md:mb-0">
                {/* Logo section in the footer */}
                <Image
                  src="navbarlogo.svg" // Source for the logo image
                  className="bg-white border-8 border-white rounded-xl" // Styling for the logo
                  alt="Bloomify Logo" // Alternative text for accessibility
                  width={183.37} // Logo width
                  height={66.24} // Logo height
                />
              </div>
              {/* End of logo section */}
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                {/* Grid layout for footer links */}
                <div>
                  {/* Section for resources */}
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Resources
                  </h2>
                  {/* Heading */}
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    {/* List of resource links */}
                    <li className="mb-4">
                      <Link href="/" className="hover:underline">
                        Bloomify
                      </Link>
                      {/* Link to Bloomify */}
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Existence Website
                      </a>
                      {/* Link to Existence Website */}
                    </li>
                  </ul>
                  {/* End of resource links */}
                </div>
                {/* End of Resources section */}
                <div>
                  {/* Section for social media links */}
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Follow us
                  </h2>
                  {/* Heading */}
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    {/* List of social media links */}
                    <li className="mb-4">
                      <Link
                        href="https://github.com/existence-master/Bloomify"
                        className="hover:underline"
                      >
                        GitHub
                      </Link>
                      {/* Link to GitHub */}
                    </li>
                    <li>
                      <Link
                        href="https://www.linkedin.com/company/existence-3/"
                        className="hover:underline"
                      >
                        LinkedIn
                      </Link>
                      {/* Link to LinkedIn */}
                    </li>
                  </ul>
                  {/* End of social media links */}
                </div>
                {/* End of Follow us section */}
                <div>
                  {/* Section for legal links */}
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Legal
                  </h2>
                  {/* Heading */}
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    {/* List of legal links */}
                    <li className="mb-4">
                      <Link href="/privacypolicy" className="hover:underline">
                        Privacy Policy
                      </Link>
                      {/* Link to Privacy Policy */}
                    </li>
                    <li className="mb-4">
                      <a
                        href="https://docs.google.com/document/d/12LOQu7OB10FRWwSIYJlkZQ-5xHi_rO59qkJyVKg5Oj4/edit?usp=sharing"
                        className="hover:underline"
                      >
                        White Paper Link
                      </a>
                      {/* Link to White Paper */}
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Open Core License
                      </a>
                      {/* Link to Open Core License */}
                    </li>
                  </ul>
                  {/* End of legal links */}
                </div>
                {/* End of Legal section */}
              </div>
              {/* End of grid layout */}
            </div>
            {/* End of flex layout for footer */}
            <hr className="my-6 border-white sm:mx-auto lg:my-8" />
            {/* Horizontal separator */}
            <div className="sm:flex sm:items-center sm:justify-between">
              {/* Flex layout for the footer's bottom section */}
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                {/* Footer copyright */}© 2024
                <a href="#" className="hover:underline">
                  Bloomify
                </a>
                . All Rights Reserved.
              </span>
              <div className="flex mt-4 sm:justify-center sm:mt-0">
                {/* Flex layout for additional branding */}
                <span className="text-white translate-y-5">Powered by</span>
                {/* Label for the power source */}
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                >
                  {/* Link with hover effects */}
                  <Image
                    src="existence.svg" // Source for the power source logo
                    width={217} // Width of the image
                    height={62} // Height of the image
                    className="rounded-xl" // Styling for the image
                  />
                </a>
                {/* End of branding */}
              </div>
              {/* End of flex layout for additional branding */}
            </div>
            {/* End of footer's bottom section */}
          </div>
          {/* End of footer container */}
        </footer>
        {/* End of footer section */}
      </div>
      {/* End of main container */}
    </>
  );
};

export default ContactUs; // Export the Contact Us component
