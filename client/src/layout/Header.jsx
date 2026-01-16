import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faAddressBook } from '@fortawesome/free-solid-svg-icons';


function Header(){

    return (
     <header className="flex items-center justify-between px-8 py-4 bg-[#3298C8] text-white sticky top-0 z-50 shadow-md">
       <div className="bg-sky-600 px-4 py-1 rounded font-bold border border-white/20">Logo</div>
       <nav className="hidden md:flex gap-6 text-sm font-medium uppercase tracking-wider">
         <a href="#" className="hover:text-sky-200 transition-colors">Home</a>
         <a href="#" className="hover:text-sky-200 transition-colors">About Us</a>
         <a href="#" className="hover:text-sky-200 transition-colors">Ministries</a>
         <a href="#" className="hover:text-sky-200 transition-colors">Library</a>
         <a href="#" className="hover:text-sky-200 transition-colors">Leadership</a>
       </nav>
       <div className="flex gap-5 text-xl">
         <FontAwesomeIcon icon={faUser} className="cursor-pointer hover:text-sky-200" />
         <FontAwesomeIcon icon={faAddressBook} className="cursor-pointer hover:text-sky-200" />
       </div>
     </header>
   );
}

export default Header;