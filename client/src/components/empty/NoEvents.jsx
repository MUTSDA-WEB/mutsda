import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarXmark } from "@fortawesome/free-solid-svg-icons";

const NoEvents = () => {
   return (
      <div className='flex flex-col items-center justify-center py-16 px-6 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200'>
         <div className='relative mb-6'>
            <div className='absolute inset-0 bg-[#3298C8]/10 rounded-full blur-2xl scale-150'></div>
            <div className='relative bg-white p-6 rounded-full shadow-lg'>
               <FontAwesomeIcon
                  icon={faCalendarXmark}
                  className='text-5xl text-gray-300'
               />
            </div>
         </div>

         <h3 className='text-2xl font-bold text-gray-700 mb-2'>
            No Upcoming Events
         </h3>
         <p className='text-gray-500 text-center max-w-md'>
            There are no upcoming events at the moment. Please check back later
            for exciting activities and gatherings!
         </p>

         <div className='mt-6 flex items-center gap-2 text-[#3298C8]'>
            <span className='w-8 h-0.5 bg-[#3298C8]/30'></span>
            <span className='text-sm font-medium'>Stay tuned</span>
            <span className='w-8 h-0.5 bg-[#3298C8]/30'></span>
         </div>
      </div>
   );
};

export default NoEvents;
