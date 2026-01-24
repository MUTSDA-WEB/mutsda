import { useState, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faBars,
   faHome,
   faBell,
   faCalendarPlus,
   faGear,
   faUser,
   faSignOutAlt,
   faCog,
   faChevronLeft,
   faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const DashboardSidebar = ({
   username = "User",
   isCollapsed,
   setIsCollapsed,
   isMobileOpen,
   setIsMobileOpen,
}) => {
   const [isProfileOpen, setIsProfileOpen] = useState(false);
   const profileTimeoutRef = useRef(null);

   const menuItems = [
      { name: "Dashboard", icon: faHome, to: "/dashboard", end: true },
      {
         name: "Notifications",
         icon: faBell,
         to: "/dashboard/notifications",
         badge: 3,
      },
      {
         name: "Create Event",
         icon: faCalendarPlus,
         to: "/dashboard/create-event",
      },
      { name: "Settings", icon: faGear, to: "/dashboard/settings" },
   ];

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

   const handleLogout = () => {
      console.log("Logging out...");
      // Add logout logic here
   };

   return (
      <>
         {/* Mobile Overlay */}
         {isMobileOpen && (
            <div
               className='lg:hidden fixed inset-0 bg-black/50 z-40'
               onClick={() => setIsMobileOpen(false)}
            />
         )}

         {/* Sidebar */}
         <aside
            className={`
               fixed top-0 left-0 h-full bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 text-white z-50
               transition-all duration-300 ease-in-out flex flex-col
               ${isCollapsed ? "w-20" : "w-64"}
               ${isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
            `}
         >
            {/* Header */}
            <div
               className={`p-6 border-b border-white/10 ${isCollapsed ? "px-4" : ""}`}
            >
               {!isCollapsed ? (
                  <div>
                     <h2 className='text-lg font-bold text-white underline underline-offset-4 decoration-[#3298C8] decoration-2'>
                        {username}
                     </h2>
                     <p className='text-xs text-gray-400 mt-1'>
                        Member Dashboard
                     </p>
                  </div>
               ) : (
                  <div className='flex justify-center'>
                     <div className='w-10 h-10 bg-linear-to-br from-[#3298C8] to-sky-600 rounded-full flex items-center justify-center text-sm font-bold'>
                        {username.charAt(0).toUpperCase()}
                     </div>
                  </div>
               )}
            </div>

            {/* Navigation */}
            <nav className='flex-1 py-6 px-3 space-y-2 overflow-y-auto'>
               {menuItems.map((item) => (
                  <NavLink
                     key={item.name}
                     to={item.to}
                     end={item.end}
                     onClick={() => setIsMobileOpen(false)}
                     className={({ isActive }) =>
                        `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 relative group ${
                           isActive
                              ? "bg-[#3298C8] text-white shadow-lg shadow-sky-500/30"
                              : "text-gray-400 hover:text-white hover:bg-white/10"
                        } ${isCollapsed ? "justify-center px-3" : ""}`
                     }
                  >
                     <FontAwesomeIcon icon={item.icon} className='text-lg' />
                     {!isCollapsed && (
                        <span className='font-medium'>{item.name}</span>
                     )}

                     {/* Badge */}
                     {item.badge && (
                        <span
                           className={`
                           absolute bg-red-500 text-white text-xs font-bold rounded-full
                           ${isCollapsed ? "top-1 right-1 w-5 h-5 flex items-center justify-center" : "ml-auto px-2 py-0.5"}
                        `}
                        >
                           {item.badge}
                        </span>
                     )}

                     {/* Tooltip for collapsed state */}
                     {isCollapsed && (
                        <div className='absolute left-full ml-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 whitespace-nowrap z-50'>
                           {item.name}
                        </div>
                     )}
                  </NavLink>
               ))}
            </nav>

            {/* Profile Section at Bottom */}
            <div
               className={`p-4 border-t border-white/10 ${isCollapsed ? "px-3" : ""}`}
            >
               <div
                  className='relative'
                  onMouseEnter={handleProfileEnter}
                  onMouseLeave={handleProfileLeave}
               >
                  <button
                     onClick={() => setIsProfileOpen(!isProfileOpen)}
                     className={`
                        w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-300
                        hover:bg-white/10 group
                        ${isCollapsed ? "justify-center" : ""}
                     `}
                  >
                     <div className='w-10 h-10 bg-linear-to-br from-[#3298C8] to-sky-600 rounded-full flex items-center justify-center'>
                        <FontAwesomeIcon icon={faUser} className='text-white' />
                     </div>
                     {!isCollapsed && (
                        <div className='text-left flex-1'>
                           <p className='text-sm font-medium text-white'>
                              Profile
                           </p>
                           <p className='text-xs text-gray-400'>
                              Manage account
                           </p>
                        </div>
                     )}
                  </button>

                  {/* Profile Dropdown - Rises up */}
                  <div
                     className={`
                        absolute bottom-full left-0 mb-2 w-full bg-gray-800 rounded-xl shadow-xl overflow-hidden
                        transition-all duration-300 origin-bottom
                        ${isProfileOpen ? "opacity-100 scale-y-100 visible" : "opacity-0 scale-y-0 invisible"}
                        ${isCollapsed ? "left-full ml-2 bottom-0 mb-0 w-48" : ""}
                     `}
                  >
                     <NavLink
                        to='/dashboard/profile'
                        onClick={() => {
                           setIsProfileOpen(false);
                           setIsMobileOpen(false);
                        }}
                        className='flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-white/10 hover:text-white transition-colors'
                     >
                        <FontAwesomeIcon
                           icon={faCog}
                           className='text-gray-400'
                        />
                        <span className='text-sm'>Profile Settings</span>
                     </NavLink>
                     <button
                        onClick={handleLogout}
                        className='w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors'
                     >
                        <FontAwesomeIcon icon={faSignOutAlt} />
                        <span className='text-sm'>Log Out</span>
                     </button>
                  </div>
               </div>
            </div>

            {/* Collapse Toggle - Desktop only */}
            <button
               onClick={() => setIsCollapsed(!isCollapsed)}
               className='hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-6 h-12 bg-gray-700 hover:bg-[#3298C8] rounded-r-lg items-center justify-center transition-colors'
            >
               <FontAwesomeIcon
                  icon={isCollapsed ? faChevronRight : faChevronLeft}
                  className='text-xs text-white'
               />
            </button>
         </aside>

         {/* Mobile Toggle Button */}
         <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className='lg:hidden fixed bottom-4 left-4 z-50 w-12 h-12 bg-[#3298C8] text-white rounded-full shadow-lg flex items-center justify-center'
         >
            <FontAwesomeIcon icon={faBars} />
         </button>
      </>
   );
};

export default DashboardSidebar;
