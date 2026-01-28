import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faAddressBook,
   faChevronDown,
   faBars,
   faTimes,
   faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useLocation } from "react-router-dom";
import churchLogo from "../assets/church_logo.png";

const Header = () => {
   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const location = useLocation();

   // Check if current path is a ministry page
   const isMinistryActive = location.pathname.startsWith("/ministries");

   // Ref to hold the timer so we can cancel it if the user moves back in
   const timeoutRef = useRef(null);

   const ministriesLinks = [
      { name: "Music", to: "/ministries/music" },
      { name: "Communication", to: "/ministries/cp" },
      { name: "Sabbath School", to: "/ministries/sabbathschool" },
      { name: "Bible Study", to: "/ministries/biblestudy" },
      { name: "Welfare", to: "/ministries/welfare" },
   ];

   // Desktop Hover Handlers
   const handleMouseEnter = () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setIsDropdownOpen(true);
   };

   const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
         setIsDropdownOpen(false);
      }, 200); // 200ms grace period
   };

   return (
      <header className='bg-sky-900/10 backdrop-blur-2xl text-sky-900 sticky top-0 z-50 shadow-lg shadow-black/5 border-b border-white/20'>
         <div className='flex items-center justify-between px-6 py-4 max-w-7xl mx-auto'>
            {/* LOGO */}
            <Link to='/'>
               <img
                  src={churchLogo}
                  alt='Church Logo'
                  className='h-10 w-auto object-contain hover:opacity-80 transition-opacity'
               />
            </Link>

            {/* DESKTOP NAVIGATION */}
            <nav className='hidden lg:flex gap-8 text-sm font-medium uppercase tracking-wider items-center'>
               <NavLink
                  to='/'
                  end
                  className={({ isActive }) =>
                     `relative transition-all duration-500 after:content-[""] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#3298C8] after:transition-all after:duration-500 ${
                        isActive
                           ? "text-[#3298C8] after:w-full"
                           : "hover:text-[#3298C8] after:w-0 hover:after:w-full"
                     }`
                  }
               >
                  Home
               </NavLink>
               <NavLink
                  to='/aboutUs'
                  className={({ isActive }) =>
                     `relative transition-all duration-500 after:content-[""] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#3298C8] after:transition-all after:duration-500 ${
                        isActive
                           ? "text-[#3298C8] after:w-full"
                           : "hover:text-[#3298C8] after:w-0 hover:after:w-full"
                     }`
                  }
               >
                  About Us
               </NavLink>

               {/* Dropdown with Hover Buffer */}
               <div
                  className='relative py-2' // Added padding to act as a hover bridge
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
               >
                  <button
                     className={`relative flex items-center gap-2 transition-all duration-500 uppercase outline-none after:content-[""] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#3298C8] after:transition-all after:duration-500 ${
                        isMinistryActive
                           ? "text-[#3298C8] after:w-full"
                           : "hover:text-[#3298C8] after:w-0 hover:after:w-full"
                     }`}
                  >
                     Ministries
                     <FontAwesomeIcon
                        icon={faChevronDown}
                        className={`text-xs transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                     />
                  </button>

                  {isDropdownOpen && (
                     <div className='absolute top-full left-0 mt-0 w-48 bg-white/80 backdrop-blur-lg rounded-xl shadow-xl py-2 z-50 border border-sky-100'>
                        {/* Invisible bridge to prevent mouse-out when moving down */}
                        <div className='absolute -top-2 left-0 w-full h-2 bg-transparent'></div>

                        {ministriesLinks.map((link) => (
                           <NavLink
                              key={link.name}
                              to={link.to}
                              className={({ isActive }) =>
                                 `block px-4 py-2 text-sm transition-colors ${
                                    isActive
                                       ? "bg-sky-100 text-[#3298C8] font-semibold"
                                       : "text-gray-700 hover:bg-sky-100/70 hover:text-[#3298C8]"
                                 }`
                              }
                           >
                              {link.name}
                           </NavLink>
                        ))}
                     </div>
                  )}
               </div>

               <NavLink
                  to='/library'
                  className={({ isActive }) =>
                     `relative transition-all duration-500 after:content-[""] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#3298C8] after:transition-all after:duration-500 ${
                        isActive
                           ? "text-[#3298C8] after:w-full"
                           : "hover:text-[#3298C8] after:w-0 hover:after:w-full"
                     }`
                  }
               >
                  Library
               </NavLink>
               <NavLink
                  to='/leaders'
                  className={({ isActive }) =>
                     `relative transition-all duration-500 after:content-[""] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#3298C8] after:transition-all after:duration-500 ${
                        isActive
                           ? "text-[#3298C8] after:w-full"
                           : "hover:text-[#3298C8] after:w-0 hover:after:w-full"
                     }`
                  }
               >
                  Leadership
               </NavLink>
               <NavLink
                  to='/gallery'
                  className={({ isActive }) =>
                     `relative transition-all duration-500 after:content-[""] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#3298C8] after:transition-all after:duration-500 ${
                        isActive
                           ? "text-[#3298C8] after:w-full"
                           : "hover:text-[#3298C8] after:w-0 hover:after:w-full"
                     }`
                  }
               >
                  Gallery
               </NavLink>
            </nav>

            {/* RIGHT ICONS & HAMBURGER */}
            <div className='flex items-center gap-5 text-xl'>
               <Link to='/contactUs' title='Contact Us'>
                  <FontAwesomeIcon
                     icon={faAddressBook}
                     className='hidden sm:block cursor-pointer hover:text-[#3298C8] transition-colors'
                  />
               </Link>
               <Link to='/login' title='Login'>
                  <FontAwesomeIcon
                     icon={faSignInAlt}
                     className='hidden sm:block cursor-pointer hover:text-[#3298C8] transition-colors'
                  />
               </Link>
               <button
                  className='lg:hidden p-2 hover:bg-sky-100 rounded-lg transition-colors'
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
               >
                  <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
               </button>
            </div>
         </div>

         {/* MOBILE MENU OVERLAY */}
         <div
            className={`
        lg:hidden absolute top-full right-0 w-64 bg-white/20 backdrop-blur-2xl border-l border-b border-white/30 transition-all duration-300 ease-in-out shadow-2xl shadow-black/10 rounded-bl-2xl
        ${isMobileMenuOpen ? "translate-x-0 opacity-100 py-6" : "translate-x-full opacity-0 pointer-events-none"}
      `}
         >
            {/* MOBILE LOGO */}
            <div className='flex justify-center mb-6'>
               <Link to='/' onClick={() => setIsMobileMenuOpen(false)}>
                  <img
                     src={churchLogo}
                     alt='Church Logo'
                     className='h-8 w-auto object-contain hover:opacity-80 transition-opacity'
                  />
               </Link>
            </div>

            <div className='flex flex-col items-left gap-6 font-medium uppercase tracking-widest text-sky-900'>
               <NavLink
                  to='/'
                  end
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                     `ml-12 transition-colors ${
                        isActive
                           ? "text-[#3298C8] font-bold"
                           : "hover:text-[#3298C8]"
                     }`
                  }
               >
                  Home
               </NavLink>
               <NavLink
                  to='/aboutUs'
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                     `ml-12 transition-colors ${
                        isActive
                           ? "text-[#3298C8] font-bold"
                           : "hover:text-[#3298C8]"
                     }`
                  }
               >
                  About Us
               </NavLink>

               <div className='bg-sky-100/60 w-full py-4 space-y-4'>
                  <p
                     className={`text-md underline font-bold tracking-tighter ml-12 ${isMinistryActive ? "text-[#3298C8]" : "text-[#3298C8]"}`}
                  >
                     Ministries
                  </p>
                  {ministriesLinks.map((link) => (
                     <NavLink
                        key={link.name}
                        to={link.to}
                        className={({ isActive }) =>
                           `block ml-16 text-sm py-1 hover:cursor-pointer transition-colors ${
                              isActive
                                 ? "text-[#3298C8] font-bold"
                                 : "hover:text-[#3298C8]"
                           }`
                        }
                        onClick={() => setIsMobileMenuOpen(false)}
                     >
                        {link.name}
                     </NavLink>
                  ))}
               </div>

               <NavLink
                  to='/library'
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                     `ml-12 transition-colors ${
                        isActive
                           ? "text-[#3298C8] font-bold"
                           : "hover:text-[#3298C8]"
                     }`
                  }
               >
                  Library
               </NavLink>
               <NavLink
                  to='/leaders'
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                     `ml-12 transition-colors ${
                        isActive
                           ? "text-[#3298C8] font-bold"
                           : "hover:text-[#3298C8]"
                     }`
                  }
               >
                  Leadership
               </NavLink>
               <NavLink
                  to='/gallery'
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) =>
                     `ml-12 transition-colors ${
                        isActive
                           ? "text-[#3298C8] font-bold"
                           : "hover:text-[#3298C8]"
                     }`
                  }
               >
                  Gallery
               </NavLink>

               <div className='flex gap-8 pt-4 border-t border-sky-200/50 w-1/2 justify-center'>
                  <Link
                     to='/contactUs'
                     onClick={() => setIsMobileMenuOpen(false)}
                     title='Contact Us'
                  >
                     <FontAwesomeIcon
                        icon={faAddressBook}
                        className='hover:text-[#3298C8] transition-colors'
                     />
                  </Link>
                  <Link
                     to='/login'
                     onClick={() => setIsMobileMenuOpen(false)}
                     title='Login'
                  >
                     <FontAwesomeIcon
                        icon={faSignInAlt}
                        className='hover:text-[#3298C8] transition-colors'
                     />
                  </Link>
               </div>
            </div>
         </div>
      </header>
   );
};

export default Header;
