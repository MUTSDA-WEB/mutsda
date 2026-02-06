import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faTimes,
   faCalendarDays,
   faClock,
   faLocationDot,
   faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { formatEventDate, formatEventTime } from "../helpers/dateUtils";

const EventDetailsModal = ({ event, isOpen, onClose }) => {
   if (!isOpen || !event) return null;

   // Format dates from ISO DateTime
   const { month, day, fullDate } = formatEventDate(event.startDateTime);
   const time = formatEventTime(event.startDateTime);

   return (
      <div className='fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn'>
         {/* Backdrop */}
         <div
            className='absolute inset-0 bg-black/60 backdrop-blur-sm'
            onClick={onClose}
         ></div>

         {/* Modal Content */}
         <div className='relative bg-white rounded-4xl shadow-2xl max-w-lg w-full overflow-hidden animate-scaleIn'>
            {/* Event Image */}
            <div className='relative h-56 overflow-hidden'>
               <img
                  src={event.imageURL}
                  alt={event.title}
                  className='w-full h-full object-cover'
               />
               <div className='absolute inset-0 bg-linear-to-t from-black/70 to-transparent'></div>

               {/* Date Badge */}
               <div className='absolute top-4 left-4 bg-white rounded-2xl p-3 px-5 shadow-lg text-center'>
                  <span className='block text-[#3298C8] font-black text-2xl leading-none'>
                     {day}
                  </span>
                  <span className='block text-gray-400 text-xs font-bold uppercase'>
                     {month}
                  </span>
               </div>

               {/* Close Button */}
               <button
                  onClick={onClose}
                  className='absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white hover:bg-white hover:text-gray-800 transition-all'
               >
                  <FontAwesomeIcon icon={faTimes} />
               </button>

               {/* Title Overlay */}
               <div className='absolute bottom-0 left-0 right-0 p-6'>
                  <h2 className='text-2xl font-black text-white'>
                     {event.title}
                  </h2>
               </div>
            </div>

            {/* Event Details */}
            <div className='p-6 space-y-6'>
               {/* Description */}
               <p className='text-gray-600 leading-relaxed'>{event.desc}</p>

               {/* Event Info Grid */}
               <div className='grid grid-cols-2 gap-4'>
                  <div className='bg-sky-50 p-4 rounded-2xl'>
                     <div className='flex items-center gap-3 text-[#3298C8] mb-1'>
                        <FontAwesomeIcon icon={faCalendarDays} />
                        <span className='text-xs font-bold uppercase'>
                           Date
                        </span>
                     </div>
                     <p className='font-bold text-gray-800'>{fullDate}</p>
                  </div>

                  <div className='bg-sky-50 p-4 rounded-2xl'>
                     <div className='flex items-center gap-3 text-[#3298C8] mb-1'>
                        <FontAwesomeIcon icon={faClock} />
                        <span className='text-xs font-bold uppercase'>
                           Time
                        </span>
                     </div>
                     <p className='font-bold text-gray-800'>{time || "TBA"}</p>
                  </div>

                  <div className='bg-sky-50 p-4 rounded-2xl'>
                     <div className='flex items-center gap-3 text-[#3298C8] mb-1'>
                        <FontAwesomeIcon icon={faLocationDot} />
                        <span className='text-xs font-bold uppercase'>
                           Location
                        </span>
                     </div>
                     <p className='font-bold text-gray-800'>
                        {event.eventLocation || "MUT Campus"}
                     </p>
                  </div>

                  <div className='bg-sky-50 p-4 rounded-2xl'>
                     <div className='flex items-center gap-3 text-[#3298C8] mb-1'>
                        <FontAwesomeIcon icon={faUsers} />
                        <span className='text-xs font-bold uppercase'>
                           Attendees
                        </span>
                     </div>
                     <p className='font-bold text-gray-800'>
                        {event.attendees || "12+"} registered
                     </p>
                  </div>
               </div>

               {/* Action Buttons */}
               <div className='flex gap-3 pt-2'>
                  <button className='flex-1 bg-[#3298C8] hover:bg-sky-700 text-white py-4 rounded-2xl font-bold transition-all'>
                     Register Now
                  </button>
                  <button
                     onClick={onClose}
                     className='px-6 py-4 rounded-2xl border-2 border-gray-200 text-gray-600 font-bold hover:bg-gray-50 transition-all'
                  >
                     Close
                  </button>
               </div>
            </div>
         </div>
      </div>
   );
};

export default EventDetailsModal;
