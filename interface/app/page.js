import Link from "next/link";
import Image from "next/image";


const Home = () => {
  return (
  <>
  <div className="bg-[#fffbe6]">
    <nav className="bg-transparent mb-20">
      <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="navbarlogo.svg" className="h-8" alt="Bloomify Logo" width={183.37} height={45.91}/>
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-transparent">
            <li>
              <Link href="/" className="block py-2 px-3 font-bold text-[#007991] rounded md:bg-transparent md:p-0 dark:text-[#007991] " aria-current="page">Home</Link>
            </li>
            <li>
              <Link href="/about" className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</Link>
            </li>
            <li>
              <Link href="/contactus" className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Contact Us</Link>
            </li>
            <li>
              <Link href="/login" className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
            </li>
            <li>
              <Link href="/signup" className="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Signup</Link>
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
              <h2 className="text-xl font-bold text-red-800 mb-4">Educational Assessment Redefined</h2>
              <p className="font-Poppins text-3xl text-gray-600 leading-relaxed mb-8">An Open-Source <span className="font-bold text-[#007991]">Chatbot</span> Designed</p>
              <p className="font-Poppins text-3xl text-gray-600 leading-relaxed mb-8">To <span className="font-bold text-[#007991]">Revolutionize</span> The Assessment</p>
              <p className="font-Poppins text-3xl text-gray-600 leading-relaxed mb-20">Process In <span className="font-bold text-[#007991]">Educational</span> Institutes</p>
              <Link href="/signup"><button type="button" className="w-50 text-2xl ml-40 text-white font-semibold bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 rounded-lg px-5 py-2.5 text-center me-2 mb-2">Join Us</button></Link>
          </div>
          <div className="w-full md:w-1/2 relative">
              <Image src="bloomTriangle.svg" alt="Bloom's Taxonomy" className="max-w-full mx-auto relative translate-x-1/4  top-1/2 z-10" width={478.55} height={469.26}/>
              {/*<Image src="curvyrect.svg" alt="Curvy Rectangle" className="rect-65 z-0" width={1160} height={970}/>*/}
          </div>
      </div>
    </section>
    <section className="bg-transparent dark:bg-transparent py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-4">
          <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-[#007991] mb-8 ml-2">About Us</h2>
              <p className="footer-linear-bg rounded-xl p-8 leading-relaxed text-xl text-white justify-normal">Bloomify is an innovative educational tool designed to revolutionize the assessment process in academic institutions. It addresses the prevalent challenges of exam paper creation by leveraging Bloom's Taxonomy, a well-established framework for classNameifying cognitive skills. Bloomify aims to promote deeper understanding, critical thinking, and practical application of knowledge among students by ensuring that exam questions align with Bloom's Taxonomy levels. It was designed to counteract the dominance of rote learning in exams, encourage holistic learning experiences, and foster the development of essential skills necessary for success in the real world.</p>
          </div>
          <div className="vertical-line"></div>
          <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
              <h2 className="text-xl font-bold text-red-800 mb-4">FEATURES</h2>
              <p className="text-xl mb-2"><span className="font-bold">AI-Powered Question classNameification:</span> Instantly categorize questions into Bloom's Taxonomy levels.</p>
              <p className="text-xl mb-2"><span className="font-bold">Suggestive Transformation:</span> Elevate question complexity with AI-driven suggestions for higher-order thinking.</p>
              <p className="text-xl mb-2"><span className="font-bold">Paper Generation Wizardry:</span> Generate balanced question papers effortlessly based on customizable parameters.</p>
              <p className="text-xl mb-2"><span className="font-bold">Intuitive User Interface:</span> Seamlessly navigate and utilize Bloomify's powerful features with ease.</p>
              <p className="text-xl"><span className="font-bold">Customizable Syllabus Integration:</span> Easily adapt Bloomify to align with your institution's unique syllabus requirements.</p>
          </div>
      </div>
    </section>
    <section className="bg-transparent dark:bg-transparent py-12">
      <div className="container max-w-full mx-auto flex flex-col md:flex-row items-center justify-center sm:px-6 lg:px-4 gap-10">
          <div className="w-1/2 md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
              <p className="bg-[#007991] rounded-full p-10 leading-relaxed text-sm text-white justify-normal">From accurate question classification to dynamic suggestion and generation features driven by cutting-edge AI, Bloomify streamlines the assessment process, saving you time and promoting higher order thinking among students.</p>
          </div>
          <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
              <h2 className="text-3xl font-bold text-[#007991] mb-8 ml-2 self-center">Product VS Research</h2>
              <p className="bg-[#222E50] rounded-xl p-8 leading-relaxed text-xl text-white justify-normal">The development of Bloomify was driven by extensive research efforts aimed at addressing prevalent challenges in educational assessment. Leveraging insights from Bloom's Taxonomy, our research team embarked on a journey to revolutionize assessment practices through the integration of artificial intelligence. Through meticulous data collection, analysis, and experimentation with cutting-edge natural language processing techniques, we laid the foundation for Bloomify's advanced features. Our research endeavors were guided by a commitment to enhancing cognitive assessment, fostering critical thinking skills, and promoting practical application of knowledge. The resulting product, Bloomify, represents the culmination of our research efforts, offering educators a powerful tool to create balanced question papers aligned with Bloom's Taxonomy effortless.</p>
          </div>
          <div className="w-1/2 md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
              <p className="bg-[#007991] rounded-full p-10 leading-relaxed text-sm text-white justify-normal">Revolutionize your assessment practices with Bloomify – the all-in-one platform empowering educators to effortlessly create balanced exam papers aligned with Bloom's Taxonomy.</p>
          </div>
      </div>
    </section>
    <hr className="my-6 border-[#222E50] border-8 sm:mx-auto lg:my-8 mb-2" />
    <hr className="my-6 border-[#007991] border-8 sm:mx-auto lg:my-8 mt-2" />
    <section className="bg-transparent dark:bg-transparent py-12">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-4">
          <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
              <h2 className="text-4xl font-bold text-[#222E50] mb-20 ml-2 self-center font-sans">We are open-source!</h2>
              <Link href="https://github.com/existence-master/Bloomify/" className="rounded-xl bg-gray-200 p-4 text-3xl font-normal text-black mb-8 ml-2 self-center mt-15">https://github.com/existence-master/Bloomify/</Link>              
              <h2 className="text-2xl text-[#222E50] mb-20 ml-2 self-center font-sans">Explore the GitHub Repository</h2>
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
}

export default Home