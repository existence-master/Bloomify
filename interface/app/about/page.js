import Link from "next/link";
import Image from "next/image";


const About = () => {
  return (
  <>
  <div className="bg-[#fffbe6]">
    <nav className="bg-transparent mb-20">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="navbarlogo.svg" className="h-8" alt="Bloomify Logo" width={183.37} height={45.91}/>
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-transparent">
            <li>
              <Link href="/" className="block py-2 px-3 font-bold text-black rounded md:bg-transparent md:p-0 dark:text-black " aria-current="page">Home</Link>
            </li>
            <li>
              <a href="#" className="block py-2 px-3 font-bold text-[#007991] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-[#007991] md:dark:hover:text-[#007991] dark:hover:text-white md:dark:hover:bg-transparent">About</a>
            </li>
            <li>
              <Link href="/contactus" className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991] dark:hover:text-white md:dark:hover:bg-transparent">Contact Us</Link>
            </li>
            <li>
              <Link href="/login" className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991] dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
            </li>
            <li>
              <Link href="/signup" className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991] dark:hover:text-white md:dark:hover:bg-transparent">Signup</Link>
            </li>
            <li>
              <Link href="https://github.com/existence-master/Bloomify/"><button type="button" className="text-white bg-black hover:bg-[#007991] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 -translate-y-1 focus:outline-none">GitHub</button></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <section className="max-w-full bg-transparent dark:bg-transparent py-12 z-0">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-4">
          <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
              <h2 className="text-xl self-center font-bold text-red-800 mb-4">Educational Assessment Redefined</h2>
              <p className="font-Poppins self-center content-center text-3xl text-gray-600 leading-relaxed mb-8">There are three main problems we address here. The first one is the case where universities work on Bloom's taxonomy basis for the syllabus but not for the question papers. The prevalent issue in many educational institutions, particularly in India and elsewhere, lies in the tendency to predominantly set exam questions at the lower levels of Bloom's Taxonomy. This practice restricts students to rote memorization and recall, discouraging deeper understanding, practical application, and critical thinking. The emphasis on low-level cognitive skills in exams fosters a culture where students prioritize memorization over grasping the practical utility of concepts. As a consequence, the educational system often falls short in nurturing holistic learning experiences that encourage analytical thinking, problem-solving, and the application of acquired knowledge in real-world scenarios.</p>
          </div>
      </div>
    </section>
    <footer className="footer-linear-bg">
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">
              <div className="mb-6 md:mb-0">
                <Image src="navbarlogo.svg" className="bg-white border-8 border-white rounded-xl" alt="Bloomify Logo" width={183.37} height={66.24}/>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                  <div>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                      <ul className="text-gray-500 dark:text-gray-400 font-medium">
                          <li className="mb-4">
                              <Link href="/" className="hover:underline">Bloomify</Link>
                          </li>
                          <li>
                              <a href="#" className="hover:underline">Existence Website</a>
                          </li>
                      </ul>
                  </div>
                  <div>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                      <ul className="text-gray-500 dark:text-gray-400 font-medium">
                          <li className="mb-4">
                              <Link href="https://github.com/existence-master/Bloomify" className="hover:underline ">Github</Link>
                          </li>
                          <li>
                              <Link href="https://www.linkedin.com/company/existence-3/" className="hover:underline ">LinkedIn</Link>
                          </li>
                      </ul>
                  </div>
                  <div>
                      <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                      <ul className="text-gray-500 dark:text-gray-400 font-medium">
                          <li className="mb-4">
                              <a href="#" className="hover:underline">Privacy Policy</a>
                          </li>
                          <li className="mb-4">
                              <a href="#" className="hover:underline">White Paper Link</a>
                          </li>
                          <li>
                              <a href="#" className="hover:underline">License</a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <hr className="my-6 border-white sm:mx-auto lg:my-8" />
          <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" className="hover:underline">Bloomify™</a>. All Rights Reserved.
              </span>
              <div className="flex mt-2 sm:justify-center sm:mt-0">
                  <span className="text-white translate-y-5">Powered by</span>
                  <a href="#" className="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                      <Image src="existence.svg" width={217} height={62} className = "rounded-xl"/>
                  </a>
              </div>
          </div>
        </div>
    </footer>
  </div>
  </>
  )
};

export default About;