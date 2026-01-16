import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faWhatsapp, faSquareXTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer () {

   return (
     <footer className="bg-[#3298C8] text-white pt-12 pb-6">
       <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12 items-center">
         {/* Footer Logo Area */}
         <div className="bg-white p-4 w-40 h-24 mx-auto md:mx-0 flex items-center justify-center rounded shadow-inner">
           <span className="text-black font-black italic">LOGO</span>
         </div>
   
         {/* Footer Links */}
         <div className="flex flex-col gap-3 text-center font-medium">
           <a href="#" className="hover:underline">Home</a>
           <a href="#" className="hover:underline">About Us</a>
           <a href="#" className="hover:underline">Ministries</a>
           <a href="#" className="hover:underline">Library</a>
           <a href="#" className="hover:underline">Leadership</a>
         </div>
   
         {/* Social Icons */}
         <div className="flex flex-col gap-4 items-center md:items-end">
           <div className="flex items-center gap-3 group cursor-pointer">
             <span className="text-sm font-semibold">X space</span>
             <FontAwesomeIcon icon={faSquareXTwitter} className="text-2xl" />
           </div>
           <div className="flex items-center gap-3 group cursor-pointer">
             <span className="text-sm font-semibold">WhatsApp</span>
             <FontAwesomeIcon icon={faWhatsapp} className="text-2xl text-green-400" />
           </div>
           <div className="flex items-center gap-3 group cursor-pointer">
             <span className="text-sm font-semibold">Facebook</span>
             <FontAwesomeIcon icon={faFacebook} className="text-2xl text-blue-200" />
           </div>
         </div>
       </div>
       
       <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm opacity-90">
         <p>© MUTSDA 2026 . All rights reserved</p>
       </div>
     </footer>
   );
}

export default Footer;