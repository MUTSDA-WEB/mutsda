import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";

const DashboardLayout = ({ username = "User" }) => {
   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

   return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-sky-50/30'>
         <DashboardHeader
            username={username}
            onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
         />

         <div className='flex'>
            {/* Sidebar */}
            <DashboardSidebar
               username={username}
               isCollapsed={isSidebarCollapsed}
               setIsCollapsed={setIsSidebarCollapsed}
               isMobileOpen={isMobileSidebarOpen}
               setIsMobileOpen={setIsMobileSidebarOpen}
            />

            {/* Main Content */}
            <main
               className={`flex-1 transition-all duration-300 ${
                  isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
               }`}
            >
               <Outlet />
            </main>
         </div>

         {/* Mobile Sidebar Overlay */}
         {isMobileSidebarOpen && (
            <div
               className='fixed inset-0 bg-black/50 z-30 lg:hidden'
               onClick={() => setIsMobileSidebarOpen(false)}
            />
         )}
      </div>
   );
};

export default DashboardLayout;
