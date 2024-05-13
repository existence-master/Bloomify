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
		console.log("Clicked"); // Log for debugging
	};

  return (
    <>
      <div className="bg-[#fffbe6] w-screen h-screen">
        {/* Main container with background color and full-screen dimensions */}
        {/* Navigation bar */}
        <nav className="bg-transparent">
          {/* Transparent background for the navbar */}
          <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
            {/* Flex layout for the navbar */}
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              {/* Link to the home page */}
              <Image
                src="navbarlogo.svg"
                alt="Bloomify Logo"
                width={183.37}
                height={45.91}
              />
              {/* Logo image */}
            </Link>
            {/* Mobile dropdown menu */}
            <div ref={dropdownRef}>
              {/* Reference to the dropdown */}
              <button
                onClick={toggleMenu} // Toggle the dropdown on click
                type="button"
                className="inline-flex mr-2 items-center bg-transparent p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none"
                aria-controls="navbar-default" // Accessibility attributes
                aria-expanded={isOpen ? "true" : "false"} // Indicate if the menu is open
              >
                <span className="sr-only">Open main menu</span>
                {/* Screen reader text */}
                <svg
                  className="w-5 h-5" // SVG size
                  aria-hidden="true" // Accessibility attribute
                  xmlns="http://www.w3.org/2000/svg" // SVG namespace
                  fill="none" // No fill color
                  viewBox="0 0 17 14" // SVG viewbox
                >
                  <path
                    stroke="currentColor" // Use current text color for stroke
                    strokeLinecap="round" // Rounded line caps
                    strokeLinejoin="round" // Rounded line joins
                    strokeWidth="2" // Line thickness
                    d="M1 1h15M1 7h15M1 13h15" // Path data for hamburger icon
                  />
                </svg>
              </button>
              {/* Render the dropdown menu if open */}
              {isOpen && (
                <div className="bg-white absolute right-4 top-10 rounded-xl border-2 border-black">
                  {/* Dropdown menu */}
                  <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-transparent">
                    {/* List of links */}
                    <li>
                      <Link
                        href="/"
                        className="block py-2 px-3 font-bold text-[#007991] rounded md:bg-transparent md:p-0 dark:text-[#007991]"
                      >
                        {/* Home link */}
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991]"
                      >
                        {/* About link */}
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contactus"
                        className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-black md:dark:hover:text-[#007991]"
                      >
                        {/* Contact Us link */}
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/login"
                        className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-black md:dark:hover:text-[#007991]"
                      >
                        {/* Login link */}
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/signup"
                        className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-black md:dark:hover:text-[#007991]"
                      >
                        {/* Signup link */}
                        Signup
                      </Link>
                    </li>
                    <li>
                      <Link href="https://github.com/existence-master/Bloomify/">
                        {/* GitHub link */}
                        <button
                          type="button"
                          className="text-white bg-black hover:bg-[#007991] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 -translate-y-1 focus:outline-none"
                        >
                          {/* Button for GitHub */}
                          GitHub
                        </button>
                      </Link>
                    </li>
                  </ul>
                  {/* End of dropdown menu */}
                </div>
              )}
            </div>
            {/* Desktop navbar with additional links */}
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              {/* Navbar for larger screens */}
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-transparent">
                {/* List of links */}
                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 font-bold text-black rounded md:bg-transparent md:p-0"
                    aria-current="page"
                  >
                    {/* Home link */}
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    href="/about"
                    className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-black md:dark:hover:text-[#007991]"
                  >
                    {/* About link */}
                    About
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 font-bold text-[#007991] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-[#007991]"
                  >
                    {/* Contact Us link */}
                    Contact Us
                  </a>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-black md:dark:hover:text-[#007991]"
                  >
                    {/* Login link */}
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-black md:dark:hover:text-[#007991]"
                  >
                    {/* Signup link */}
                    Signup
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/existence-master/Bloomify/">
                    {/* GitHub link */}
                    <button
                      type="button"
                      className="text-white bg-black hover:bg-[#007991] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 -translate-y-1 focus:outline-none"
                    >
                      {/* Button for GitHub */}
                      GitHub
                    </button>
                  </Link>
                </li>
              </ul>
              {/* End of desktop navbar */}
            </div>
          </div>
          {/* End of navbar container */}
        </nav>
        {/* End of navigation bar */}
        {/* Contact Us section */}
        <section className="bg-transparent flex w-screen h-2/3 justify-center">
          {/* Section for contact information */}
          <div className="flex flex-col items-center justify-center w-1/2 md:h-2/3 lg:py-0">
            {/* Flex layout for contact information */}
            <p className="font-Poppins self-center text-3xl text-gray-600 leading-relaxed mb-8">
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