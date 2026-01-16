import { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faUser, 
  faAddressBook, 
  faChevronDown, 
  faBars, 
  faTimes 
} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Ref to hold the timer so we can cancel it if the user moves back in
  const timeoutRef = useRef(null);

  const ministriesLinks = [
    { name: 'Music', to: '/ministries/music' },
    { name: 'C&P', to: '/ministries/cp' },
    { name: 'Sabbath School', to: '/ministries/sabbathschool' },
    { name: 'Bible Study', to: '/ministries/biblestudy' },
    { name: 'Welfare', to: '/ministries/welfare' },
  ];

  // Desktop Hover Handlers
  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsDropdownOpen(false);
    }, 200); // 200ms grace period
  };

  return (
    <header className="bg-[#3298C8] text-white sticky top-0 z-50 shadow-md">
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        
        {/* LOGO */}
        <div className="bg-sky-600 px-4 py-1 rounded font-bold border border-white/20 cursor-pointer">
          Logo
        </div>

        {/* DESKTOP NAVIGATION */}
        <nav className="hidden lg:flex gap-8 text-sm font-medium uppercase tracking-wider items-center">
          <Link to="/" className="hover:text-sky-200 transition-colors">Home</Link>
          <Link to="/aboutUs" className="hover:text-sky-200 transition-colors">About Us</Link>
          
          {/* Dropdown with Hover Buffer */}
          <div 
            className="relative py-2" // Added padding to act as a hover bridge
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button className="flex items-center gap-2 hover:text-sky-200 transition-colors uppercase outline-none">
              Ministries
              <FontAwesomeIcon 
                icon={faChevronDown} 
                className={`text-xs transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} 
              />
            </button>

            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-0 w-48 bg-white rounded-md shadow-xl py-2 z-50 border border-gray-100">
                {/* Invisible bridge to prevent mouse-out when moving down */}
                <div className="absolute -top-2 left-0 w-full h-2 bg-transparent"></div>
                
                {ministriesLinks.map((link) => (
                  <Link
                    key={link.name} 
                    to={link.to} 
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-sky-50 hover:text-[#3298C8] transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link to="/library" className="hover:text-sky-200 transition-colors">Library</Link>
          <Link to="/leaders" className="hover:text-sky-200 transition-colors">Leadership</Link>
        </nav>

        {/* RIGHT ICONS & HAMBURGER */}
        <div className="flex items-center gap-5 text-xl">
          <Link to='/contactUs'><FontAwesomeIcon icon={faUser} className="hidden sm:block cursor-pointer hover:text-sky-200" /></Link>
          <button 
            className="lg:hidden p-2 hover:bg-sky-600 rounded-md transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FontAwesomeIcon icon={isMobileMenuOpen ? faTimes : faBars} />
          </button>
        </div>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <div className={`
        lg:hidden absolute top-full right-0 w-64 bg-[#2a80b3] border-t border-sky-400/30 transition-all duration-300 ease-in-out shadow-2xl
        ${isMobileMenuOpen ? 'translate-x-0 opacity-100 py-6' : 'translate-x-full opacity-0 pointer-events-none'}
      `}>
        <div className="flex flex-col items-center gap-6 font-medium uppercase tracking-widest">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>Home</Link>
          <Link href="/aboutUs" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
          
          <div className="text-center bg-sky-800/40 w-full py-4 space-y-4">
            <p className="text-xs text-sky-200 font-bold tracking-tighter">Ministries</p>
            {ministriesLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="block text-sm py-1 hover:text-sky-200"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
          </div>

          <Link to="/library" onClick={() => setIsMobileMenuOpen(false)}>Library</Link>
          <Link to="/leadership" onClick={() => setIsMobileMenuOpen(false)}>Leadership</Link>
          
          <div className="flex gap-8 pt-4 border-t border-sky-400/30 w-1/2 justify-center">
           <Link to='/contactUs'>
                <FontAwesomeIcon icon={faUser} />
                <FontAwesomeIcon icon={faAddressBook} />
            </Link> 
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;