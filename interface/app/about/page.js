"use client"; // Indicates that this component runs on the client-side in Next.js

import Link from "next/link"; // Next.js component for client-side navigation
import Image from "next/image"; // Next.js optimized image component
import { useState, useEffect, useRef } from "react"; // React hooks for state management and side effects

const About = () => {
  const [isOpen, setIsOpen] = useState(false); // State to track the dropdown menu open/close status
  const dropdownRef = useRef(null); // Reference to the dropdown menu

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside); // Event listener to detect clicks outside the dropdown
    return () => {
      document.removeEventListener("mousedown", handleClickOutside); // Cleanup event listener
    };
  }, []); // Empty dependency array ensures this effect runs once on component mount

  // Toggle the dropdown menu open/close status
  const toggleMenu = () => {
    setIsOpen((prev) => !prev); // Toggle the previous state
    console.log("Clicked"); // Log a message to the console
  };

  // Handle clicks outside the dropdown to close it
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      // Check if the click is outside the dropdown
      setIsOpen(false); // Close the dropdown
    }
  };

  return (
    <>
      <div className="bg-[#fffbe6]">
        {" "}
        {/* Background color for the main container */}
        {/* Navigation bar */}
        <nav className="bg-transparent mb-20">
          {" "}
          {/* Transparent background and margin-bottom */}
          <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
            {" "}
            {/* Flex layout for navigation */}
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              {" "}
              {/* Link to the home page */}
              <Image
                src="navbarlogo.svg"
                className="h-8"
                alt="Bloomify Logo"
                width={183.37}
                height={45.91}
              />{" "}
              {/* Logo image */}
            </Link>
            {/* Mobile navbar section */}
            <div ref={dropdownRef}>
              {" "}
              {/* Reference for the dropdown */}
              <button
                onClick={toggleMenu} // Toggle the menu on click
                type="button"
                className="inline-flex mr-2 items-center bg-transparent p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none" // Styling
                aria-controls="navbar-default"
                aria-expanded={isOpen ? "true" : "false"} // Accessibility attributes
              >
                <span className="sr-only">Open main menu</span>{" "}
                {/* Accessibility text */}
                <svg
                  className="w-5 h-5" // SVG size
                  aria-hidden="true" // Accessibility attribute
                  xmlns="http://www.w3.org/2000/svg" // XML namespace for SVG
                  fill="none" // No fill
                  viewBox="0 0 17 14" // SVG viewbox
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round" // Rounded line caps
                    strokeLinejoin="round" // Rounded line joins
                    strokeWidth="2" // Line thickness
                    d="M1 1h15M1 7h15M1 13h15" // SVG path data for the hamburger menu icon
                  />
                </svg>
              </button>
              {/* Dropdown menu when open */}
              {isOpen && ( // Only render if the menu is open
                <div className="bg-white absolute right-4 top-10 rounded-xl border-2 border-black">
                  {" "}
                  {/* Styling for the dropdown */}
                  <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-transparent">
                    {" "}
                    {/* Menu items */}
                    <li>
                      <Link
                        href="/"
                        className="block py-2 px-3 font-bold text-[#007991] rounded md:bg-transparent md:p-0 dark:text-[#007991]"
                        aria-current="page" // Link to home
                      >
                        Home
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/about"
                        className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991]" // Styling and hover effects
                      >
                        About
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/contactus"
                        className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991]" // Styling and hover effects
                      >
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/login"
                        className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991]" // Styling and hover effects
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/signup"
                        className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991]" // Styling and hover effects
                      >
                        Signup
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://github.com/existence-master/Bloomify/" // Link to GitHub
                      >
                        <button
                          type="button"
                          className="text-white bg-black hover:bg-[#007991] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 -translate-y-1 focus:outline-none" // Styling for the button
                        >
                          GitHub
                        </button>
                      </Link>
                    </li>
                  </ul>{" "}
                  {/* End of dropdown menu items */}
                </div>
              )}
            </div>{" "}
            {/* End of dropdown section */}
            {/* Default desktop navbar */}
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              {" "}
              {/* Navbar for larger screens */}
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-transparent">
                {" "}
                {/* Menu items */}
                <li>
                  <Link
                    href="/"
                    className="block py-2 px-3 font-bold text-black rounded md:bg-transparent md:p-0 dark:text-black"
                    aria-current="page" // Link to home
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <a
                    href="#"
                    className="block py-2 px-3 font-bold text-[#007991] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-[#007991] md:dark:hover:text-[#007991]" // Styling and hover effects
                  >
                    About
                  </a>
                </li>
                <li>
                  <Link
                    href="/contactus"
                    className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991]" // Styling and hover effects
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/login"
                    className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991]" // Styling and hover effects
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link
                    href="/signup"
                    className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991]" // Styling and hover effects
                  >
                    Signup
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://github.com/existence-master/Bloomify/" // Link to GitHub
                  >
                    <button
                      type="button"
                      className="text-white bg-black hover:bg-[#007991] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 -translate-y-1 focus:outline-none" // Styling for the GitHub button
                    >
                      GitHub
                    </button>{" "}
                  </Link>
                </li>
              </ul>{" "}
              {/* End of desktop navbar menu items */}
            </div>{" "}
            {/* End of default desktop navbar */}
          </div>{" "}
          {/* End of navigation bar container */}
        </nav>{" "}
        {/* End of navigation bar */}
        {/* Content for larger screens */}
        <div className="xs:max-md:hidden">
          {" "}
          {/* Hide on smaller screens */}
          <section className="max-w-full bg-transparent dark:bg-transparent py-12 z-0 text-justify">
            {" "}
            {/* Section styling */}
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-4">
              {" "}
              {/* Flex layout */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
                {" "}
                {/* Content for larger screens */}
                <h2 className="text-xl self-center font-bold text-red-800 mb-4">
                  Educational Assessment Redefined
                </h2>{" "}
                {/* Section heading */}
                <p className="font-Poppins self-center content-center text-3xl text-gray-600 leading-relaxed mb-8">
                  {" "}
                  {/* Content description */}
                  There are three main problems we address here. The first one
                  is the case where universities work on Bloom's taxonomy basis
                  for the syllabus but not for the question papers. The
                  prevalent issue in many educational institutions, particularly
                  in India and elsewhere, lies in the tendency to predominantly
                  set exam questions at the lower levels of Bloom's Taxonomy.
                  This practice restricts students to rote memorization and
                  recall, discouraging deeper understanding, practical
                  application, and critical thinking. The emphasis on low-level
                  cognitive skills in exams fosters a culture where students
                  prioritize memorization over grasping the practical utility of
                  concepts. As a consequence, the educational system often falls
                  short in nurturing holistic learning experiences that
                  encourage analytical thinking, problem-solving, and the
                  application of acquired knowledge in real-world scenarios.
                </p>{" "}
                {/* End of content description */}
              </div>{" "}
              {/* End of larger screens content */}
            </div>{" "}
            {/* End of container */}
          </section>{" "}
          {/* End of section */}
        </div>{" "}
        {/* End of content for larger screens */}
        {/* Content for smaller screens */}
        <div className="md:hidden">
          {" "}
          {/* Show on smaller screens */}
          <section className="w-full bg-transparent z-0">
            {" "}
            {/* Section styling */}
            <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-4">
              {" "}
              {/* Flex layout */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
                {" "}
                {/* Content for smaller screens */}
                <h2 className="text-2xl text-center self-center font-bold text-red-800 mb-4">
                  Educational Assessment Redefined
                </h2>{" "}
                {/* Section heading */}
                <p className="font-Poppins self-center content-center text-xl text-center text-gray-600 leading-relaxed mb-8">
                  {" "}
                  {/* Content description */}
                  There are three main problems we address here. The first one
                  is the case where universities work on Bloom's taxonomy basis
                  for the syllabus but not for the question papers. The
                  prevalent issue in many educational institutions, particularly
                  in India and elsewhere, lies in the tendency to predominantly
                  set exam questions at the lower levels of Bloom's Taxonomy.
                  This practice restricts students to rote memorization and
                  recall, discouraging deeper understanding, practical
                  application, and critical thinking. The emphasis on low-level
                  cognitive skills in exams fosters a culture where students
                  prioritize memorization over grasping the practical utility of
                  concepts. As a consequence, the educational system often falls
                  short in nurturing holistic learning experiences that
                  encourage analytical thinking, problem-solving, and the
                  application of acquired knowledge in real-world scenarios.
                </p>{" "}
                {/* End of content description */}
              </div>{" "}
              {/* End of smaller screens content */}
            </div>{" "}
            {/* End of container */}
          </section>{" "}
          {/* End of section */}
        </div>{" "}
        {/* End of content for smaller screens */}
        {/* Footer section */}
        <footer className="footer-linear-bg">
          {" "}
          {/* Footer styling */}
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            {" "}
            {/* Footer container */}
            <div className="md:flex md:justify-between">
              {" "}
              {/* Flex layout for footer */}
              <div className="mb-6 md:mb-0">
                {" "}
                {/* Logo section */}
                <Image
                  src="navbarlogo.svg" // Logo source
                  className="bg-white border-8 border-white rounded-xl" // Styling for the logo
                  alt="Bloomify Logo" // Alternative text for accessibility
                  width={183.37} // Width of the logo
                  height={66.24} // Height of the logo
                />
              </div>{" "}
              {/* End of logo section */}
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                {" "}
                {/* Grid layout for footer links */}
                <div>
                  {" "}
                  {/* Section for resources */}
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Resources
                  </h2>{" "}
                  {/* Heading */}
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    {" "}
                    {/* List of resource links */}
                    <li className="mb-4">
                      <Link href="/" className="hover:underline">
                        Bloomify
                      </Link>{" "}
                      {/* Link to Bloomify */}
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Existence Website
                      </a>{" "}
                      {/* Link to Existence Website */}
                    </li>
                  </ul>{" "}
                  {/* End of resource links */}
                </div>{" "}
                {/* End of resources section */}
                <div>
                  {" "}
                  {/* Section for social media links */}
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Follow us
                  </h2>{" "}
                  {/* Heading */}
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    {" "}
                    {/* List of social media links */}
                    <li className="mb-4">
                      <Link
                        href="https://github.com/existence-master/Bloomify"
                        className="hover:underline"
                      >
                        GitHub
                      </Link>{" "}
                      {/* Link to GitHub */}
                    </li>
                    <li>
                      <Link
                        href="https://www.linkedin.com/company/existence-3/"
                        className="hover:underline"
                      >
                        LinkedIn
                      </Link>{" "}
                      {/* Link to LinkedIn */}
                    </li>
                  </ul>{" "}
                  {/* End of social media links */}
                </div>{" "}
                {/* End of social media section */}
                <div>
                  {" "}
                  {/* Section for legal links */}
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Legal
                  </h2>{" "}
                  {/* Heading */}
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    {" "}
                    {/* List of legal links */}
                    <li className="mb-4">
                      <a href="#" className="hover:underline">
                        Privacy Policy
                      </a>{" "}
                      {/* Link to privacy policy */}
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        White Paper Link
                      </a>{" "}
                      {/* Link to white paper */}
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Open Core Open Core License
                      </a>{" "}
                      {/* Link to Open Core License information */}
                    </li>
                  </ul>{" "}
                  {/* End of legal links */}
                </div>{" "}
                {/* End of legal section */}
              </div>{" "}
              {/* End of grid layout for footer links */}
            </div>{" "}
            {/* End of flex layout */}
            <hr className="my-6 border-white sm:mx-auto lg:my-8" />{" "}
            {/* Horizontal rule */}
            <div className="sm:flex sm:items-center sm:justify-between">
              {" "}
              {/* Footer bottom section */}
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                © 2024{" "}
                <a href="#" className="hover:underline">
                  Bloomify™
                </a>
                . All Rights Reserved.
              </span>{" "}
              {/* Copyright information */}
              <div className="flex mt-4 sm:justify-center sm:mt-4">
                {" "}
                {/* Additional branding */}
                <span className="text-white translate-y-5">
                  Powered by
                </span>{" "}
                {/* Label for power source */}
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                >
                  {" "}
                  {/* Link with hover effects */}
                  <Image
                    src="existence.svg" // Source for the power source logo
                    width={217} // Width of the image
                    height={62} // Height of the image
                    className="rounded-xl" // Styling for the image
                  />
                </a>
              </div>{" "}
              {/* End of additional branding */}
            </div>{" "}
            {/* End of footer bottom section */}
          </div>{" "}
          {/* End of footer container */}
        </footer>{" "}
        {/* End of footer section */}
      </div>{" "}
      {/* End of main container */}
    </>
  ); // End of component JSX structure
};

export default About; // Export the About component for use in Next.js
