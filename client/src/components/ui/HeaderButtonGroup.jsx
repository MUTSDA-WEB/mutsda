import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

/**
 * HeaderButtonGroup - A grouped button component for header icon actions
 * @param {Array} buttons - Array of button objects with { icon, to, title, color?, className? }
 */
const HeaderButtonGroup = ({ buttons }) => {
   if (!buttons || buttons.length === 0) return null;

   return (
      <div className='hidden sm:flex items-center bg-gray-900 backdrop-blur-sm rounded-full px-1 py-1 shadow-sm border border-white/30'>
         {buttons.map((button, index) => (
            <Link
               key={button.to || index}
               to={button.to}
               title={button.title}
               className={`
                  relative flex items-center justify-center w-9 h-9 rounded-full
                  transition-all duration-300 hover:scale-110
                  ${button.color || "text-sky-500 hover:text-sky-800 hover:bg-sky-100/70"}
                  ${button.className || ""}
                  ${index !== buttons.length - 1 ? "mr-0.5" : ""}
               `}
            >
               <FontAwesomeIcon
                  icon={button.icon}
                  className={`text-lg ${button.animate ? "animate-pulse" : ""}`}
               />
               {button.badge && (
                  <span className='absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center'>
                     {button.badge}
                  </span>
               )}
            </Link>
         ))}
      </div>
   );
};

export default HeaderButtonGroup;
