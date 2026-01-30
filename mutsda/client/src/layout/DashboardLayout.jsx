import { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";
import DashboardSidebar from "./DashboardSidebar";
import DashboardFooter from "./DashboardFooter";
import userStore from "../hooks/useStore";

const DashboardLayout = ({ username = "User" }) => {
   const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
   const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
   const { user } = userStore();
   username = user?.userName;
   return (
      <div className='min-h-screen bg-linear-to-br from-gray-50 to-sky-50/30 flex flex-col'>
         <DashboardHeader
            username={username}
            onMenuClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
         />

         <div className='flex flex-1'>
            {/* Sidebar */}
            <DashboardSidebar
               username={username}
               isCollapsed={isSidebarCollapsed}
               setIsCollapsed={setIsSidebarCollapsed}
               isMobileOpen={isMobileSidebarOpen}
               setIsMobileOpen={setIsMobileSidebarOpen}
            />

            {/* Main Content + Footer Container */}
            <div
               className={`flex-1 flex flex-col transition-all duration-300 ${
                  isSidebarCollapsed ? "lg:ml-20" : "lg:ml-64"
               }`}
            >
               {/* Main Content */}
               <main className='flex-1'>
                  <Outlet />
               </main>

               {/* Dashboard Footer */}
               <DashboardFooter />
            </div>
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
