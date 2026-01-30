import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faFacebook,
   faSquareXTwitter,
   faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import {
   faEnvelope,
   faPhone,
   faHeart,
} from "@fortawesome/free-solid-svg-icons";

const DashboardFooter = () => {
   return (
      <footer className='bg-gray-900 text-white mt-auto'>
         {/* Main Footer */}
         <div className='px-6 py-8'>
            <div className='flex flex-col md:flex-row justify-between items-center gap-6'>
               {/* Brand & Tagline */}
               <div className='text-center md:text-left'>
                  <h3 className='text-lg font-bold text-white mb-1'>
                     MUTSDA Family
                  </h3>
                  <p className='text-sky-300 text-sm italic'>
                     "We love you, we value you, we cherish you & we mean it"
                  </p>
               </div>

               {/* Quick Actions */}
               <div className='flex items-center gap-4'>
                  <Link
                     to='/dashboard/notifications'
                     className='px-4 py-2 bg-[#3298C8] hover:bg-sky-500 text-white text-sm font-medium rounded-lg transition-all duration-300 flex items-center gap-2'
                  >
                     <FontAwesomeIcon icon={faEnvelope} />
                     Messages
                  </Link>
                  <Link
                     to='/dashboard/create-event'
                     className='px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-all duration-300 border border-white/20'
                  >
                     Create Event
                  </Link>
               </div>

               {/* Social Links */}
               <div className='flex gap-3'>
                  <a
                     href='https://x.com/mutsdafamily1'
                     target='_blank'
                     rel='noopener noreferrer'
                     className='w-9 h-9 bg-white/10 hover:bg-[#3298C8] rounded-lg flex items-center justify-center transition-all duration-300'
                  >
                     <FontAwesomeIcon icon={faSquareXTwitter} />
                  </a>
                  <a
                     href='http://www.youtube.com/@Mutsdafamily1'
                     target='_blank'
                     rel='noopener noreferrer'
                     className='w-9 h-9 bg-white/10 hover:bg-red-600 rounded-lg flex items-center justify-center transition-all duration-300'
                  >
                     <FontAwesomeIcon icon={faYoutube} />
                  </a>
                  <a
                     href='https://www.facebook.com/groups/509151038696455'
                     target='_blank'
                     rel='noopener noreferrer'
                     className='w-9 h-9 bg-white/10 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-all duration-300'
                  >
                     <FontAwesomeIcon icon={faFacebook} />
                  </a>
               </div>
            </div>
         </div>

         {/* Bottom Bar */}
         <div className='border-t border-white/10 px-6 py-4'>
            <div className='flex flex-col sm:flex-row justify-between items-center gap-2 text-sm text-gray-400'>
               <p>© {new Date().getFullYear()} MUTSDA. All rights reserved.</p>
               <p className='flex items-center gap-1'>
                  Made with{" "}
                  <FontAwesomeIcon icon={faHeart} className='text-red-500' />{" "}
                  for the family
               </p>
            </div>
         </div>
      </footer>
   );
};

export default DashboardFooter;
