import { Outlet } from "react-router-dom";
import DashboardHeader from "./DashboardHeader";

const DashboardLayout = ({ username = "User" }) => {
   return (
      <div className='min-h-screen bg-gradient-to-br from-gray-50 to-sky-50/30'>
         <DashboardHeader username={username} />
         <main>
            <Outlet />
         </main>
      </div>
   );
};

export default DashboardLayout;
