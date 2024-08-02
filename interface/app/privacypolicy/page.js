"use client"; // Indicates that this component runs on the client-side in Next.js

import Link from "next/link"; // Next.js component for client-side navigation
import Image from "next/image"; // Next.js optimized image component
import { useState, useEffect, useRef } from "react"; // React hooks for state management and side effects

const Privacy = () => {
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
        <nav className="bg-transparent mb-20">
          {/* Transparent background and margin-bottom */}
          <div className="max-w-screen-2xl flex flex-wrap items-center justify-between mx-auto p-4">
            {/* Flex layout for navigation */}
            <Link
              href="/"
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              {/* Link to the home page */}
              <Image
                src="navbarlogo.svg"
                className="h-8"
                alt="Bloomify Logo"
                width={183.37}
                height={45.91}
              />
              {/* Logo image */}
            </Link>
            {/* Mobile navbar section */}
            <div ref={dropdownRef}>
              {/* Reference for the dropdown */}
              <button
                onClick={toggleMenu} // Toggle the menu on click
                type="button"
                className="inline-flex mr-2 items-center bg-transparent p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden focus:outline-none" // Styling
                aria-controls="navbar-default"
                aria-expanded={isOpen ? "true" : "false"} // Accessibility attributes
              >
                <span className="sr-only">Open main menu</span>
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
                  {/* Styling for the dropdown */}
                  <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-transparent">
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
                  </ul>
                  {/* End of dropdown menu items */}
                </div>
              )}
            </div>
            {/* End of dropdown section */}
            {/* Default desktop navbar */}
            <div
              className="hidden w-full md:block md:w-auto"
              id="navbar-default"
            >
              {/* Navbar for larger screens */}
              <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-transparent dark:bg-transparent md:dark:bg-transparent dark:border-transparent">
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
                    </button>
                  </Link>
                </li>
              </ul>
              {/* End of desktop navbar menu items */}
            </div>
            {/* End of default desktop navbar */}
          </div>
          {/* End of navigation bar container */}
        </nav>
        {/* End of navigation bar */}
        {/* Content for larger screens */}
        <div className="xs:max-md:hidden">
          {/* Hide on smaller screens */}
          <section className="max-w-full bg-transparent dark:bg-transparent py-12 z-0 text-justify">
            {/* Section styling */}
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-4">
              {/* Flex layout */}
              <div className="w-full md:w-1/2 md:pr-8 flex flex-col items-center md:items-start mb-8 md:mb-0">
                {/* Content for larger screens */}
                <h2 className="text-xl self-center font-bold text-red-800 mb-4">
                  Privacy Policy
                </h2>
                {/* Section heading */}
                <p className="font-Poppins self-center content-center text-xl text-gray-600 leading-relaxed mb-8">
                  {/* Content description */}
                  <p>Last updated: May 11, 2024</p>
                  <p>
                    This Privacy Policy describes Our policies and procedures on
                    the collection, use and disclosure of Your information when
                    You use the Service and tells You about Your privacy rights
                    and how the law protects You.
                  </p>
                  <p>
                    We use Your Personal data to provide and improve the
                    Service. By using the Service, You agree to the collection
                    and use of information in accordance with this Privacy
                    Policy.
                  </p>
                  <h2>Interpretation and Definitions</h2>
                  <h3>Interpretation</h3>
                  <p>
                    The words of which the initial letter is capitalized have
                    meanings defined under the following conditions. The
                    following definitions shall have the same meaning regardless
                    of whether they appear in singular or in plural.
                  </p>
                  <h3>Definitions</h3>
                  <p>For the purposes of this Privacy Policy:</p>
                  <ul>
                    <li>
                      <p>
                        <strong>Account</strong> means a unique account created
                        for You to access our Service or parts of our Service.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Affiliate</strong> means an entity that
                        controls, is controlled by or is under common control
                        with a party, where &quot;control&quot; means ownership
                        of 50% or more of the shares, equity interest or other
                        securities entitled to vote for election of directors or
                        other managing authority.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Company</strong> (referred to as either
                        &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot;
                        or &quot;Our&quot; in this Agreement) refers to
                        Existence, Pune Vidyarthi Griha's College of Engineering
                        and Technology, Sahakar Nagar, Parvati, Pune.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Cookies</strong> are small files that are placed
                        on Your computer, mobile device or any other device by a
                        website, containing the details of Your browsing history
                        on that website among its many uses.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Country</strong> refers to: Maharashtra, India
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Device</strong> means any device that can access
                        the Service such as a computer, a cellphone or a digital
                        tablet.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Personal Data</strong> is any information that
                        relates to an identified or identifiable individual.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Service</strong> refers to the Website.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Service Provider</strong> means any natural or
                        legal person who processes the data on behalf of the
                        Company. It refers to third-party companies or
                        individuals employed by the Company to facilitate the
                        Service, to provide the Service on behalf of the
                        Company, to perform services related to the Service or
                        to assist the Company in analyzing how the Service is
                        used.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Third-party Social Media Service</strong> refers
                        to any website or any social network website through
                        which a User can log in or create an account to use the
                        Service.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Usage Data</strong> refers to data collected
                        automatically, either generated by the use of the
                        Service or from the Service infrastructure itself (for
                        example, the duration of a page visit).
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Website</strong> refers to Bloomify, accessible
                        from{" "}
                        <a
                          href="https://www.bloomify.com"
                          rel="external nofollow noopener"
                          target="_blank"
                        >
                          https://www.bloomify.com
                        </a>
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>You</strong> means the individual accessing or
                        using the Service, or the company, or other legal entity
                        on behalf of which such individual is accessing or using
                        the Service, as applicable.
                      </p>
                    </li>
                  </ul>
                  <h2>Collecting and Using Your Personal Data</h2>
                  <h3>Types of Data Collected</h3>
                  <h4>Personal Data</h4>
                  <p>
                    While using Our Service, We may ask You to provide Us with
                    certain personally identifiable information that can be used
                    to contact or identify You. Personally identifiable
                    information may include, but is not limited to:
                  </p>
                  <ul>
                    <li>
                      <p>Email address</p>
                    </li>
                    <li>
                      <p>First name and last name</p>
                    </li>
                    <li>
                      <p>Usage Data</p>
                    </li>
                  </ul>
                  <h4>Usage Data</h4>
                  <p>
                    Usage Data is collected automatically when using the
                    Service.
                  </p>
                  <p>
                    Usage Data may include information such as Your Device's
                    Internet Protocol address (e.g. IP address), browser type,
                    browser version, the pages of our Service that You visit,
                    the time and date of Your visit, the time spent on those
                    pages, unique device identifiers and other diagnostic data.
                  </p>
                  <p>
                    When You access the Service by or through a mobile device,
                    We may collect certain information automatically, including,
                    but not limited to, the type of mobile device You use, Your
                    mobile device unique ID, the IP address of Your mobile
                    device, Your mobile operating system, the type of mobile
                    Internet browser You use, unique device identifiers and
                    other diagnostic data.
                  </p>
                  <p>
                    We may also collect information that Your browser sends
                    whenever You visit our Service or when You access the
                    Service by or through a mobile device.
                  </p>
                  <h4>Information from Third-Party Social Media Services</h4>
                  <p>
                    The Company allows You to create an account and log in to
                    use the Service through the following Third-party Social
                    Media Services:
                  </p>
                  <ul>
                    <li>Google</li>
                  </ul>
                  <p>
                    If You decide to register through or otherwise grant us
                    access to a Third-Party Social Media Service, We may collect
                    Personal data that is already associated with Your
                    Third-Party Social Media Service's account, such as Your
                    name, Your email address, Your activities or Your contact
                    list associated with that account.
                  </p>
                  <p>
                    You may also have the option of sharing additional
                    information with the Company through Your Third-Party Social
                    Media Service's account. If You choose to provide such
                    information and Personal Data, during registration or
                    otherwise, You are giving the Company permission to use,
                    share, and store it in a manner consistent with this Privacy
                    Policy.
                  </p>
                  <h4>Tracking Technologies and Cookies</h4>
                  <p>
                    We use Cookies and similar tracking technologies to track
                    the activity on Our Service and store certain information.
                    Tracking technologies used are beacons, tags, and scripts to
                    collect and track information and to improve and analyze Our
                    Service. The technologies We use may include:
                  </p>
                  <ul>
                    <li>
                      <strong>Cookies or Browser Cookies.</strong> A cookie is a
                      small file placed on Your Device. You can instruct Your
                      browser to refuse all Cookies or to indicate when a Cookie
                      is being sent. However, if You do not accept Cookies, You
                      may not be able to use some parts of our Service. Unless
                      you have adjusted Your browser setting so that it will
                      refuse Cookies, our Service may use Cookies.
                    </li>
                    <li>
                      <strong>Web Beacons.</strong> Certain sections of our
                      Service and our emails may contain small electronic files
                      known as web beacons (also referred to as clear gifs,
                      pixel tags, and single-pixel gifs) that permit the
                      Company, for example, to count users who have visited
                      those pages or opened an email and for other related
                      website statistics (for example, recording the popularity
                      of a certain section and verifying system and server
                      integrity).
                    </li>
                  </ul>
                  <p>
                    Cookies can be &quot;Persistent&quot; or &quot;Session&quot;
                    Cookies. Persistent Cookies remain on Your personal computer
                    or mobile device when You go offline, while Session Cookies
                    are deleted as soon as You close Your web browser. You can
                    learn more about cookies on{" "}
                    <a
                      href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies"
                      target="_blank"
                    >
                      TermsFeed website
                    </a>{" "}
                    article.
                  </p>
                  <p>
                    We use both Session and Persistent Cookies for the purposes
                    set out below:
                  </p>
                  <ul>
                    <li>
                      <p>
                        <strong>Necessary / Essential Cookies</strong>
                      </p>
                      <p>Type: Session Cookies</p>
                      <p>Administered by: Us</p>
                      <p>
                        Purpose: These Cookies are essential to provide You with
                        services available through the Website and to enable You
                        to use some of its features. They help to authenticate
                        users and prevent fraudulent use of user accounts.
                        Without these Cookies, the services that You have asked
                        for cannot be provided, and We only use these Cookies to
                        provide You with those services.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>
                          Cookies Policy / Notice Acceptance Cookies
                        </strong>
                      </p>
                      <p>Type: Persistent Cookies</p>
                      <p>Administered by: Us</p>
                      <p>
                        Purpose: These Cookies identify if users have accepted
                        the use of cookies on the Website.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Functionality Cookies</strong>
                      </p>
                      <p>Type: Persistent Cookies</p>
                      <p>Administered by: Us</p>
                      <p>
                        Purpose: These Cookies allow us to remember choices You
                        make when You use the Website, such as remembering your
                        login details or language preference. The purpose of
                        these Cookies is to provide You with a more personal
                        experience and to avoid You having to re-enter your
                        preferences every time You use the Website.
                      </p>
                    </li>
                  </ul>
                  <p>
                    For more information about the cookies we use and your
                    choices regarding cookies, please visit our Cookies Policy
                    or the Cookies section of our Privacy Policy.
                  </p>
                  <h3>Use of Your Personal Data</h3>
                  <p>
                    The Company may use Personal Data for the following
                    purposes:
                  </p>
                  <ul>
                    <li>
                      <p>
                        <strong>To provide and maintain our Service</strong>,
                        including to monitor the usage of our Service.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>To manage Your Account:</strong> to manage Your
                        registration as a user of the Service. The Personal Data
                        You provide can give You access to different
                        functionalities of the Service that are available to You
                        as a registered user.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>For the performance of a contract:</strong> the
                        development, compliance and undertaking of the purchase
                        contract for the products, items or services You have
                        purchased or of any other contract with Us through the
                        Service.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>To contact You:</strong> To contact You by
                        email, telephone calls, SMS, or other equivalent forms
                        of electronic communication, such as a mobile
                        application's push notifications regarding updates or
                        informative communications related to the
                        functionalities, products or contracted services,
                        including the security updates, when necessary or
                        reasonable for their implementation.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>To provide You</strong> with news, special
                        offers and general information about other goods,
                        services and events which we offer that are similar to
                        those that you have already purchased or enquired about
                        unless You have opted not to receive such information.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>To manage Your requests:</strong> To attend and
                        manage Your requests to Us.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>For business transfers:</strong> We may use Your
                        information to evaluate or conduct a merger,
                        divestiture, restructuring, reorganization, dissolution,
                        or other sale or transfer of some or all of Our assets,
                        whether as a going concern or as part of bankruptcy,
                        liquidation, or similar proceeding, in which Personal
                        Data held by Us about our Service users is among the
                        assets transferred.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>For other purposes</strong>: We may use Your
                        information for other purposes, such as data analysis,
                        identifying usage trends, determining the effectiveness
                        of our promotional campaigns and to evaluate and improve
                        our Service, products, services, marketing and your
                        experience.
                      </p>
                    </li>
                  </ul>
                  <p>
                    We may share Your personal information in the following
                    situations:
                  </p>
                  <ul>
                    <li>
                      <strong>With Service Providers:</strong> We may share Your
                      personal information with Service Providers to monitor and
                      analyze the use of our Service, to contact You.
                    </li>
                    <li>
                      <strong>For business transfers:</strong> We may share or
                      transfer Your personal information in connection with, or
                      during negotiations of, any merger, sale of Company
                      assets, financing, or acquisition of all or a portion of
                      Our business to another company.
                    </li>
                    <li>
                      <strong>With Affiliates:</strong> We may share Your
                      information with Our affiliates, in which case we will
                      require those affiliates to honor this Privacy Policy.
                      Affiliates include Our parent company and any other
                      subsidiaries, joint venture partners or other companies
                      that We control or that are under common control with Us.
                    </li>
                    <li>
                      <strong>With business partners:</strong> We may share Your
                      information with Our business partners to offer You
                      certain products, services or promotions.
                    </li>
                    <li>
                      <strong>With other users:</strong> when You share personal
                      information or otherwise interact in the public areas with
                      other users, such information may be viewed by all users
                      and may be publicly distributed outside. If You interact
                      with other users or register through a Third-Party Social
                      Media Service, Your contacts on the Third-Party Social
                      Media Service may see Your name, profile, pictures and
                      description of Your activity. Similarly, other users will
                      be able to view descriptions of Your activity, communicate
                      with You and view Your profile.
                    </li>
                    <li>
                      <strong>With Your consent</strong>: We may disclose Your
                      personal information for any other purpose with Your
                      consent.
                    </li>
                  </ul>
                  <h3>Retention of Your Personal Data</h3>
                  <p>
                    The Company will retain Your Personal Data only for as long
                    as is necessary for the purposes set out in this Privacy
                    Policy. We will retain and use Your Personal Data to the
                    extent necessary to comply with our legal obligations (for
                    example, if we are required to retain your data to comply
                    with applicable laws), resolve disputes, and enforce our
                    legal agreements and policies.
                  </p>
                  <p>
                    The Company will also retain Usage Data for internal
                    analysis purposes. Usage Data is generally retained for a
                    shorter period of time, except when this data is used to
                    strengthen the security or to improve the functionality of
                    Our Service, or We are legally obligated to retain this data
                    for longer time periods.
                  </p>
                  <h3>Transfer of Your Personal Data</h3>
                  <p>
                    Your information, including Personal Data, is processed at
                    the Company's operating offices and in any other places
                    where the parties involved in the processing are located. It
                    means that this information may be transferred to — and
                    maintained on — computers located outside of Your state,
                    province, country or other governmental jurisdiction where
                    the data protection laws may differ than those from Your
                    jurisdiction.
                  </p>
                  <p>
                    Your consent to this Privacy Policy followed by Your
                    submission of such information represents Your agreement to
                    that transfer.
                  </p>
                  <p>
                    The Company will take all steps reasonably necessary to
                    ensure that Your data is treated securely and in accordance
                    with this Privacy Policy and no transfer of Your Personal
                    Data will take place to an organization or a country unless
                    there are adequate controls in place including the security
                    of Your data and other personal information.
                  </p>
                  <h3>Delete Your Personal Data</h3>
                  <p>
                    You have the right to delete or request that We assist in
                    deleting the Personal Data that We have collected about You.
                  </p>
                  <p>
                    Our Service may give You the ability to delete certain
                    information about You from within the Service.
                  </p>
                  <p>
                    You may update, amend, or delete Your information at any
                    time by signing in to Your Account, if you have one, and
                    visiting the account settings section that allows you to
                    manage Your personal information. You may also contact Us to
                    request access to, correct, or delete any personal
                    information that You have provided to Us.
                  </p>
                  <p>
                    Please note, however, that We may need to retain certain
                    information when we have a legal obligation or lawful basis
                    to do so.
                  </p>
                  <h3>Disclosure of Your Personal Data</h3>
                  <h4>Business Transactions</h4>
                  <p>
                    If the Company is involved in a merger, acquisition or asset
                    sale, Your Personal Data may be transferred. We will provide
                    notice before Your Personal Data is transferred and becomes
                    subject to a different Privacy Policy.
                  </p>
                  <h4>Law enforcement</h4>
                  <p>
                    Under certain circumstances, the Company may be required to
                    disclose Your Personal Data if required to do so by law or
                    in response to valid requests by public authorities (e.g. a
                    court or a government agency).
                  </p>
                  <h4>Other legal requirements</h4>
                  <p>
                    The Company may disclose Your Personal Data in the good
                    faith belief that such action is necessary to:
                  </p>
                  <ul>
                    <li>Comply with a legal obligation</li>
                    <li>
                      Protect and defend the rights or property of the Company
                    </li>
                    <li>
                      Prevent or investigate possible wrongdoing in connection
                      with the Service
                    </li>
                    <li>
                      Protect the personal safety of Users of the Service or the
                      public
                    </li>
                    <li>Protect against legal liability</li>
                  </ul>
                  <h3>Security of Your Personal Data</h3>
                  <p>
                    The security of Your Personal Data is important to Us, but
                    remember that no method of transmission over the Internet,
                    or method of electronic storage is 100% secure. While We
                    strive to use commercially acceptable means to protect Your
                    Personal Data, We cannot guarantee its absolute security.
                  </p>
                  <h2>Children's Privacy</h2>
                  <p>
                    Our Service does not address anyone under the age of 13. We
                    do not knowingly collect personally identifiable information
                    from anyone under the age of 13. If You are a parent or
                    guardian and You are aware that Your child has provided Us
                    with Personal Data, please contact Us. If We become aware
                    that We have collected Personal Data from anyone under the
                    age of 13 without verification of parental consent, We take
                    steps to remove that information from Our servers.
                  </p>
                  <p>
                    If We need to rely on consent as a legal basis for
                    processing Your information and Your country requires
                    consent from a parent, We may require Your parent's consent
                    before We collect and use that information.
                  </p>
                  <h2>Links to Other Websites</h2>
                  <p>
                    Our Service may contain links to other websites that are not
                    operated by Us. If You click on a third party link, You will
                    be directed to that third party's site. We strongly advise
                    You to review the Privacy Policy of every site You visit.
                  </p>
                  <p>
                    We have no control over and assume no responsibility for the
                    content, privacy policies or practices of any third party
                    sites or services.
                  </p>
                  <h2>Changes to this Privacy Policy</h2>
                  <p>
                    We may update Our Privacy Policy from time to time. We will
                    notify You of any changes by posting the new Privacy Policy
                    on this page.
                  </p>
                  <p>
                    We will let You know via email and/or a prominent notice on
                    Our Service, prior to the change becoming effective and
                    update the &quot;Last updated&quot; date at the top of this
                    Privacy Policy.
                  </p>
                  <p>
                    You are advised to review this Privacy Policy periodically
                    for any changes. Changes to this Privacy Policy are
                    effective when they are posted on this page.
                  </p>
                  <h2>Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, You can
                    contact us:
                  </p>
                  <ul>
                    <li>By email: existence.bloomify@gmail.com</li>
                  </ul>
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
                  Privacy Policy
                </h2>
                {/* Section heading */}
                <p className="font-Poppins self-center content-center text-sm text-center text-gray-600 leading-relaxed mb-8">
                  {/* Content description */}
                  <p>Last updated: May 11, 2024</p>
                  <p>
                    This Privacy Policy describes Our policies and procedures on
                    the collection, use and disclosure of Your information when
                    You use the Service and tells You about Your privacy rights
                    and how the law protects You.
                  </p>
                  <p>
                    We use Your Personal data to provide and improve the
                    Service. By using the Service, You agree to the collection
                    and use of information in accordance with this Privacy
                    Policy.
                  </p>
                  <h2>Interpretation and Definitions</h2>
                  <h3>Interpretation</h3>
                  <p>
                    The words of which the initial letter is capitalized have
                    meanings defined under the following conditions. The
                    following definitions shall have the same meaning regardless
                    of whether they appear in singular or in plural.
                  </p>
                  <h3>Definitions</h3>
                  <p>For the purposes of this Privacy Policy:</p>
                  <ul>
                    <li>
                      <p>
                        <strong>Account</strong> means a unique account created
                        for You to access our Service or parts of our Service.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Affiliate</strong> means an entity that
                        controls, is controlled by or is under common control
                        with a party, where &quot;control&quot; means ownership
                        of 50% or more of the shares, equity interest or other
                        securities entitled to vote for election of directors or
                        other managing authority.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Company</strong> (referred to as either
                        &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot;
                        or &quot;Our&quot; in this Agreement) refers to
                        Existence, Pune Vidyarthi Griha's College of Engineering
                        and Technology, Sahakar Nagar, Parvati, Pune.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Cookies</strong> are small files that are placed
                        on Your computer, mobile device or any other device by a
                        website, containing the details of Your browsing history
                        on that website among its many uses.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Country</strong> refers to: Maharashtra, India
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Device</strong> means any device that can access
                        the Service such as a computer, a cellphone or a digital
                        tablet.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Personal Data</strong> is any information that
                        relates to an identified or identifiable individual.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Service</strong> refers to the Website.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Service Provider</strong> means any natural or
                        legal person who processes the data on behalf of the
                        Company. It refers to third-party companies or
                        individuals employed by the Company to facilitate the
                        Service, to provide the Service on behalf of the
                        Company, to perform services related to the Service or
                        to assist the Company in analyzing how the Service is
                        used.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Third-party Social Media Service</strong> refers
                        to any website or any social network website through
                        which a User can log in or create an account to use the
                        Service.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Usage Data</strong> refers to data collected
                        automatically, either generated by the use of the
                        Service or from the Service infrastructure itself (for
                        example, the duration of a page visit).
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Website</strong> refers to Bloomify, accessible
                        from{" "}
                        <a
                          href="https://www.bloomify.com"
                          rel="external nofollow noopener"
                          target="_blank"
                        >
                          https://www.bloomify.com
                        </a>
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>You</strong> means the individual accessing or
                        using the Service, or the company, or other legal entity
                        on behalf of which such individual is accessing or using
                        the Service, as applicable.
                      </p>
                    </li>
                  </ul>
                  <h2>Collecting and Using Your Personal Data</h2>
                  <h3>Types of Data Collected</h3>
                  <h4>Personal Data</h4>
                  <p>
                    While using Our Service, We may ask You to provide Us with
                    certain personally identifiable information that can be used
                    to contact or identify You. Personally identifiable
                    information may include, but is not limited to:
                  </p>
                  <ul>
                    <li>
                      <p>Email address</p>
                    </li>
                    <li>
                      <p>First name and last name</p>
                    </li>
                    <li>
                      <p>Usage Data</p>
                    </li>
                  </ul>
                  <h4>Usage Data</h4>
                  <p>
                    Usage Data is collected automatically when using the
                    Service.
                  </p>
                  <p>
                    Usage Data may include information such as Your Device's
                    Internet Protocol address (e.g. IP address), browser type,
                    browser version, the pages of our Service that You visit,
                    the time and date of Your visit, the time spent on those
                    pages, unique device identifiers and other diagnostic data.
                  </p>
                  <p>
                    When You access the Service by or through a mobile device,
                    We may collect certain information automatically, including,
                    but not limited to, the type of mobile device You use, Your
                    mobile device unique ID, the IP address of Your mobile
                    device, Your mobile operating system, the type of mobile
                    Internet browser You use, unique device identifiers and
                    other diagnostic data.
                  </p>
                  <p>
                    We may also collect information that Your browser sends
                    whenever You visit our Service or when You access the
                    Service by or through a mobile device.
                  </p>
                  <h4>Information from Third-Party Social Media Services</h4>
                  <p>
                    The Company allows You to create an account and log in to
                    use the Service through the following Third-party Social
                    Media Services:
                  </p>
                  <ul>
                    <li>Google</li>
                  </ul>
                  <p>
                    If You decide to register through or otherwise grant us
                    access to a Third-Party Social Media Service, We may collect
                    Personal data that is already associated with Your
                    Third-Party Social Media Service's account, such as Your
                    name, Your email address, Your activities or Your contact
                    list associated with that account.
                  </p>
                  <p>
                    You may also have the option of sharing additional
                    information with the Company through Your Third-Party Social
                    Media Service's account. If You choose to provide such
                    information and Personal Data, during registration or
                    otherwise, You are giving the Company permission to use,
                    share, and store it in a manner consistent with this Privacy
                    Policy.
                  </p>
                  <h4>Tracking Technologies and Cookies</h4>
                  <p>
                    We use Cookies and similar tracking technologies to track
                    the activity on Our Service and store certain information.
                    Tracking technologies used are beacons, tags, and scripts to
                    collect and track information and to improve and analyze Our
                    Service. The technologies We use may include:
                  </p>
                  <ul>
                    <li>
                      <strong>Cookies or Browser Cookies.</strong> A cookie is a
                      small file placed on Your Device. You can instruct Your
                      browser to refuse all Cookies or to indicate when a Cookie
                      is being sent. However, if You do not accept Cookies, You
                      may not be able to use some parts of our Service. Unless
                      you have adjusted Your browser setting so that it will
                      refuse Cookies, our Service may use Cookies.
                    </li>
                    <li>
                      <strong>Web Beacons.</strong> Certain sections of our
                      Service and our emails may contain small electronic files
                      known as web beacons (also referred to as clear gifs,
                      pixel tags, and single-pixel gifs) that permit the
                      Company, for example, to count users who have visited
                      those pages or opened an email and for other related
                      website statistics (for example, recording the popularity
                      of a certain section and verifying system and server
                      integrity).
                    </li>
                  </ul>
                  <p>
                    Cookies can be &quot;Persistent&quot; or &quot;Session&quot;
                    Cookies. Persistent Cookies remain on Your personal computer
                    or mobile device when You go offline, while Session Cookies
                    are deleted as soon as You close Your web browser. You can
                    learn more about cookies on{" "}
                    <a
                      href="https://www.termsfeed.com/blog/cookies/#What_Are_Cookies"
                      target="_blank"
                    >
                      TermsFeed website
                    </a>{" "}
                    article.
                  </p>
                  <p>
                    We use both Session and Persistent Cookies for the purposes
                    set out below:
                  </p>
                  <ul>
                    <li>
                      <p>
                        <strong>Necessary / Essential Cookies</strong>
                      </p>
                      <p>Type: Session Cookies</p>
                      <p>Administered by: Us</p>
                      <p>
                        Purpose: These Cookies are essential to provide You with
                        services available through the Website and to enable You
                        to use some of its features. They help to authenticate
                        users and prevent fraudulent use of user accounts.
                        Without these Cookies, the services that You have asked
                        for cannot be provided, and We only use these Cookies to
                        provide You with those services.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>
                          Cookies Policy / Notice Acceptance Cookies
                        </strong>
                      </p>
                      <p>Type: Persistent Cookies</p>
                      <p>Administered by: Us</p>
                      <p>
                        Purpose: These Cookies identify if users have accepted
                        the use of cookies on the Website.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>Functionality Cookies</strong>
                      </p>
                      <p>Type: Persistent Cookies</p>
                      <p>Administered by: Us</p>
                      <p>
                        Purpose: These Cookies allow us to remember choices You
                        make when You use the Website, such as remembering your
                        login details or language preference. The purpose of
                        these Cookies is to provide You with a more personal
                        experience and to avoid You having to re-enter your
                        preferences every time You use the Website.
                      </p>
                    </li>
                  </ul>
                  <p>
                    For more information about the cookies we use and your
                    choices regarding cookies, please visit our Cookies Policy
                    or the Cookies section of our Privacy Policy.
                  </p>
                  <h3>Use of Your Personal Data</h3>
                  <p>
                    The Company may use Personal Data for the following
                    purposes:
                  </p>
                  <ul>
                    <li>
                      <p>
                        <strong>To provide and maintain our Service</strong>,
                        including to monitor the usage of our Service.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>To manage Your Account:</strong> to manage Your
                        registration as a user of the Service. The Personal Data
                        You provide can give You access to different
                        functionalities of the Service that are available to You
                        as a registered user.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>For the performance of a contract:</strong> the
                        development, compliance and undertaking of the purchase
                        contract for the products, items or services You have
                        purchased or of any other contract with Us through the
                        Service.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>To contact You:</strong> To contact You by
                        email, telephone calls, SMS, or other equivalent forms
                        of electronic communication, such as a mobile
                        application's push notifications regarding updates or
                        informative communications related to the
                        functionalities, products or contracted services,
                        including the security updates, when necessary or
                        reasonable for their implementation.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>To provide You</strong> with news, special
                        offers and general information about other goods,
                        services and events which we offer that are similar to
                        those that you have already purchased or enquired about
                        unless You have opted not to receive such information.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>To manage Your requests:</strong> To attend and
                        manage Your requests to Us.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>For business transfers:</strong> We may use Your
                        information to evaluate or conduct a merger,
                        divestiture, restructuring, reorganization, dissolution,
                        or other sale or transfer of some or all of Our assets,
                        whether as a going concern or as part of bankruptcy,
                        liquidation, or similar proceeding, in which Personal
                        Data held by Us about our Service users is among the
                        assets transferred.
                      </p>
                    </li>
                    <li>
                      <p>
                        <strong>For other purposes</strong>: We may use Your
                        information for other purposes, such as data analysis,
                        identifying usage trends, determining the effectiveness
                        of our promotional campaigns and to evaluate and improve
                        our Service, products, services, marketing and your
                        experience.
                      </p>
                    </li>
                  </ul>
                  <p>
                    We may share Your personal information in the following
                    situations:
                  </p>
                  <ul>
                    <li>
                      <strong>With Service Providers:</strong> We may share Your
                      personal information with Service Providers to monitor and
                      analyze the use of our Service, to contact You.
                    </li>
                    <li>
                      <strong>For business transfers:</strong> We may share or
                      transfer Your personal information in connection with, or
                      during negotiations of, any merger, sale of Company
                      assets, financing, or acquisition of all or a portion of
                      Our business to another company.
                    </li>
                    <li>
                      <strong>With Affiliates:</strong> We may share Your
                      information with Our affiliates, in which case we will
                      require those affiliates to honor this Privacy Policy.
                      Affiliates include Our parent company and any other
                      subsidiaries, joint venture partners or other companies
                      that We control or that are under common control with Us.
                    </li>
                    <li>
                      <strong>With business partners:</strong> We may share Your
                      information with Our business partners to offer You
                      certain products, services or promotions.
                    </li>
                    <li>
                      <strong>With other users:</strong> when You share personal
                      information or otherwise interact in the public areas with
                      other users, such information may be viewed by all users
                      and may be publicly distributed outside. If You interact
                      with other users or register through a Third-Party Social
                      Media Service, Your contacts on the Third-Party Social
                      Media Service may see Your name, profile, pictures and
                      description of Your activity. Similarly, other users will
                      be able to view descriptions of Your activity, communicate
                      with You and view Your profile.
                    </li>
                    <li>
                      <strong>With Your consent</strong>: We may disclose Your
                      personal information for any other purpose with Your
                      consent.
                    </li>
                  </ul>
                  <h3>Retention of Your Personal Data</h3>
                  <p>
                    The Company will retain Your Personal Data only for as long
                    as is necessary for the purposes set out in this Privacy
                    Policy. We will retain and use Your Personal Data to the
                    extent necessary to comply with our legal obligations (for
                    example, if we are required to retain your data to comply
                    with applicable laws), resolve disputes, and enforce our
                    legal agreements and policies.
                  </p>
                  <p>
                    The Company will also retain Usage Data for internal
                    analysis purposes. Usage Data is generally retained for a
                    shorter period of time, except when this data is used to
                    strengthen the security or to improve the functionality of
                    Our Service, or We are legally obligated to retain this data
                    for longer time periods.
                  </p>
                  <h3>Transfer of Your Personal Data</h3>
                  <p>
                    Your information, including Personal Data, is processed at
                    the Company's operating offices and in any other places
                    where the parties involved in the processing are located. It
                    means that this information may be transferred to — and
                    maintained on — computers located outside of Your state,
                    province, country or other governmental jurisdiction where
                    the data protection laws may differ than those from Your
                    jurisdiction.
                  </p>
                  <p>
                    Your consent to this Privacy Policy followed by Your
                    submission of such information represents Your agreement to
                    that transfer.
                  </p>
                  <p>
                    The Company will take all steps reasonably necessary to
                    ensure that Your data is treated securely and in accordance
                    with this Privacy Policy and no transfer of Your Personal
                    Data will take place to an organization or a country unless
                    there are adequate controls in place including the security
                    of Your data and other personal information.
                  </p>
                  <h3>Delete Your Personal Data</h3>
                  <p>
                    You have the right to delete or request that We assist in
                    deleting the Personal Data that We have collected about You.
                  </p>
                  <p>
                    Our Service may give You the ability to delete certain
                    information about You from within the Service.
                  </p>
                  <p>
                    You may update, amend, or delete Your information at any
                    time by signing in to Your Account, if you have one, and
                    visiting the account settings section that allows you to
                    manage Your personal information. You may also contact Us to
                    request access to, correct, or delete any personal
                    information that You have provided to Us.
                  </p>
                  <p>
                    Please note, however, that We may need to retain certain
                    information when we have a legal obligation or lawful basis
                    to do so.
                  </p>
                  <h3>Disclosure of Your Personal Data</h3>
                  <h4>Business Transactions</h4>
                  <p>
                    If the Company is involved in a merger, acquisition or asset
                    sale, Your Personal Data may be transferred. We will provide
                    notice before Your Personal Data is transferred and becomes
                    subject to a different Privacy Policy.
                  </p>
                  <h4>Law enforcement</h4>
                  <p>
                    Under certain circumstances, the Company may be required to
                    disclose Your Personal Data if required to do so by law or
                    in response to valid requests by public authorities (e.g. a
                    court or a government agency).
                  </p>
                  <h4>Other legal requirements</h4>
                  <p>
                    The Company may disclose Your Personal Data in the good
                    faith belief that such action is necessary to:
                  </p>
                  <ul>
                    <li>Comply with a legal obligation</li>
                    <li>
                      Protect and defend the rights or property of the Company
                    </li>
                    <li>
                      Prevent or investigate possible wrongdoing in connection
                      with the Service
                    </li>
                    <li>
                      Protect the personal safety of Users of the Service or the
                      public
                    </li>
                    <li>Protect against legal liability</li>
                  </ul>
                  <h3>Security of Your Personal Data</h3>
                  <p>
                    The security of Your Personal Data is important to Us, but
                    remember that no method of transmission over the Internet,
                    or method of electronic storage is 100% secure. While We
                    strive to use commercially acceptable means to protect Your
                    Personal Data, We cannot guarantee its absolute security.
                  </p>
                  <h2>Children's Privacy</h2>
                  <p>
                    Our Service does not address anyone under the age of 13. We
                    do not knowingly collect personally identifiable information
                    from anyone under the age of 13. If You are a parent or
                    guardian and You are aware that Your child has provided Us
                    with Personal Data, please contact Us. If We become aware
                    that We have collected Personal Data from anyone under the
                    age of 13 without verification of parental consent, We take
                    steps to remove that information from Our servers.
                  </p>
                  <p>
                    If We need to rely on consent as a legal basis for
                    processing Your information and Your country requires
                    consent from a parent, We may require Your parent's consent
                    before We collect and use that information.
                  </p>
                  <h2>Links to Other Websites</h2>
                  <p>
                    Our Service may contain links to other websites that are not
                    operated by Us. If You click on a third party link, You will
                    be directed to that third party's site. We strongly advise
                    You to review the Privacy Policy of every site You visit.
                  </p>
                  <p>
                    We have no control over and assume no responsibility for the
                    content, privacy policies or practices of any third party
                    sites or services.
                  </p>
                  <h2>Changes to this Privacy Policy</h2>
                  <p>
                    We may update Our Privacy Policy from time to time. We will
                    notify You of any changes by posting the new Privacy Policy
                    on this page.
                  </p>
                  <p>
                    We will let You know via email and/or a prominent notice on
                    Our Service, prior to the change becoming effective and
                    update the &quot;Last updated&quot; date at the top of this
                    Privacy Policy.
                  </p>
                  <p>
                    You are advised to review this Privacy Policy periodically
                    for any changes. Changes to this Privacy Policy are
                    effective when they are posted on this page.
                  </p>
                  <h2>Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, You can
                    contact us:
                  </p>
                  <ul>
                    <li>By email: existence.bloomify@gmail.com</li>
                  </ul>
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
                      <a href="#" className="hover:underline">
                        Privacy Policy
                      </a>
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
                        Open Core Open Core License
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

export default Privacy; // Export the About component for use in Next.js
