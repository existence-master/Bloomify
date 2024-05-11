"use client";

import Link from "next/link"; /* Link library for Next-Optimised Links */
import Image from "next/image"; /* Image library for Next-Optimised Images */
import {
  useState,
  useEffect,
  useRef,
} from "react"; /* React Hooks that are used for dynamic content rendering*/

const Home = () => {
  /* Home function that is exported as the default */
  const [isOpen, setIsOpen] =
    useState(false); /* useState used for the dropdown menu on mobile navbar */
  const dropdownRef = useRef(null); /* useRef hook for the mobile dropdown*/
  useEffect(() => {
    /* useEffect hook used to handle clicks outside the menu to close it */
    document.addEventListener(
      "mousedown",
      handleClickOutside
    ); /* event listener for clicks outside the menu */
    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      ); /* event listener for clicks outside the menu */
    };
  }, []); /* end of useEffect - with empty dependency array */
  const toggleMenu = () => {
    /* function used for toggling the dropdown menu*/
    setIsOpen((prev) => !prev); //sets the isOpen state to opposite of previous value
    //console.log("Clicked");
  };

  const handleClickOutside = (event) => {
    //handler function for clicks outside the dropdown menu
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      //set isOpen to false if the menu is open
      setIsOpen(false);
    }
  };

  return (
    <>
      <div className="bg-[#fffbe6]">
        {/* Main div - contains whole page */}
        <nav className="bg-transparent mb-20">
          {/* Start of navbar div */}
          <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
            {/* Navbar container div */}
            {/* Link for bloomify logo to reroute to Home. */}
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              {/* Bloomify logo in the navbar*/}
              <Image
                src="navbarlogo.svg"
                className="h-8"
                alt="Bloomify Logo"
                width={183.37}
                height={45.91}
              />
            </Link>
            {/* End of Home link*/}
            {/* Mobile Navbar */}
            <div ref={dropdownRef}>
              {/* start of mobile navbar div - dropdown menu */}
              {/* hamburger button for mobile dropdown*/}
              <button
                onClick={toggleMenu}
                type="button"
                className="inline-flex mr-2 items-center bg-transparent p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none"
                aria-controls="navbar-default"
                aria-expanded="false"
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
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
              {/* End of hamburger dropdown */}
              {/* Mobile navbar contents */}
              {isOpen && (
                <div className="bg-white absolute right-4 top-10 rounded-xl border-2 border-black">
                  <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-transparent">
                    <li>
                      {/* Home */}
                      <Link
                        href="/"
                        className="block py-2 px-3 font-bold text-[#007991] rounded md:bg-transparent md:p-0 dark:text-[#007991] "
                        aria-current="page"
                      >
                        {/* Home button */}
                        Home
                      </Link>
                    </li>
                    <li>
                      {/* About */}
                      <Link
                        href="/about"
                        className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991]"
                      >
                        {/* About button */}
                        About
                      </Link>
                    </li>
                    <li>
                      {/* Contact Us */}
                      <Link
                        href="/contactus"
                        className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991]"
                      >
                        {/* Contact us Button */}
                        Contact Us
                      </Link>
                    </li>
                    <li>
                      {/* Login */}
                      <Link
                        href="/login"
                        className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991]"
                      >
                        {/* Login Button */}
                        Login
                      </Link>
                    </li>
                    <li>
                      {/* Signup */}
                      <Link
                        href="/signup"
                        className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991]"
                      >
                        {/* Signup button */}
                        Signup
                      </Link>
                    </li>
                    <li>
                      {/* GitHub */}
                      <Link href="https://github.com/existence-master/Bloomify/">
                        <button
                          type="button"
                          className="text-white bg-black hover:bg-[#007991] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 -translate-y-1 focus:outline-none"
                        >
                          {/* GitHub Button */}
                          GitHub
                        </button>
                        {/* End of GitHub button */}
                      </Link>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            {/* Desktop Navbar */}
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              {/* Start of Desktop navbar */}
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-transparent">
                <li>
                  {/* Home */}
                  <Link
                    href="/"
                    className="block py-2 px-3 font-bold text-[#007991] rounded md:bg-transparent md:p-0 dark:text-[#007991] "
                    aria-current="page"
                  >
                    {/* Home link */}
                    Home
                  </Link>
                </li>
                <li>
                  {/* About */}
                  <Link
                    href="/about"
                    className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    {/* About Link */}
                    About
                  </Link>
                </li>
                <li>
                  {/* Contact Us*/}
                  <Link
                    href="/contactus"
                    className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    {/* Contact us Link */}
                    Contact Us
                  </Link>
                </li>
                <li>
                  {/* Login */}
                  <Link
                    href="/login"
                    className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    {/* Login Link*/}
                    Login
                  </Link>
                </li>
                <li>
                  {/* Signup */}
                  <Link
                    href="/signup"
                    className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  >
                    {/* Signup Link*/}
                    Signup
                  </Link>
                </li>
                <li>
                  {/* GitHub */}
                  <Link href="https://github.com/existence-master/Bloomify/">
                    <button
                      type="button"
                      className="text-white bg-black hover:bg-[#007991] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 -translate-y-1 focus:outline-none"
                    >
                      {/* GitHub repo Link*/}
                      GitHub
                    </button>
                  </Link>
                </li>
              </ul>
              {/* End of button list*/}
            </div>
            {/* End of desktop navbar */}
          </div>
          {/* End of navbar main container */}
        </nav>
        {/* End of navbar */}
        {/* Desktop Content*/}
        <div className="xs:max-md:hidden">
          {/* Desktop content container - hidden on mobile devices */}
          <section className="max-w-full bg-transparent dark:bg-transparent py-12 z-0 overflow-hidden">
            {/* Hero Section */}
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-4">
              {/* Hero Section Container start*/}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
                {/* Nested container div */}
                {/* Hero Section Headings */}
                <h2 className="text-xl font-bold text-red-800 mb-4">
                  Educational Assessment Redefined
                </h2>
                <p className="font-Poppins text-3xl text-gray-600 leading-relaxed mb-8">
                  An Open-Source
                  <span className="font-bold text-[#007991]">Chatbot</span>
                  Designed
                </p>
                <p className="font-Poppins text-3xl text-gray-600 leading-relaxed mb-8">
                  To
                  <span className="font-bold text-[#007991]">
                    Revolutionize
                  </span>
                  The Assessment
                </p>
                <p className="font-Poppins text-3xl text-gray-600 leading-relaxed mb-20">
                  Process In
                  <span className="font-bold text-[#007991]">Educational</span>
                  Institutes
                </p>
                {/* Join Us button*/}
                <Link href="/signup">
                  <button
                    type="button"
                    className="w-50 text-2xl ml-40 text-white font-semibold bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-5 py-2.5 text-center me-2 mb-2"
                  >
                    Join Us
                  </button>
                </Link>
                {/* End of Join Us*/}
              </div>
              {/* End of Nested container*/}
              <div className="w-full md:w-1/2 relative">
                {/* Nested container - for holding bloom's triangle */}
                <Image
                  src="bloomTriangle.svg"
                  alt="Bloom's Taxonomy"
                  className="max-w-full mx-auto relative translate-x-1/4  top-1/2 z-10"
                  width={478.55}
                  height={469.26}
                />
                {/*<Image src="curvyrect.svg" alt="Curvy Rectangle" className="rect-65 z-0" width={1160} height={970}/>*/}
              </div>
              {/* End of Nested Container */}
            </div>
            {/* End of Container div */}
          </section>
          {/* End of Hero Section */}
          <section className="bg-transparent dark:bg-transparent py-12 h-1/12">
            {/* About us and features section */}
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-4">
              {/* Start of Container div*/}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
                {/* Left container */}
                {/* Left Container Contents - About Us */}
                <h2 className="text-3xl font-bold text-[#007991] mb-8 ml-2">
                  About Us
                </h2>
                <p className="footer-linear-bg rounded-xl p-8 leading-relaxed text-xl text-white justify-normal">
                  Bloomify is an innovative educational tool designed to
                  revolutionize the assessment process in academic institutions.
                  It addresses the prevalent challenges of exam paper creation
                  by leveraging Bloom's Taxonomy, a well-established framework
                  for classNameifying cognitive skills. Bloomify aims to promote
                  deeper understanding, critical thinking, and practical
                  application of knowledge among students by ensuring that exam
                  questions align with Bloom's Taxonomy levels. It was designed
                  to counteract the dominance of rote learning in exams,
                  encourage holistic learning experiences, and foster the
                  development of essential skills necessary for success in the
                  real world.
                </p>
              </div>
              <div className="vertical-line"></div>
              {/* Vertical line to split about us and features */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
                {/* right container for features */}
                {/* Features div contents */}
                <h2 className="text-xl font-bold text-red-800 mb-4">
                  FEATURES
                </h2>
                <p className="text-xl mb-2">
                  <span className="font-bold">
                    AI-Powered Question classification:
                  </span>
                  Instantly categorize questions into Bloom's Taxonomy levels.
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Suggestive Transformation:</span>
                  Elevate question complexity with AI-driven suggestions for
                  higher-order thinking.
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Paper Generation Wizardry:</span>
                  Generate balanced question papers effortlessly based on
                  customizable parameters.
                </p>
                <p className="text-xl mb-2">
                  <span className="font-bold">Intuitive User Interface:</span>
                  Seamlessly navigate and utilize Bloomify's powerful features
                  with ease.
                </p>
                <p className="text-xl">
                  <span className="font-bold">
                    Customizable Syllabus Integration:
                  </span>
                  Easily adapt Bloomify to align with your institution's unique
                  syllabus requirements.
                </p>
              </div>
              {/* End of right container */}
            </div>
            {/* End of Main container */}
          </section>
          {/* End of about us and features section */}
          <section className="bg-transparent dark:bg-transparent py-12 overflow-hidden">
            {/* Product vs Research Section */}
            <div className="container max-w-full mx-auto flex flex-col md:flex-row items-center justify-center sm:px-6 lg:px-4 gap-10 relative">
              {/* Main Container div */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
                {/* Left Sphere Container */}
                <div className="absolute -top-24 bg-[#007991] rounded-full p-24 leading-relaxed text-sm text-white justify-normal -left-16 w-96 h-96">
                  {/* Left Sphere */}
                  <p className="text-justify">
                    {/* Left Sphere contents*/}
                    From accurate question classification to dynamic suggestion
                    and generation features driven by cutting-edge AI, Bloomify
                    streamlines the assessment process, saving you time and
                    promoting higher order thinking among students.
                  </p>
                  {/* End of left sphere contents */}
                </div>
                {/* End of left sphere */}
              </div>
              {/* End of left sphere container */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
                {/* Central content - rectangular */}
                {/* Central container contents */}
                <h2 className="text-3xl font-bold text-[#007991] mb-8 ml-2 self-center">
                  Product VS Research
                </h2>
                <p className="bg-[#222E50] rounded-xl p-8 leading-relaxed text-xl text-white justify-normal">
                  The development of Bloomify was driven by extensive research
                  efforts aimed at addressing prevalent challenges in
                  educational assessment. Leveraging insights from Bloom's
                  Taxonomy, our research team embarked on a journey to
                  revolutionize assessment practices through the integration of
                  artificial intelligence. Through meticulous data collection,
                  analysis, and experimentation with cutting-edge natural
                  language processing techniques, we laid the foundation for
                  Bloomify's advanced features. Our research endeavors were
                  guided by a commitment to enhancing cognitive assessment,
                  fostering critical thinking skills, and promoting practical
                  application of knowledge. The resulting product, Bloomify,
                  represents the culmination of our research efforts, offering
                  educators a powerful tool to create balanced question papers
                  aligned with Bloom's Taxonomy effortlessly.
                </p>
              </div>
              {/* End of central container */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
                {/* Right sphere container */}
                <div className="absolute bg-[#007991] rounded-full p-24 leading-relaxed text-sm text-white justify-normal -bottom-40 -right-16 w-96 h-96">
                  {/* Right sphere */}
                  <p className="text-justify">
                    {/* Right sphere contents */}
                    Revolutionize your assessment practices with Bloomify – the
                    all-in-one platform empowering educators to effortlessly
                    create balanced exam papers aligned with Bloom's Taxonomy.
                  </p>
                  {/* End of right sphere contents */}
                </div>
                {/* end of right sphere */}
              </div>
              {/* end of right sphere container */}
            </div>
            {/* End of main container */}
          </section>
          {/* End of Product vs research container */}
          <hr className="my-6 border-[#222E50] border-8 sm:mx-auto lg:my-8 mb-2" />
          {/* Dark blue line */}
          <hr className="my-6 border-[#007991] border-8 sm:mx-auto lg:my-8 mt-2" />
          {/* light blue line */}
          <section className="bg-transparent dark:bg-transparent py-12">
            {/* Open source - github repo section */}
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-4">
              {/* Main section container */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
                {/* link container */}
                <h2 className="text-4xl font-bold text-[#222E50] mb-20 ml-2 self-center font-sans">
                  We are open-source!
                </h2>
                <Link
                  href="https://github.com/existence-master/Bloomify/"
                  className="rounded-xl bg-gray-200 border-2 border-black p-4 text-2xl font-normal text-black mb-8 ml-2 self-center mt-15"
                >
                  https://github.com/existence-master/Bloomify/
                </Link>
                <h2 className="text-2xl text-[#222E50] mb-20 ml-2 self-center font-sans">
                  Explore the GitHub Repository
                </h2>
              </div>
              {/* end of link container*/}
            </div>
            {/* end of main section container */}
          </section>
          {/* end of open source section */}
        </div>
        {/* end of desktop content */}
        {/* Mobile Content */}
        <div className="md:hidden">
          {/* Mobile content container */}
          <section className="max-w-full bg-transparent overflow-hidden">
            {/* Hero Section */}
            <div className="w-full flex flex-col justify-center items-center">
              {/* Hero section main container */}
              {/* Hero section text content*/}
              <h2 className="font-bold text-xl text-red-800 mb-4">
                Educational Assessment Redefined
              </h2>
              {/* Bloom's triangle */}
              <div className="w-full flex flex-col justify-center items-center relative">
                <Image
                  src="bloomTriangle.svg"
                  alt="Bloom's Taxonomy"
                  className=""
                  width={200}
                  height={200}
                />
              </div>
              {/* End of bloom's triangle */}
              <div className="w-full flex flex-col items-center justify-center">
                {/* Text content - hero section */}
                <p className="text-center w-full font-Poppins text-2xl text-gray-600 mt-4 mb-4 p-4">
                  An Open-Source
                  <span className="font-bold text-[#007991]">Chatbot</span>
                  Designed To
                  <span className="font-bold text-[#007991]">
                    Revolutionize
                  </span>
                  The Assessment Process In
                  <span className="font-bold text-[#007991]">Educational</span>
                  Institutes
                </p>
                <div className="w-full flex justify-center">
                  {/* Join us Button */}
                  <Link href="/signup">
                    <button
                      type="button"
                      className="text-2xl text-white font-semibold bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-xl border-2 border-black px-5 py-2.5 text-center me-2 mb-2"
                    >
                      Join Us
                    </button>
                  </Link>
                </div>
                {/* End of join us button div */}
              </div>
              {/* End of Hero section div*/}
            </div>
            {/* end of hero section container div */}
          </section>
          {/* end of hero section */}
          <section className="bg-transparent mt-10">
            {/* about us and features div */}
            <div className="p-2">
              {/* main about us div */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
                {/* About us content div */}
                <h2 className="text-3xl font-bold text-[#007991] mb-8 ml-2">
                  About Us
                </h2>
                <p className="footer-linear-bg rounded-xl p-8 leading-relaxed text-l text-justify text-white justify-normal">
                  Bloomify is an innovative educational tool designed to
                  revolutionize the assessment process in academic institutions.
                  It addresses the prevalent challenges of exam paper creation
                  by leveraging Bloom's Taxonomy, a well-established framework
                  for classifying cognitive skills. Bloomify aims to promote
                  deeper understanding, critical thinking, and practical
                  application of knowledge among students by ensuring that exam
                  questions align with Bloom's Taxonomy levels. It was designed
                  to counteract the dominance of rote learning in exams,
                  encourage holistic learning experiences, and foster the
                  development of essential skills necessary for success in the
                  real world.
                </p>
              </div>
              {/* end of about us content */}
              <hr className="border-2 border-black mt-4 mb-8" />
              {/* horizontal line to split about us and features */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
                {/* Features div */}
                <h2 className="text-xl font-bold text-red-800 mb-4">
                  FEATURES
                </h2>
                <div className="text-center">
                  {/* Feature list div */}
                  <p className="text-xl mb-3">
                    <span className="font-bold">
                      AI-Powered Question Classification:
                    </span>
                    Instantly categorize questions into Bloom's Taxonomy levels.
                  </p>
                  <p className="text-xl mb-3">
                    <span className="font-bold">
                      Suggestive Transformation:
                    </span>
                    Elevate question complexity with AI-driven suggestions for
                    higher-order thinking.
                  </p>
                  <p className="text-xl mb-3">
                    <span className="font-bold">
                      Paper Generation Wizardry:
                    </span>
                    Generate balanced question papers effortlessly based on
                    customizable parameters.
                  </p>
                  <p className="text-xl mb-3">
                    <span className="font-bold">Intuitive User Interface:</span>
                    Seamlessly navigate and utilize Bloomify's powerful features
                    with ease.
                  </p>
                  <p className="text-xl">
                    <span className="font-bold">
                      Customizable Syllabus Integration:
                    </span>
                    Easily adapt Bloomify to align with your institution's
                    unique syllabus requirements.
                  </p>
                </div>
                {/* end of feature list div */}
              </div>
              {/* End of features div */}
            </div>
            {/* end of main about us and features div */}
          </section>
          {/* end of about us and features section */}
          <section className="bg-transparent mt-12 mb-12 overflow-hidden">
            {/* Product vs Research section */}
            <div className="flex flex-col justify-center items-center">
              {/* Container */}
              <div className="container max-w-full mx-auto flex flex-col md:flex-row items-center justify-center sm:px-6 lg:px-4 gap-10 relative">
                {/* Inner container */}
                <div className="w-full flex flex-col items-center mb-8 p-2">
                  {/* Central product vs research div */}
                  <h2 className="text-3xl font-bold text-[#007991] mb-8 ml-2 self-center">
                    Product VS Research
                  </h2>
                  <p className="bg-[#222E50] text-justify rounded-xl p-8 leading-relaxed text-l text-white justify-normal">
                    The development of Bloomify was driven by extensive research
                    efforts aimed at addressing prevalent challenges in
                    educational assessment. Leveraging insights from Bloom's
                    Taxonomy, our research team embarked on a journey to
                    revolutionize assessment practices through the integration
                    of artificial intelligence. Through meticulous data
                    collection, analysis, and experimentation with cutting-edge
                    natural language processing techniques, we laid the
                    foundation for Bloomify's advanced features. Our research
                    endeavors were guided by a commitment to enhancing cognitive
                    assessment, fostering critical thinking skills, and
                    promoting practical application of knowledge. The resulting
                    product, Bloomify, represents the culmination of our
                    research efforts, offering educators a powerful tool to
                    create balanced question papers aligned with Bloom's
                    Taxonomy effortlessly.
                  </p>
                </div>
                {/* End of central div */}
              </div>
              {/* end of inner container */}
              <div className="w-full flex justify-center">
                {/* Sphere container */}
                <div className="bg-[#007991] rounded-full p-12 leading-relaxed text-sm text-white justify-normal w-80 h-80">
                  {/* sphere */}
                  <p className="text-justify mt-6">
                    From accurate question classification to dynamic suggestion
                    and generation features driven by cutting-edge AI, Bloomify
                    streamlines the assessment process, saving you time and
                    promoting higher order thinking among students.
                  </p>
                </div>
                {/* end of sphere */}
              </div>
              {/* end of sphere container */}
            </div>
            {/* end of main container */}
          </section>
          {/* End of product vs research section */}
          <hr className="my-6 border-[#222E50] border-8 sm:mx-auto lg:my-8 mb-2" />
          {/* horizontal rule - dark blue */}
          <hr className="my-6 border-[#007991] border-8 sm:mx-auto lg:my-8 mt-2" />
          {/* horizontal rule - light blue */}
          <section className="bg-transparent py-12 overflow-hidden">
            {/* we are open source section */}
            <div className="w-full flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-4">
              {/* container */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
                {/* inner container */}
                <h2 className="w-full text-3xl font-bold text-[#222E50] mb-10 ml-2 text-center font-sans">
                  We are open-source!
                </h2>
                <Link
                  href="https://github.com/existence-master/Bloomify/"
                  className="rounded-xl border-2 border-black bg-gray-200 p-4 text-l font-normal text-black self-center mt-10 mb-10"
                >
                  https://github.com/existence-master/Bloomify/
                </Link>
                <h2 className="text-2xl text-[#222E50] mb-20 ml-2 self-center font-sans">
                  Explore the GitHub Repository
                </h2>
              </div>
              {/* end of inner container */}
            </div>
            {/* end of outer container */}
          </section>
          {/* end of open source section */}
        </div>
        {/* end of mobile contents */}
        <footer className="footer-linear-bg">
          {/* start of footer */}
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            {/* footer main container */}
            <div className="md:flex md:justify-between">
              {/* footer inner container */}
              <div className="mb-6 md:mb-0">
                {/* bloomify logo container */}
                <Image
                  src="navbarlogo.svg"
                  className="bg-white border-8 border-white rounded-xl"
                  alt="Bloomify Logo"
                  width={183.37}
                  height={66.24}
                />
              </div>
              {/* end of bloomify logo */}
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                {/* main grid - contains all footer contents */}
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Resources
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                      <Link href="/" className="hover:underline">
                        Bloomify
                      </Link>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        Existence Website
                      </a>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Follow us
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                      <Link
                        href="https://github.com/existence-master/Bloomify"
                        className="hover:underline "
                      >
                        Github
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="https://www.linkedin.com/company/existence-3/"
                        className="hover:underline "
                      >
                        LinkedIn
                      </Link>
                    </li>
                  </ul>
                </div>
                <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                    Legal
                  </h2>
                  <ul className="text-gray-500 dark:text-gray-400 font-medium">
                    <li className="mb-4">
                      <a href="#" className="hover:underline">
                        Privacy Policy
                      </a>
                    </li>
                    <li className="mb-4">
                      <a href="#" className="hover:underline">
                        White Paper Link
                      </a>
                    </li>
                    <li>
                      <a href="#" className="hover:underline">
                        License
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              {/* end of footer grid */}
            </div>
            {/* end of main div */}
            <hr className="my-6 border-white sm:mx-auto lg:my-8" />
            {/* white horizontal rule */}
            <div className="sm:flex sm:items-center sm:justify-between">
              {/* footer bottom content container */}
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                2024
                <a href="#" className="hover:underline">
                  Bloomify
                </a>
                . All Rights Reserved.
              </span>
              <div className="flex mt-5 sm:justify-center sm:mt-0">
                <span className="text-white translate-y-5">Powered by</span>
                <a
                  href="#"
                  className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5"
                >
                  <Image
                    src="existence.svg"
                    alt="Existence Logo"
                    width={217}
                    height={62}
                    className="rounded-xl"
                  />
                </a>
              </div>
            </div>
            {/* end of footer bottom content */}
          </div>
          {/* end of main footer container */}
        </footer>
        {/* end of footer */}
      </div>
      {/* end of MAIN div */}
    </>
  );
};

export default Home;
