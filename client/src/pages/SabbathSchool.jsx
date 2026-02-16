import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faBookOpen,
   faUsers,
   faDownload,
   faVideo,
   faCalendarCheck,
   faLightbulb,
} from "@fortawesome/free-solid-svg-icons";
import userStore from "../hooks/useStore";
import NoData from "../components/empty/NoData";

const SabbathSchool = () => {
   const siteData = userStore((state) => state.siteData);
   const weeklySchedule = siteData?.sabbathSchool?.weeklySchedule || [
      {
         time: "08:30 AM",
         activity: "Song Service & Prayer",
         lead: "Choristers",
      },
      { time: "09:00 AM", activity: "Missionary Report", lead: "SS Secretary" },
      {
         time: "09:15 AM",
         activity: "Lesson Study (Classes)",
         lead: "Assigned Teachers",
      },
      { time: "10:15 AM", activity: "General Review", lead: "Superintendent" },
   ];

   return (
      <div className='bg-[#F6EBEB] min-h-screen'>
         {/* 1. CURRENT LESSON HERO */}
         <section className='bg-white border-b border-sky-100'>
            <div className='max-w-7xl mx-auto px-6 py-16 flex flex-col lg:flex-row items-center gap-12'>
               {/* Lesson Cover Area */}
               <div className='w-full lg:w-1/3'>
                  <div className='relative group'>
                     <div className='absolute -inset-2 bg-[#3298C8] rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000'></div>
                     <img
                        src='https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop'
                        alt='Sabbath School Lesson Cover'
                        className='relative rounded-xl shadow-2xl w-full object-cover border-4 border-white'
                     />
                     <div className='absolute top-4 right-4 bg-[#3298C8] text-white px-4 py-1 rounded-full text-xs font-bold shadow-lg'>
                        Current Quarter
                     </div>
                  </div>
               </div>

               {/* Lesson Info Area */}
               <div className='w-full lg:w-2/3 space-y-6'>
                  <h4 className='text-[#3298C8] font-bold tracking-widest uppercase text-sm'>
                     Lesson Study
                  </h4>
                  <h1 className='text-4xl md:text-5xl font-black text-gray-900 leading-tight'>
                     The Great Controversy: <br />
                     <span className='text-gray-500 font-light italic'>
                        Lesson 03: The Light Shines in the Darkness
                     </span>
                  </h1>
                  <p className='text-lg text-gray-600 leading-relaxed max-w-2xl'>
                     This week, we explore the steadfast faith of the Waldenses
                     and the early Reformers who kept the flame of truth alive
                     during the Middle Ages.
                  </p>

                  <div className='flex flex-wrap gap-4 pt-4'>
                     <button className='bg-[#3298C8] hover:bg-sky-700 text-white px-8 py-3 rounded-xl font-bold flex items-center gap-3 transition-all shadow-lg'>
                        <FontAwesomeIcon icon={faBookOpen} /> Read Online
                     </button>
                     <button className='bg-white border-2 border-gray-200 hover:border-[#3298C8] text-gray-700 px-8 py-3 rounded-xl font-bold flex items-center gap-3 transition-all'>
                        <FontAwesomeIcon icon={faDownload} /> Download PDF
                     </button>
                  </div>
               </div>
            </div>
         </section>

         {/* 2. SCHEDULE & CLASSES */}
         <div className='max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-3 gap-12'>
            {/* Weekly Program Column */}
            <div className='lg:col-span-2 space-y-10'>
               <section className='bg-white rounded-3xl p-8 shadow-sm border border-gray-100'>
                  <h2 className='text-2xl font-bold text-gray-800 mb-8 flex items-center gap-3'>
                     <FontAwesomeIcon
                        icon={faCalendarCheck}
                        className='text-[#3298C8]'
                     />
                     Sabbath Morning Program
                  </h2>
                  <div className='space-y-0'>
                     {!weeklySchedule || weeklySchedule.length === 0 ? (
                        <NoData info='No Sabbath School schedule available.' />
                     ) : (
                        weeklySchedule.map((item, i) => (
                           <div
                              key={i}
                              className='flex items-center justify-between py-5 border-b border-gray-50 last:border-0 hover:bg-sky-50 transition-colors px-4 rounded-xl'
                           >
                              <div>
                                 <span className='text-[#3298C8] font-bold text-sm block'>
                                    {item.time}
                                 </span>
                                 <h4 className='font-bold text-gray-800'>
                                    {item.activity}
                                 </h4>
                              </div>
                              <div className='text-right'>
                                 <span className='text-xs text-gray-400 uppercase font-bold tracking-widest'>
                                    Lead By
                                 </span>
                                 <p className='text-sm text-gray-600'>
                                    {item.lead}
                                 </p>
                              </div>
                           </div>
                        ))
                     )}
                  </div>
               </section>

               {/* Discussion Classes */}
               <section className='grid md:grid-cols-2 gap-6'>
                  <div className='bg-sky-900 text-white p-8 rounded-3xl space-y-4'>
                     <FontAwesomeIcon
                        icon={faUsers}
                        className='text-sky-300 text-3xl'
                     />
                     <h3 className='text-xl font-bold'>Adult Classes</h3>
                     <p className='text-sky-100/70 text-sm'>
                        Join our diverse discussion groups catering to different
                        languages and age groups in the main sanctuary.
                     </p>
                  </div>
                  <div className='bg-amber-500 text-white p-8 rounded-3xl space-y-4'>
                     <FontAwesomeIcon
                        icon={faLightbulb}
                        className='text-amber-200 text-3xl'
                     />
                     <h3 className='text-xl font-bold'>Teacher Resources</h3>
                     <p className='text-amber-100/70 text-sm'>
                        Access teaching outlines, powerpoint presentations, and
                        video summaries for the current week.
                     </p>
                  </div>
               </section>
            </div>

            {/* 3. SIDEBAR: VIDEO SUMMARY */}
            <div className='space-y-8'>
               <div className='bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100'>
                  <div className='bg-[#3298C8] p-6 text-white text-center'>
                     <FontAwesomeIcon
                        icon={faVideo}
                        className='text-3xl mb-2'
                     />
                     <h3 className='font-bold'>Weekly Video Review</h3>
                  </div>
                  <div className='aspect-video bg-gray-200'>
                     {/* Embed Youtube/Vimeo here */}
                     <img
                        src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=800'
                        alt='Video Placeholder'
                        className='w-full h-full object-cover'
                     />
                  </div>
                  <div className='p-6'>
                     <p className='text-sm text-gray-500 italic text-center'>
                        Watch a 5-minute summary of this week&apos;s key
                        spiritual insights.
                     </p>
                  </div>
               </div>

               <div className='bg-white p-8 rounded-3xl shadow-sm border border-gray-100'>
                  <h4 className='font-bold text-gray-800 mb-4'>Memory Verse</h4>
                  <div className='p-4 bg-sky-50 rounded-2xl border-l-4 border-[#3298C8]'>
                     <p className='text-gray-700 italic text-sm'>
                        &quot;Thy word is a lamp unto my feet, and a light unto
                        my path.&quot;
                     </p>
                     <p className='text-right text-[#3298C8] font-bold text-xs mt-2'>
                        — Psalm 119:105
                     </p>
                  </div>
               </div>
            </div>
         </div>
      </div>
   );
};

export default SabbathSchool;
