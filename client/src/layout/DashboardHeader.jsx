import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faChevronDown,
   faBars,
   faTimes,
   faUser,
   faGear,
   faSignOutAlt,
   faBook,
   faMusic,
   faHome,
   faChurch,
} from "@fortawesome/free-solid-svg-icons";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import LogoutConfirmModal from "../components/ui/LogoutConfirmModal";
import { useLogout } from "../services/logout";

const DashboardHeader = ({ username = "User", onMenuClick }) => {
   const [isMinistriesOpen, setIsMinistriesOpen] = useState(false);
   const [isMutsdaOpen, setIsMutsdaOpen] = useState(false);
   const [isProfileOpen, setIsProfileOpen] = useState(false);
   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
   const location = useLocation();
   const navigate = useNavigate();

   const { isLoading: isLoggingOut, mutate: logout } = useLogout();

   // Check if current path is a ministry or mutsda page
   const isMinistryActive = location.pathname.startsWith(
      "/dashboard/ministries",
   );
   const isMutsdaActive = [
      "/dashboard/about",
      "/dashboard/leaders",
      "/dashboard/gallery",
      "/dashboard/contact",
   ].some((path) => location.pathname.startsWith(path));

   // Refs to hold timers
   const ministriesTimeoutRef = useRef(null);
   const mutsdaTimeoutRef = useRef(null);
   const profileTimeoutRef = useRef(null);

   const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

   function handleLogout() {
      setIsLogoutModalOpen(true);
      setIsProfileOpen(false);
   }

   const confirmLogout = () => {
      logout(undefined, {
         onSuccess: () => {
            localStorage.clear();
            navigate("/login", { replace: true });
         },
         onError: (error) => {
            console.error("Logout failed:", error);
         },
      });
   };

   const ministriesLinks = [
      { name: "Music", to: "/dashboard/ministries/music" },
      { name: "Communication", to: "/dashboard/ministries/cp" },
      { name: "Sabbath School", to: "/dashboard/ministries/sabbathschool" },
      { name: "Bible Study", to: "/dashboard/ministries/biblestudy" },
      { name: "Welfare", to: "/dashboard/ministries/welfare" },
   ];

   const mutsdaLinks = [
      { name: "About Us", to: "/dashboard/about" },
      { name: "Leadership", to: "/dashboard/leaders" },
      { name: "Gallery", to: "/dashboard/gallery" },
      { name: "Contact Us", to: "/dashboard/contact" },
   ];

   // Hover handlers for Ministries
   const handleMinistriesEnter = () => {
      if (ministriesTimeoutRef.current)
         clearTimeout(ministriesTimeoutRef.current);
      setIsMinistriesOpen(true);
   };
   const handleMinistriesLeave = () => {
      ministriesTimeoutRef.current = setTimeout(
         () => setIsMinistriesOpen(false),
         200,
      );
   };

   // Hover handlers for Mutsda
   const handleMutsdaEnter = () => {
      if (mutsdaTimeoutRef.current) clearTimeout(mutsdaTimeoutRef.current);
      setIsMutsdaOpen(true);
   };
   const handleMutsdaLeave = () => {
      mutsdaTimeoutRef.current = setTimeout(() => setIsMutsdaOpen(false), 200);
   };

   // Hover handlers for Profile
   const handleProfileEnter = () => {
      if (profileTimeoutRef.current) clearTimeout(profileTimeoutRef.current);
      setIsProfileOpen(true);
   };
   const handleProfileLeave = () => {
      profileTimeoutRef.current = setTimeout(
         () => setIsProfileOpen(false),
         200,
      );
   };

   return (
      <>
         <header className='bg-sky-900/10 backdrop-blur-2xl text-sky-900 sticky top-0 z-50 shadow-lg shadow-black/5 border-b border-white/20'>
            <div className='flex items-center justify-between px-6 py-4 max-w-7xl mx-auto'>
               {/* Sidebar Toggle (Mobile) + LOGO */}
               <div className='flex items-center gap-4'>
                  {/* Sidebar Toggle for Mobile */}
                  <button
                     className='lg:hidden p-2 hover:bg-sky-100 rounded-lg transition-colors'
                     onClick={onMenuClick}
                  >
                     <FontAwesomeIcon icon={faBars} className='text-lg' />
                  </button>

                  <Link to='/dashboard'>
                     <img
                        src={"./church_logo.png"}
                        alt='Church Logo'
                        className='h-10 w-auto object-contain hover:opacity-80 transition-opacity'
                     />
                  </Link>
               </div>

               {/* Logout Confirmation Modal */}
               <LogoutConfirmModal
                  isOpen={isLogoutModalOpen}
                  onClose={() => setIsLogoutModalOpen(false)}
                  onConfirm={confirmLogout}
                  isLoading={isLoggingOut}
               />

               {/* DESKTOP NAVIGATION */}
               <nav className='hidden lg:flex gap-8 text-sm font-medium uppercase tracking-wider items-center'>
                  {/* Home */}
                  <NavLink
                     to='/dashboard'
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

                  {/* Library */}
                  <NavLink
                     to='/dashboard/library'
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

                  {/* Ministries Dropdown */}
                  <div
                     className='relative py-2'
                     onMouseEnter={handleMinistriesEnter}
                     onMouseLeave={handleMinistriesLeave}
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
                           className={`text-xs transition-transform duration-200 ${
                              isMinistriesOpen ? "rotate-180" : ""
                           }`}
                        />
                     </button>

                     {isMinistriesOpen && (
                        <div className='absolute top-full left-0 mt-0 w-48 bg-white/80 backdrop-blur-lg rounded-xl shadow-xl py-2 z-50 border border-sky-100'>
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

                  {/* Mutsda Dropdown */}
                  <div
                     className='relative py-2'
                     onMouseEnter={handleMutsdaEnter}
                     onMouseLeave={handleMutsdaLeave}
                  >
                     <button
                        className={`relative flex items-center gap-2 transition-all duration-500 uppercase outline-none after:content-[""] after:absolute after:left-0 after:-bottom-1 after:h-0.5 after:bg-[#3298C8] after:transition-all after:duration-500 ${
                           isMutsdaActive
                              ? "text-[#3298C8] after:w-full"
                              : "hover:text-[#3298C8] after:w-0 hover:after:w-full"
                        }`}
                     >
                        Mutsda
                        <FontAwesomeIcon
                           icon={faChevronDown}
                           className={`text-xs transition-transform duration-200 ${
                              isMutsdaOpen ? "rotate-180" : ""
                           }`}
                        />
                     </button>

                     {isMutsdaOpen && (
                        <div className='absolute top-full left-0 mt-0 w-48 bg-white/80 backdrop-blur-lg rounded-xl shadow-xl py-2 z-50 border border-sky-100'>
                           <div className='absolute -top-2 left-0 w-full h-2 bg-transparent'></div>
                           {mutsdaLinks.map((link) => (
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
               </nav>

               {/* RIGHT SIDE - Welcome & Profile */}
               <div className='hidden lg:flex items-center gap-6'>
                  {/* Welcome Message */}
                  <span className='text-sm font-medium text-gray-700'>
                     Hello,{" "}
                     <span className='text-[#3298C8] font-semibold'>
                        {username}
                     </span>
                  </span>

                  {/* Profile Dropdown */}
                  <div
                     className='relative'
                     onMouseEnter={handleProfileEnter}
                     onMouseLeave={handleProfileLeave}
                  >
                     <button className='w-10 h-10 bg-linear-to-br from-[#3298C8] to-sky-600 rounded-full flex items-center justify-center text-white shadow-md hover:shadow-lg hover:shadow-sky-300/30 transition-all duration-300'>
                        <FontAwesomeIcon icon={faUser} />
                     </button>

                     {isProfileOpen && (
                        <div className='absolute top-full right-0 mt-2 w-48 bg-white/90 backdrop-blur-lg rounded-xl shadow-xl py-2 z-50 border border-sky-100'>
                           <div className='absolute -top-2 right-4 w-full h-2 bg-transparent'></div>

                           {/* Profile Header */}
                           <div className='px-4 py-3 border-b border-gray-100'>
                              <p className='text-sm font-semibold text-gray-800'>
                                 {username}
                              </p>
                              <p className='text-xs text-gray-500'>Member</p>
                           </div>

                           <NavLink
                              to='/dashboard/profile'
                              className={({ isActive }) =>
                                 `flex items-center gap-3 px-4 py-3 text-sm transition-colors ${
                                    isActive
                                       ? "bg-sky-100 text-[#3298C8] font-semibold"
                                       : "text-gray-700 hover:bg-sky-50 hover:text-[#3298C8]"
                                 }`
                              }
                           >
                              <FontAwesomeIcon
                                 icon={faGear}
                                 className='text-gray-400'
                              />
                              Profile Settings
                           </NavLink>

                           <button
                              className='w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors'
                              onClick={handleLogout}
                           >
                              <FontAwesomeIcon icon={faSignOutAlt} />
                              Log Out
                           </button>
                        </div>
                     )}
                  </div>
               </div>

               {/* MOBILE - Hamburger & Profile */}
               <div className='flex lg:hidden items-center gap-4'>
                  {/* Mobile Profile Icon */}
                  <div
                     className='relative'
                     onMouseEnter={handleProfileEnter}
                     onMouseLeave={handleProfileLeave}
                  >
                     <button
                        className='w-9 h-9 bg-linear-to-br from-[#3298C8] to-sky-600 rounded-full flex items-center justify-center text-white text-sm'
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                     >
                        <FontAwesomeIcon icon={faUser} />
                     </button>

                     {isProfileOpen && (
                        <div className='absolute top-full right-0 mt-2 w-48 bg-white/95 backdrop-blur-lg rounded-xl shadow-xl py-2 z-50 border border-sky-100'>
                           <div className='px-4 py-3 border-b border-gray-100'>
                              <p className='text-sm font-semibold text-gray-800'>
                                 {username}
                              </p>
                              <p className='text-xs text-gray-500'>Member</p>
                           </div>

                           <NavLink
                              to='/dashboard/profile'
                              className='flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-sky-50 hover:text-[#3298C8] transition-colors'
                              onClick={() => setIsProfileOpen(false)}
                           >
                              <FontAwesomeIcon
                                 icon={faGear}
                                 className='text-gray-400'
                              />
                              Profile Settings
                           </NavLink>

                           <button
                              className='w-full flex items-center gap-3 px-4 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors'
                              onClick={() => {
                                 setIsProfileOpen(false);
                                 console.log("Logging out...");
                              }}
                           >
                              <FontAwesomeIcon icon={faSignOutAlt} />
                              Log Out
                           </button>
                        </div>
                     )}
                  </div>

                  {/* Hamburger */}
                  <button
                     className='p-2 hover:bg-sky-100 rounded-lg transition-colors'
                     onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  >
                     <FontAwesomeIcon
                        icon={isMobileMenuOpen ? faTimes : faBars}
                     />
                  </button>
               </div>
            </div>

            {/* MOBILE MENU */}
            <div
               className={`lg:hidden absolute top-full right-0 w-72 bg-white/95 backdrop-blur-2xl border-l border-b border-white/30 transition-all duration-300 ease-in-out shadow-2xl shadow-black/10 rounded-bl-2xl ${
                  isMobileMenuOpen
                     ? "translate-x-0 opacity-100 py-6"
                     : "translate-x-full opacity-0 pointer-events-none"
               }`}
            >
               {/* Welcome Message Mobile */}
               <div className='px-6 pb-4 mb-4 border-b border-gray-100'>
                  <p className='text-sm text-gray-600'>
                     Hello,{" "}
                     <span className='text-[#3298C8] font-semibold'>
                        {username}
                     </span>
                  </p>
               </div>

               <div className='flex flex-col gap-4 font-medium uppercase tracking-wider text-sky-900'>
                  {/* Home */}
                  <NavLink
                     to='/dashboard'
                     end
                     onClick={() => setIsMobileMenuOpen(false)}
                     className={({ isActive }) =>
                        `px-6 py-2 transition-colors ${
                           isActive
                              ? "text-[#3298C8] font-bold bg-sky-50"
                              : "hover:text-[#3298C8] hover:bg-sky-50/50"
                        }`
                     }
                  >
                     <FontAwesomeIcon icon={faHome} className='mr-3 text-sm' />
                     Home
                  </NavLink>

                  {/* Library */}
                  <NavLink
                     to='/dashboard/library'
                     onClick={() => setIsMobileMenuOpen(false)}
                     className={({ isActive }) =>
                        `px-6 py-2 transition-colors ${
                           isActive
                              ? "text-[#3298C8] font-bold bg-sky-50"
                              : "hover:text-[#3298C8] hover:bg-sky-50/50"
                        }`
                     }
                  >
                     <FontAwesomeIcon icon={faBook} className='mr-3 text-sm' />
                     Library
                  </NavLink>

                  {/* Ministries Section */}
                  <div className='bg-sky-50/60 py-4'>
                     <p className='px-6 text-xs text-[#3298C8] font-bold tracking-widest mb-3 flex items-center gap-2'>
                        <FontAwesomeIcon icon={faMusic} />
                        Ministries
                     </p>
                     {ministriesLinks.map((link) => (
                        <NavLink
                           key={link.name}
                           to={link.to}
                           onClick={() => setIsMobileMenuOpen(false)}
                           className={({ isActive }) =>
                              `block px-8 py-2 text-sm transition-colors ${
                                 isActive
                                    ? "text-[#3298C8] font-bold"
                                    : "hover:text-[#3298C8]"
                              }`
                           }
                        >
                           {link.name}
                        </NavLink>
                     ))}
                  </div>

                  {/* Mutsda Section */}
                  <div className='bg-sky-50/60 py-4'>
                     <p className='px-6 text-xs text-[#3298C8] font-bold tracking-widest mb-3 flex items-center gap-2'>
                        <FontAwesomeIcon icon={faChurch} />
                        Mutsda
                     </p>
                     {mutsdaLinks.map((link) => (
                        <NavLink
                           key={link.name}
                           to={link.to}
                           onClick={() => setIsMobileMenuOpen(false)}
                           className={({ isActive }) =>
                              `block px-8 py-2 text-sm transition-colors ${
                                 isActive
                                    ? "text-[#3298C8] font-bold"
                                    : "hover:text-[#3298C8]"
                              }`
                           }
                        >
                           {link.name}
                        </NavLink>
                     ))}
                  </div>
               </div>
            </div>
         </header>

         {/* Logout Confirmation Modal - placed outside header for proper z-index stacking */}
         <LogoutConfirmModal
            isOpen={isLogoutModalOpen}
            onClose={() => setIsLogoutModalOpen(false)}
            onConfirm={confirmLogout}
            isLoading={isLoggingOut}
         />
      </>
   );
};

export default DashboardHeader;
