"use client";

import Link from "next/link"; /* Link library for Next-Optimised Links */
import Image from "next/image"; /* Image library for Next-Optimised Images */
import {
  useState,
  useEffect,
  useRef,
} from "react"; /* React Hooks that are used for dynamic content rendering*/
import { FlipWords } from "@components/FlipWords";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";
import { TextGenerateEffect } from "@components/TextGen";
import { IconBrandGithub } from "@tabler/icons-react";

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
  };

  const handleClickOutside = (event) => {
    //handler function for clicks outside the dropdown menu
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      //set isOpen to false if the menu is open
      setIsOpen(false);
    }
  };

  const heroWords = [
    "redefined.",
    "reimagined.",
    "revolutionized.",
    "simplified.",
  ];

  const cn = (...inputs) => {
    return twMerge(clsx(inputs));
  };

  const researchWords =
    "The development of Bloomify was driven by extensive research efforts aimed at addressing prevalent challenges in educational assessment. Leveraging insights from Bloom's Taxonomy, our research team embarked on a journey to revolutionize assessment practices through the integration of artificial intelligence. Through meticulous data collection, analysis, and experimentation with cutting-edge natural language processing techniques, we laid the foundation for Bloomify's advanced features. Our research endeavors were guided by a commitment to enhancing cognitive assessment, fostering critical thinking skills, and promoting practical application of knowledge.";

  return (
    <>
      <div className="bg-[#fffbe6]">
        {/* Main div - contains whole page */}

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
                    href="#"
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
                          href="#"
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
        <section
          id="hero"
          className="flex flex-col items-center xs:h-[800px] md:h-[1000px] bg-gradient-to-t to-[#fffbe6] from-[#ffffff]"
        >
          {/* <a href="#github">
            <button className="xs:mt-32 md:mt-28 bg-flax no-underline group cursor-pointer relative shadow-2xl shadow-midnightAzure rounded-full p-px text-xs font-semibold leading-6  text-paleRose inline-block">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"></span>
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-stilleto py-0.5 px-4 ring-1 ring-white/10 ">
                <span>{`Check out the GitHub!`}</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                  ></path>
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40"></span>
            </button>
          </a> */}
          <h1 className="mt-32 mb-4 md:text-5xl xs:text-4xl font-lora font-normal text-center dark:text-paleRose text-lividBrown">
            Education
            <span className="underline font-normal text-paleRose">
              <FlipWords words={heroWords} />
            </span>
          </h1>
          <p className="text-2xl text-center dark:text-paleRose text-lividBrown font-inter px-2">
            A LLM based chatbot designed to{" "}
            <span className="font-bold">revolutionize</span> the assessment
            process.
          </p>
          <div className="flex flex-row gap-4 mt-8 mb-8">
            <Link
              href="https://youtu.be/urGVaaipzfA"
              className="bg-flax text-lividBrown p-2 rounded-lg text-xl px-4 hover:bg-tickleMePink transition-colors border-2 border-gray-400 duration-300 font-inter"
            >
              Take a Tour
            </Link>
            <Link href="/signup">
              <button className="relative inline-flex overflow-hidden rounded-lg h-12 p-[2px] hover:bg-tickleMePink transition-colors border-2 border-gray-400 duration-300 font-inter focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50">
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#949494_0%,#007991_50%,#7AB6A1_100%)]" />
                <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-lg bg-stilleto px-3 py-1 text-xl font-medium text-lightyellow backdrop-blur-3xl">
                  Get Started
                </span>
              </button>
            </Link>
          </div>
          <div>
            {" "}
            <div className="hidden md:block">
              <iframe
                width="800"
                height="515"
                src="https://www.youtube.com/embed/urGVaaipzfA?si=MNSln_kLM240hXWb"
                title="Bloomify Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <div className="md:hidden">
              <iframe
                width="300"
                height="300"
                src="https://www.youtube.com/embed/urGVaaipzfA?si=MNSln_kLM240hXWb"
                title="Bloomify Demo Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        <section
          id="features"
          className="flex xs:flex-col xs:gap-y-2 md:flex-row md:gap-x-2 justify-center items-center w-full xs:h-[1400px] md:h-[500px] bg-gradient-to-t to-[#ffffff] from-[#fffbe6] px-2"
        >
          <div className="max-w-xs w-full group/card">
            <div
              className={cn(
                " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
                "bg-[url(https://c1.wallpaperflare.com/preview/167/210/341/book-dark-page-open.jpg)] bg-cover"
              )}
            >
              <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
              <div className="flex flex-row items-center space-x-4 z-10">
                {/* Add Tabler Icon here */}
              </div>
              <div className="text content">
                <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                  Question Classification
                </h1>
                <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
                  Instantly classify questions based on Bloom's Taxonomy.
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-xs w-full group/card">
            <div
              className={cn(
                " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
                "bg-[url(https://theorbital.co.uk/wp-content/uploads/2022/05/old-books-scaled.jpg)] bg-cover"
              )}
            >
              <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
              <div className="flex flex-row items-center space-x-4 z-10">
                {/* Add Tabler Icon here */}
              </div>
              <div className="text content">
                <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                  Suggestive Transformation
                </h1>
                <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
                  Elevate question complexity with AI suggestions for higher
                  order thinking.
                </p>
              </div>
            </div>
          </div>
          <div className="max-w-xs w-full group/card">
            <div
              className={cn(
                " cursor-pointer overflow-hidden relative card h-96 rounded-md shadow-xl  max-w-sm mx-auto backgroundImage flex flex-col justify-between p-4",
                "bg-[url(https://www.shutterstock.com/image-vector/learn-online-book-digital-futuristic-600nw-2182663111.jpg)] bg-cover"
              )}
            >
              <div className="absolute w-full h-full top-0 left-0 transition duration-300 group-hover/card:bg-black opacity-60"></div>
              <div className="flex flex-row items-center space-x-4 z-10">
                {/* Add Tabler Icon here */}
              </div>
              <div className="text content">
                <h1 className="font-bold text-xl md:text-2xl text-gray-50 relative z-10">
                  Generative Wizardry
                </h1>
                <p className="font-normal text-sm text-gray-50 relative z-10 my-4">
                  Generate balanced question papers effortlessly based on
                  customizable parameters.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
          id="research"
          className="flex flex-col items-center lg:px-4 xs:h-[280px] md:h-[420px] lg:h-[500px] xl:h-[540px] bg-lightyellow"
        >
          <div className="xs:hidden md:block md:w-full lg:w-2/3 xl:w-1/2 px-3 bg-lightyellow rounded-xl">
            <TextGenerateEffect words={researchWords} />
          </div>
          <div className="md:hidden w-full px-3 py-2 text-justify bg-lightyellow rounded-xl">
            <p className="text-midnightAzure text-center text-2xl leading-snug tracking-wide font-inter font-normal">
              The development of Bloomify is supported by cutting-edge research
              conducted on educational taxonomies, large lanugage models, and
              generative AI.
            </p>
          </div>
        </section>
        {/* <section class="bg-lightyellow" id="github">
          <div class="py-8 px-4 mx-auto max-w-screen-md text-center lg:py-16 lg:px-12">
            <IconBrandGithub className="mx-auto mb-4 w-16 h-16 text-black" />
            <h1 class="mb-4 text-4xl font-inter font-semibold tracking-tight leading-none text-gray-900 lg:mb-6 md:text-5xl xl:text-6xl">
              We are open-source.
            </h1>
            <p class="font-light text-gray-500 md:text-lg xl:text-xl">
              All source code is available on{" "}
              <Link
                href="https://github.com/existence-master/bloomify"
                className="text-blue-400 underline hover:cursor-pointer"
              >
                GitHub.
              </Link>
            </p>
          </div>
        </section> */}

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
                      <Link href="/privacypolicy" className="hover:underline">
                        Privacy Policy
                      </Link>
                    </li>
                    <li className="mb-4">
                      <a
                        href="https://docs.google.com/document/d/12LOQu7OB10FRWwSIYJlkZQ-5xHi_rO59qkJyVKg5Oj4/edit?usp=sharing"
                        className="hover:underline"
                      >
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
                2024{" "}
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
