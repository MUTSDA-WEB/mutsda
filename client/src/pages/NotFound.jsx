import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faHome,
   faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
   const navigate = useNavigate();

   return (
      <div className='min-h-screen bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-6'>
         <div className='text-center space-y-8 max-w-lg'>
            {/* Decorative Elements */}
            <div className='relative'>
               <div className='absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#3298C8]/20 rounded-full blur-3xl'></div>
               <div className='relative z-10'>
                  <FontAwesomeIcon
                     icon={faExclamationTriangle}
                     className='text-[#3298C8] text-6xl mb-4 animate-pulse'
                  />
                  <h1 className='text-9xl font-black text-white/10 select-none'>
                     404
                  </h1>
               </div>
            </div>

            {/* Message */}
            <div className='space-y-4 relative z-10'>
               <h2 className='text-3xl md:text-4xl font-bold text-white'>
                  THE page you are looking for is not found
               </h2>
               <p className='text-gray-400 text-lg'>
                  Sorry, the page you're looking for doesn't exist or has been
                  moved.
               </p>
            </div>

            {/* Go Back Button */}
            <button
               onClick={() => navigate("/")}
               className='group relative inline-flex items-center gap-3 px-8 py-4 bg-[#3298C8] hover:bg-sky-500 text-white font-bold text-lg rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/30 hover:-translate-y-1 overflow-hidden'
            >
               <FontAwesomeIcon icon={faHome} className='text-xl' />
               <span className='relative z-10'>Go Back</span>
               <div className='absolute inset-0 bg-linear-to-r from-sky-400 to-[#3298C8] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
            </button>

            {/* Decorative Bottom Element */}
            <div className='pt-8'>
               <div className='flex items-center justify-center gap-2'>
                  <span className='w-12 h-0.5 bg-gray-700'></span>
                  <span className='text-gray-500 text-sm'>MUTSDA</span>
                  <span className='w-12 h-0.5 bg-gray-700'></span>
               </div>
            </div>
         </div>
      </div>
   );
};

export default NotFound;
