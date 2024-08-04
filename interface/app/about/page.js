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
        {/* Background color for the main container */}
        {/* Navigation bar */}
        <nav class="bg-lightyellow fixed w-screen z-20 top-0 start-0 rounded-b-xl border-b border-2 border-gray-600">
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
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
                    href="#"
                    class="block py-2 px-3 text-midnightAzure rounded hover:text-cerulean md:p-0"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="/contactus"
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
                          href="#"
                          className="block py-2 px-3 dark:text-paleRose text-lividBrown hover:text-tickleMePink rounded"
                        >
                          About
                        </a>
                      </li>
                      <li>
                        <a
                          href="/contactus"
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
        {/* Content for larger screens */}
        <div className="xs:max-md:hidden">
          {/* Hide on smaller screens */}
          <section className="max-w-full bg-transparent dark:bg-transparent py-12 z-0 text-justify">
            {/* Section styling */}
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-4">
              {/* Flex layout */}
              <div className="w-full h-[700px] md:w-1/2 md:pr-8 flex flex-col justify-center items-center md:items-start mb-8 md:mb-0">
                {/* Content for larger screens */}
                <h2 className="text-xl self-center font-bold text-red-800 mb-4">
                  Educational Assessment Redefined
                </h2>
                {/* Section heading */}
                <p className="font-Poppins text-3xl text-gray-600 leading-relaxed mb-8">
                  {/* Content description */}
                  Educational institutions often prioritize low-level cognitive
                  skills in exams, hindering students' ability to apply concepts
                  and fostering a culture of rote memorization. We aim to
                  address this by revolutionizing the assessment process with a
                  chatbot that aligns with Bloom's Taxonomy.
                </p>
                {/* End of content description */}
              </div>
              {/* End of larger screens content */}
            </div>
            {/* End of container */}
          </section>
          {/* End of section */}
        </div>
        {/* End of content for larger screens */}
        {/* Content for smaller screens */}
        <div className="md:hidden">
          {/* Show on smaller screens */}
          <section className="w-full bg-transparent z-0">
            {/* Section styling */}
            <div className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-4">
              {/* Flex layout */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
                {/* Content for smaller screens */}
                <h2 className="text-2xl text-center self-center font-bold text-red-800 mb-4">
                  Educational Assessment Redefined
                </h2>
                {/* Section heading */}
                <p className="font-Poppins self-center content-center text-xl text-center text-gray-600 leading-relaxed mb-8">
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
                </p>
                {/* End of content description */}
              </div>
              {/* End of smaller screens content */}
            </div>
            {/* End of container */}
          </section>
          {/* End of section */}
        </div>
        {/* End of content for smaller screens */}
        {/* Footer section */}
        <footer className="footer-linear-bg">
          {/* Footer styling */}
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            {/* Footer container */}
            <div className="md:flex md:justify-between">
              {/* Flex layout for footer */}
              <div className="mb-6 md:mb-0">
                {/* Logo section */}
                <Image
                  src="navbarlogo.svg" // Logo source
                  className="bg-white border-8 border-white rounded-xl" // Styling for the logo
                  alt="Bloomify Logo" // Alternative text for accessibility
                  width={183.37} // Width of the logo
                  height={66.24} // Height of the logo
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
                {/* End of resources section */}
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
                {/* End of social media section */}
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
                      {/* Link to privacy policy */}
                    </li>
                    <li>
                      <a
                        href="https://docs.google.com/document/d/12LOQu7OB10FRWwSIYJlkZQ-5xHi_rO59qkJyVKg5Oj4/edit?usp=sharing"
                        className="hover:underline"
                      >
                        White Paper Link
                      </a>
                      {/* Link to white paper */}
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Open Core License
                      </a>
                      {/* Link to Open Core License information */}
                    </li>
                  </ul>
                  {/* End of legal links */}
                </div>
                {/* End of legal section */}
              </div>
              {/* End of grid layout for footer links */}
            </div>
            {/* End of flex layout */}
            <hr className="my-6 border-white sm:mx-auto lg:my-8" />
            {/* Horizontal rule */}
            <div className="sm:flex sm:items-center sm:justify-between">
              {/* Footer bottom section */}
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                2024
                <a href="#" className="hover:underline">
                  Bloomify
                </a>
                . All Rights Reserved.
              </span>
              {/* Copyright information */}
              <div className="flex mt-4 sm:justify-center sm:mt-4">
                {/* Additional branding */}
                <span className="text-white translate-y-5">Powered by</span>
                {/* Label for power source */}
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
              </div>
              {/* End of additional branding */}
            </div>
            {/* End of footer bottom section */}
          </div>
          {/* End of footer container */}
        </footer>
        {/* End of footer section */}
      </div>
      {/* End of main container */}
    </>
  ); // End of component JSX structure
};

export default About; // Export the About component for use in Next.js
