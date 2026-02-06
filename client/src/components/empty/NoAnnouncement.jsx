import { faBell } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const NoAnnouncement = ({ info }) => {
   return (
      <div className='text-center py-8'>
         <div className='w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-3'>
            <FontAwesomeIcon
               icon={faBell}
               className='text-2xl text-amber-400'
            />
         </div>
         <p className='text-sm font-medium text-gray-600'>
            No announcements yet
         </p>
         <p className='text-xs text-gray-400 mt-1'>{info}</p>
      </div>
   );
};

export default NoAnnouncement;
