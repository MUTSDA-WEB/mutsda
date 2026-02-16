import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faBible,
   faMicrophone,
   faClock,
   faCompass,
   faBookOpenReader,
   faCirclePlay,
} from "@fortawesome/free-solid-svg-icons";
import JoinForm from "../components/ui/JoinForm";
import NoData from "../components/empty/NoData";
import userStore from "../hooks/useStore";
import { useState } from "react";

const BibleStudy = () => {
   const [showJoinForm, setShowJoinForm] = useState(false);
   const siteData = userStore((state) => state.siteData);
   const bibleStudy = siteData?.bibleStudy || {};
   const currentSeries = {
      title: bibleStudy.Topic || "Bible Study Series",
      speaker: bibleStudy.speaker || "",
      status: bibleStudy.status || "Active Series",
      img:
         bibleStudy.img ||
         "https://images.unsplash.com/photo-1507434965515-61970f2bd7c6?q=80&w=1200&auto=format&fit=crop",
   };
   const upcomingTopics =
      Array.isArray(bibleStudy.schedule) && bibleStudy.schedule.length > 0
         ? bibleStudy.schedule.map((s) => ({
              title: s.subtopic || "Bible Study",
              date: s.day || "",
              time: s.time || "",
           }))
         : [
              {
                 title: "The Seven Seals",
                 date: "Next Wednesday",
                 time: "6:00 PM",
              },
              {
                 title: "The Three Angels' Messages",
                 date: "Jan 28",
                 time: "6:00 PM",
              },
              { title: "The New Earth", date: "Feb 04", time: "6:00 PM" },
           ];

   return (
      <div className='bg-[#F6EBEB] min-h-screen'>
         {/* 1. HERO: CURRENT STUDY SERIES */}
         <section className='relative h-125 flex items-center overflow-hidden'>
            <img
               src={currentSeries.img}
               className='absolute inset-0 w-full h-full object-cover'
               alt='Bible Background'
            />
            <div className='absolute inset-0 bg-linear-to-r from-gray-900 via-gray-900/70 to-transparent'></div>

            <div className='relative z-10 max-w-7xl mx-auto px-6 text-white space-y-6'>
               <span className='bg-amber-500 text-black px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest'>
                  {currentSeries.status}
               </span>
               <h1 className='text-4xl md:text-6xl font-black max-w-2xl leading-tight'>
                  {currentSeries.title}
               </h1>
               <div className='flex items-center gap-4 text-gray-300'>
                  <FontAwesomeIcon
                     icon={faMicrophone}
                     className='text-amber-400'
                  />
                  <span className='font-medium text-lg'>
                     Led by {currentSeries.speaker}
                  </span>
               </div>
               <div className='flex gap-4 pt-4'>
                  <button className='bg-white text-gray-900 px-8 py-3 rounded-xl font-bold hover:bg-amber-400 transition-all flex items-center gap-2'>
                     <FontAwesomeIcon icon={faCirclePlay} /> Watch Live
                  </button>
                  <button className='bg-white/10 backdrop-blur-md border border-white/20 px-8 py-3 rounded-xl font-bold hover:bg-white/20 transition-all'>
                     Study Guides
                  </button>
               </div>
            </div>
         </section>

         <div className='max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-3 gap-16'>
            {/* 2. STUDY CONTENT */}
            <div className='lg:col-span-2 space-y-12'>
               <section className='space-y-6'>
                  <h2 className='text-3xl font-bold text-gray-800 flex items-center gap-3'>
                     <FontAwesomeIcon
                        icon={faCompass}
                        className='text-[#3298C8]'
                     />
                     Study Schedule
                  </h2>
                  <div className='space-y-4'>
                     {upcomingTopics.length === 0 ? (
                        <NoData info='No upcoming Bible study topics.' />
                     ) : (
                        upcomingTopics.map((topic, i) => (
                           <div
                              key={i}
                              className='bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex items-center justify-between group hover:border-[#3298C8] transition-all'
                           >
                              <div className='flex items-center gap-6'>
                                 <div className='w-12 h-12 bg-sky-50 rounded-2xl flex items-center justify-center text-[#3298C8] group-hover:bg-[#3298C8] group-hover:text-white transition-all'>
                                    <FontAwesomeIcon icon={faBible} />
                                 </div>
                                 <div>
                                    <h4 className='font-bold text-xl text-gray-800'>
                                       {topic.title}
                                    </h4>
                                    <p className='text-sm text-gray-500 italic'>
                                       Mid-week Bible Seminar
                                    </p>
                                 </div>
                              </div>
                              <div className='text-right'>
                                 <p className='font-bold text-gray-700'>
                                    {topic.date}
                                 </p>
                                 <p className='text-xs text-[#3298C8] flex items-center justify-end gap-1 font-bold'>
                                    <FontAwesomeIcon
                                       icon={faClock}
                                       className='text-[10px]'
                                    />{" "}
                                    {topic.time}
                                 </p>
                              </div>
                           </div>
                        ))
                     )}
                  </div>
               </section>

               {/* PERSONAL STUDY TOOLS */}
               <section className='bg-white p-10 rounded-[3rem] shadow-xl border border-gray-50'>
                  <div className='flex items-center gap-4 mb-8'>
                     <FontAwesomeIcon
                        icon={faBookOpenReader}
                        className='text-4xl text-amber-500'
                     />
                     <div>
                        <h3 className='text-2xl font-bold text-gray-800'>
                           Study Resources
                        </h3>
                        <p className='text-gray-400'>
                           Deepen your understanding with these tools
                        </p>
                     </div>
                  </div>
                  <div className='grid sm:grid-cols-2 gap-8'>
                     <div className='space-y-2'>
                        <h4 className='font-bold text-[#3298C8]'>
                           Concordance Search
                        </h4>
                        <p className='text-sm text-gray-600'>
                           Cross-reference scripture verses and find word
                           origins in Hebrew and Greek.
                        </p>
                     </div>
                     <div className='space-y-2'>
                        <h4 className='font-bold text-[#3298C8]'>
                           Prophecy Charts
                        </h4>
                        <p className='text-sm text-gray-600'>
                           Download visual timelines of Daniel 2, 7, and 8 for
                           your personal study.
                        </p>
                     </div>
                  </div>
               </section>
            </div>

            {/* 3. SIDEBAR: PRAYER & QUOTES */}
            <div className='space-y-8'>
               <div className='bg-[#3298C8] p-8 rounded-[2.5rem] text-white shadow-lg relative overflow-hidden'>
                  <FontAwesomeIcon
                     icon={faBible}
                     className='absolute -bottom-6 -right-6 text-9xl opacity-10'
                  />
                  <h3 className='text-xl font-bold mb-4'>Study Tip</h3>
                  <p className='text-sky-100 italic leading-relaxed'>
                     &quot;The Bible is its own expositor. One passage will
                     prove to be a key that will unlock other passages, and in
                     this way light will be shed upon the hidden meaning of the
                     word.&quot;
                  </p>
                  <p className='text-right mt-4 text-xs font-bold uppercase tracking-widest'>
                     — E.G. White
                  </p>
               </div>

               <div className='bg-gray-900 p-8 rounded-[2.5rem] text-white space-y-6'>
                  <h3 className='text-xl font-bold border-b border-white/10 pb-4 text-amber-400'>
                     Join a Small Group
                  </h3>
                  <p className='text-sm text-gray-400 leading-relaxed'>
                     Bible study is more impactful when discussed with others.
                     We have small groups meeting in various neighborhoods.
                  </p>
                  {!showJoinForm ? (
                     <button
                        onClick={() => setShowJoinForm(true)}
                        className='w-full bg-amber-500 text-black py-3 rounded-xl font-bold hover:bg-amber-400 transition-colors'
                     >
                        Find a Group Near You
                     </button>
                  ) : (
                     <JoinForm
                        isOpen={showJoinForm}
                        onClose={() => setShowJoinForm(false)}
                        title='Join a Small Group'
                        description='Enter your details to find a group near you'
                        buttonText='Find My Group'
                        darkMode={true}
                        message={"I would like to join a bible study group"}
                     />
                  )}
               </div>
            </div>
         </div>
      </div>
   );
};

export default BibleStudy;
