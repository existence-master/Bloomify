import Link from "next/link";
import Image from "next/image";


const ContactUs = () => {
  return (
  <>
  <div className="bg-[#fffbe6]">
    <nav class="bg-transparent">
      <div class="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" class="flex items-center space-x-3 rtl:space-x-reverse">
            <Image src="navbarlogo.svg" class="h-8" alt="Bloomify Logo" width={183.37} height={45.91}/>
        </Link>
        <button data-collapse-toggle="navbar-default" type="button" class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div class="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul class="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-transparent">
            <li>
              <Link href="/" class="block py-2 px-3 font-bold text-black rounded md:bg-transparent md:p-0" aria-current="page">Home</Link>
            </li>
            <li>
              <Link href="/about" class="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">About</Link>
            </li>
            <li>
              <a href="#" class="block py-2 px-3 font-bold text-[#007991] rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:p-0 dark:text-[#007991] bg-transparent">Contact Us</a>
            </li>
            <li>
              <Link href="/login" class="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
            </li>
            <li>
              <Link href="/signup" class="block py-2 px-3 font-bold text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#007991] md:p-0 dark:text-black md:dark:hover:text-[#007991] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Signup</Link>
            </li>
            <li>
              <Link href="https://github.com/existence-master/Bloomify/"><button type="button" class="text-white bg-black hover:bg-[#007991] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 -translate-y-1 focus:outline-none">GitHub</button></Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <section class="bg-transparent">
        <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div class="w-full bg-[#007991] rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
                <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Leave your feedback here!
                    </h1>
                    <form class="space-y-4 md:space-y-6" method="post" action="{{ url_for('submit_feedback') }}">
                        <div>
                            <label for="email" class="block mb-2 text-sm font-medium text-white">Your email</label>
                            <input type="email" name="email" id="email" class="bg-[#fffbe6] border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required="" />
                        </div>
                        <label for="message" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your message</label>
                        <textarea id="message" name="message" rows="4" class="block p-2.5 w-full text-sm text-gray-900 bg-[#fffbe6] rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500" placeholder="Leave a comment..." required=""></textarea>                
                        <button type="button" class="w-full text-white bg-[#222E50] focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 -translate-y-1 focus:outline-none">Submit</button>
                    </form>                
                </div>
            </div>
        </div>
    </section>
    <footer class="footer-linear-bg">
        <div class="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div class="md:flex md:justify-between">
              <div class="mb-6 md:mb-0">
                <Image src="navbarlogo.svg" class="bg-white border-8 border-white rounded-xl" alt="Bloomify Logo" width={183.37} height={66.24}/>
              </div>
              <div class="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                  <div>
                      <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
                      <ul class="text-gray-500 dark:text-gray-400 font-medium">
                          <li class="mb-4">
                              <Link href="/" class="hover:underline">Bloomify</Link>
                          </li>
                          <li>
                              <a href="#" class="hover:underline">Existence Website</a>
                          </li>
                      </ul>
                  </div>
                  <div>
                      <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                      <ul class="text-gray-500 dark:text-gray-400 font-medium">
                          <li class="mb-4">
                              <Link href="https://github.com/existence-master/Bloomify" class="hover:underline ">Github</Link>
                          </li>
                          <li>
                              <Link href="https://www.linkedin.com/company/existence-3/" class="hover:underline ">LinkedIn</Link>
                          </li>
                      </ul>
                  </div>
                  <div>
                      <h2 class="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
                      <ul class="text-gray-500 dark:text-gray-400 font-medium">
                          <li class="mb-4">
                              <a href="#" class="hover:underline">Privacy Policy</a>
                          </li>
                          <li class="mb-4">
                              <a href="#" class="hover:underline">White Paper Link</a>
                          </li>
                          <li>
                              <a href="#" class="hover:underline">License</a>
                          </li>
                      </ul>
                  </div>
              </div>
          </div>
          <hr class="my-6 border-white sm:mx-auto lg:my-8" />
          <div class="sm:flex sm:items-center sm:justify-between">
              <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2024 <a href="#" class="hover:underline">Bloomify™</a>. All Rights Reserved.
              </span>
              <div class="flex mt-2 sm:justify-center sm:mt-0">
                  <span class="text-white translate-y-5">Powered by</span>
                  <a href="#" class="text-gray-500 hover:text-gray-900 dark:hover:text-white ms-5">
                      <Image src="existence.svg" width={217} height={62} class = "rounded-xl"/>
                  </a>
              </div>
          </div>
        </div>
    </footer>
  </div>
  </>
  )
};

export default ContactUs;