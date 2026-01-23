import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faSquareXTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import churchLogo from "../assets/church_logo.png";

function Footer() {
  return (
    <footer className="bg-[#3298C8] text-white pt-12 pb-6">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 sm:grid-cols-3 gap-12 items-center">
        {/* Footer Logo Area */}
        <div className="bg-white p-4 w-40 h-24 mx-auto md:mx-0 flex items-center justify-center rounded shadow-inner">
          <img
            src={churchLogo}
            alt="Church Logo"
            className="h-full w-auto object-contain"
          />
        </div>

        {/* Footer Links */}
        <div className="flex flex-col gap-3 text-center font-medium">
          <Link to="/" className="hover:underline ">
            Home
          </Link>
          <Link to="/aboutUs" className="hover:underline">
            About Us
          </Link>
          <a href="/library" className="hover:underline">
            Library
          </a>
          <a href="/leaders" className="hover:underline">
            Leadership
          </a>
        </div>

        {/* Social Icons */}
        <div className="flex flex-col gap-4 sm:items-center">
          <a
            href="https://x.com/mutsdafamily1"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <FontAwesomeIcon icon={faSquareXTwitter} className="text-2xl" />
            <span className="text-sm font-semibold">X space</span>
          </a>
          <a
            href="http://www.youtube.com/@Mutsdafamily1"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faYoutube}
              className="text-2xl text-red-600"
            />
            <span className="text-sm font-semibold">YouTube</span>
          </a>
          <a
            href="https://www.facebook.com/groups/509151038696455"
            className="flex items-center gap-3 group cursor-pointer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              className="text-2xl text-blue-600"
            />
            <span className="text-sm font-semibold">Facebook</span>
          </a>
        </div>
      </div>

      <div className="border-t border-white/20 mt-10 pt-6 text-center text-sm opacity-90">
        <p>© MUTSDA {new Date().getFullYear()} . All rights reserved</p>
      </div>
    </footer>
  );
}

export default Footer;
