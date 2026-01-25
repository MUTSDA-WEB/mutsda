import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faFacebook,
   faSquareXTwitter,
   faYoutube,
   faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import {
   faEnvelope,
   faPhone,
   faLocationDot,
} from "@fortawesome/free-solid-svg-icons";
import churchLogo from "../assets/church_logo.png";

function Footer() {
   return (
      <footer className='bg-linear-to-br from-gray-900 via-gray-800 to-gray-900 text-white'>
         {/* Main Footer Content */}
         <div className='max-w-7xl mx-auto px-6 py-16'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12'>
               {/* Brand Section */}
               <div className='lg:col-span-1 space-y-6'>
                  <div className='bg-white/10 backdrop-blur-sm p-4 w-fit rounded-2xl border border-white/10'>
                     <img
                        src={churchLogo}
                        alt='Church Logo'
                        className='h-16 w-auto object-contain'
                     />
                  </div>
                  <p className='text-sky-200 italic font-light text-lg leading-relaxed'>
                     "We love you, we value you, we cherish you and we mean it"
                  </p>
                  <Link
                     to='/contactUs'
                     className='inline-block bg-[#3298C8] hover:bg-sky-500 text-white font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/30 hover:-translate-y-1'
                  >
                     Join Us
                  </Link>
               </div>

               {/* Quick Links */}
               <div className='space-y-6'>
                  <h3 className='text-xl font-bold text-white relative inline-block'>
                     Quick Links
                     <span className='absolute -bottom-2 left-0 w-12 h-1 bg-[#3298C8] rounded-full'></span>
                  </h3>
                  <div className='flex flex-col gap-3 pt-2'>
                     <Link
                        to='/'
                        className='text-gray-300 hover:text-[#3298C8] hover:translate-x-2 transition-all duration-300 flex items-center gap-2'
                     >
                        <span className='w-1.5 h-1.5 bg-[#3298C8] rounded-full'></span>
                        Home
                     </Link>
                     <Link
                        to='/aboutUs'
                        className='text-gray-300 hover:text-[#3298C8] hover:translate-x-2 transition-all duration-300 flex items-center gap-2'
                     >
                        <span className='w-1.5 h-1.5 bg-[#3298C8] rounded-full'></span>
                        About Us
                     </Link>
                     <Link
                        to='/library'
                        className='text-gray-300 hover:text-[#3298C8] hover:translate-x-2 transition-all duration-300 flex items-center gap-2'
                     >
                        <span className='w-1.5 h-1.5 bg-[#3298C8] rounded-full'></span>
                        Library
                     </Link>
                     <Link
                        to='/leaders'
                        className='text-gray-300 hover:text-[#3298C8] hover:translate-x-2 transition-all duration-300 flex items-center gap-2'
                     >
                        <span className='w-1.5 h-1.5 bg-[#3298C8] rounded-full'></span>
                        Leadership
                     </Link>
                     <Link
                        to='/gallery'
                        className='text-gray-300 hover:text-[#3298C8] hover:translate-x-2 transition-all duration-300 flex items-center gap-2'
                     >
                        <span className='w-1.5 h-1.5 bg-[#3298C8] rounded-full'></span>
                        Gallery
                     </Link>
                  </div>
               </div>

               {/* Ministries */}
               <div className='space-y-6'>
                  <h3 className='text-xl font-bold text-white relative inline-block'>
                     Ministries
                     <span className='absolute -bottom-2 left-0 w-12 h-1 bg-[#3298C8] rounded-full'></span>
                  </h3>
                  <div className='flex flex-col gap-3 pt-2'>
                     <Link
                        to='/ministries/music'
                        className='text-gray-300 hover:text-[#3298C8] hover:translate-x-2 transition-all duration-300 flex items-center gap-2'
                     >
                        <span className='w-1.5 h-1.5 bg-[#3298C8] rounded-full'></span>
                        Music Ministry
                     </Link>
                     <Link
                        to='/ministries/sabbathschool'
                        className='text-gray-300 hover:text-[#3298C8] hover:translate-x-2 transition-all duration-300 flex items-center gap-2'
                     >
                        <span className='w-1.5 h-1.5 bg-[#3298C8] rounded-full'></span>
                        Sabbath School
                     </Link>
                     <Link
                        to='/ministries/welfare'
                        className='text-gray-300 hover:text-[#3298C8] hover:translate-x-2 transition-all duration-300 flex items-center gap-2'
                     >
                        <span className='w-1.5 h-1.5 bg-[#3298C8] rounded-full'></span>
                        Welfare
                     </Link>
                     <Link
                        to='/ministries/biblestudy'
                        className='text-gray-300 hover:text-[#3298C8] hover:translate-x-2 transition-all duration-300 flex items-center gap-2'
                     >
                        <span className='w-1.5 h-1.5 bg-[#3298C8] rounded-full'></span>
                        Bible Study
                     </Link>
                  </div>
               </div>

               {/* Connect With Us */}
               <div className='space-y-6'>
                  <h3 className='text-xl font-bold text-white relative inline-block'>
                     Connect With Us
                     <span className='absolute -bottom-2 left-0 w-12 h-1 bg-[#3298C8] rounded-full'></span>
                  </h3>
                  <div className='flex gap-4 pt-2'>
                     <a
                        href='https://x.com/mutsdafamily1'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='w-11 h-11 bg-white/10 hover:bg-[#3298C8] rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-sky-500/20 border border-white/10'
                     >
                        <FontAwesomeIcon
                           icon={faSquareXTwitter}
                           className='text-xl'
                        />
                     </a>
                     <a
                        href='http://www.youtube.com/@Mutsdafamily1'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='w-11 h-11 bg-white/10 hover:bg-red-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-red-500/20 border border-white/10'
                     >
                        <FontAwesomeIcon icon={faYoutube} className='text-xl' />
                     </a>
                     <a
                        href='https://www.facebook.com/groups/509151038696455'
                        target='_blank'
                        rel='noopener noreferrer'
                        className='w-11 h-11 bg-white/10 hover:bg-blue-600 rounded-xl flex items-center justify-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/20 border border-white/10'
                     >
                        <FontAwesomeIcon
                           icon={faFacebook}
                           className='text-xl'
                        />
                     </a>
                  </div>
               </div>
            </div>
         </div>

         {/* Bottom Bar */}
         <div className='border-t border-white/10'>
            <div className='max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4'>
               <p className='text-gray-400 text-sm'>
                  © {new Date().getFullYear()} MUTSDA. All rights reserved.
               </p>
               <div className='flex gap-4 text-sm'>
                  <Link
                     to='/contactUs'
                     className='px-5 py-2 bg-[#3298C8] hover:bg-sky-400 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-sky-500/40 hover:-translate-y-0.5'
                  >
                     Contact
                  </Link>
                  <Link
                     to='/donate'
                     className='px-5 py-2 bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/40 hover:-translate-y-0.5'
                  >
                     Donate
                  </Link>
               </div>
            </div>
         </div>
      </footer>
   );
}

export default Footer;
