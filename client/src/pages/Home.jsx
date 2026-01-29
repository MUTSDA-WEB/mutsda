import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faClock,
   faEnvelope,
   faPhone,
   faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import EventDetailsModal from "../components/EventDetailsModal";
import userStore from "../hooks/useStore";

const Home = () => {
   const { upcomingEvents } = userStore();
   const [selectedEvent, setSelectedEvent] = useState(null);

   // const event = [
   //    {
   //       id: 1,
   //       date: "JAN 25",
   //       title: "Youth Bible Camp",
   //       img: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop",
   //       desc: "A weekend of spiritual growth and outdoor fellowship. Join us for an unforgettable experience of Bible study, worship, nature walks, and bonding with fellow youth members.",
   //       time: "8:00 AM - 6:00 PM",
   //       location: "MUT Grounds",
   //       attendees: "45",
   //    },
   //    {
   //       id: 2,
   //       date: "FEB 14",
   //       title: "Music Concert",
   //       img: "https://images.unsplash.com/photo-1514525253361-bee87184919a?q=80&w=800&auto=format&fit=crop",
   //       desc: "A special night of praise featuring our main church choir. Experience uplifting performances, special guest artists, and a celebration of faith through music.",
   //       time: "6:00 PM - 9:00 PM",
   //       location: "Main Hall",
   //       attendees: "120",
   //    },
   //    {
   //       id: 3,
   //       date: "MAR 02",
   //       title: "Community Outreach",
   //       img: "https://images.unsplash.com/photo-1469571483399-af239969ef4d?q=80&w=800&auto=format&fit=crop",
   //       desc: "Helping local families with food and medical resources. Be part of this life-changing initiative as we serve our community with love and compassion.",
   //       time: "9:00 AM - 4:00 PM",
   //       location: "Murang'a Town",
   //       attendees: "30",
   //    },
   // ];

   return (
      <div className='flex flex-col animate-fadeIn'>
         {/* 1. HERO SECTION */}
         <section className='relative min-h-[90vh] flex items-center justify-center text-white overflow-hidden'>
            {/* Background Image with Overlay */}
            <div className='absolute inset-0 z-0'>
               <img
                  src='https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=2073&auto=format&fit=crop'
                  alt='Worship Congregation'
                  className='w-full h-full object-cover scale-105 animate-slow-zoom'
               />
               {/* Gradient Overlay */}
               <div className='absolute inset-0 bg-linear-to-b from-black/60 via-black/40 to-black/70'></div>
               {/* Decorative Linear */}
               <div className='absolute inset-0 bg-linear-to-r from-[#3298C8]/20 to-transparent'></div>
            </div>

            {/* Floating Decorative Elements */}
            <div className='absolute top-20 left-10 w-72 h-72 bg-[#3298C8]/10 rounded-full blur-3xl animate-pulse'></div>
            <div className='absolute bottom-20 right-10 w-96 h-96 bg-sky-400/10 rounded-full blur-3xl animate-pulse delay-1000'></div>

            {/* Main Content */}
            <div className='relative z-10 text-center px-6 max-w-4xl mx-auto'>
               {/* Decorative Line */}
               <div className='flex items-center justify-center gap-4 mb-6'>
                  <span className='w-12 h-0.5 bg-[#3298C8]'></span>
                  <span className='text-[#3298C8] text-sm font-semibold tracking-[0.3em] uppercase'>
                     Welcome to
                  </span>
                  <span className='w-12 h-0.5 bg-[#3298C8]'></span>
               </div>

               {/* Main Title */}
               <h1 className='text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black mb-6 tracking-tight'>
                  <span className='bg-linear-to-r from-white via-white to-sky-200 bg-clip-text text-transparent drop-shadow-2xl'>
                     MUTSDA
                  </span>
               </h1>

               {/* Tagline */}
               <p className='text-xl md:text-2xl lg:text-3xl font-light mb-4 text-sky-100'>
                  Murang&apos;a University of Technology Seventh Day Adventist
               </p>
               <p className='text-lg md:text-xl italic font-light mb-10 text-white/80'>
                  &quot;We love you, we value you and we cherish you&quot;
               </p>

               {/* CTA Buttons */}
               <div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
                  <a
                     href='/contactUs'
                     className='group relative px-10 py-4 bg-[#3298C8] hover:bg-sky-500 text-white font-bold text-lg rounded-full transition-all duration-300 hover:shadow-xl hover:shadow-sky-500/30 hover:-translate-y-1 overflow-hidden'
                  >
                     <span className='relative z-10'>Join Us Today</span>
                     <div className='absolute inset-0 bg-linear-to-r from-sky-400 to-[#3298C8] opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                  </a>
                  <a
                     href='/aboutUs'
                     className='px-10 py-4 border-2 border-white/30 hover:border-white/60 text-white font-semibold text-lg rounded-full transition-all duration-300 hover:bg-white/10 backdrop-blur-sm'
                  >
                     Learn More
                  </a>
               </div>
            </div>

            {/* Scroll Down Indicator */}
            <div className='absolute bottom-8 left-1/2 -translate-x-1/2 z-10'>
               <div className='flex flex-col items-center gap-2 text-white/40'>
                  <span className='text-xs tracking-widest uppercase'>
                     Scroll
                  </span>
                  <div className='animate-bounce-slow'>
                     <FontAwesomeIcon
                        icon={faChevronDown}
                        className='text-xl'
                     />
                  </div>
               </div>
            </div>

            {/* Bottom Gradient Fade */}
            <div className='absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-sky-100 to-transparent z-10'></div>
         </section>

         {/* MAIN CONTENT WRAPPER */}
         <div className='max-w-6xl mx-auto w-full py-16 px-6 space-y-20'>
            {/* Redesigned 2. UPCOMING EVENTS */}
            <section className='text-center space-y-12'>
               <div className='inline-block relative'>
                  <h2 className='text-4xl font-black text-gray-800 tracking-tight uppercase'>
                     Upcoming Events
                  </h2>
                  <div className='absolute -bottom-2 left-0 w-full h-1 bg-[#3298C8] rounded-full'></div>
               </div>

               <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                  {upcomingEvents.map((event) => (
                     <div
                        key={event.id}
                        className='group relative bg-white rounded-4xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500'
                     >
                        {/* Image Container */}
                        <div className='h-72 overflow-hidden relative'>
                           <img
                              src={event.img}
                              alt={event.title}
                              className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                           />
                           {/* Date Badge */}
                           <div className='absolute top-4 left-4 bg-white rounded-2xl p-2 px-4 shadow-md text-center'>
                              <span className='block text-[#3298C8] font-black text-lg leading-none'>
                                 {event.date.split(" ")[1]}
                              </span>
                              <span className='block text-gray-400 text-[10px] font-bold uppercase'>
                                 {event.date.split(" ")[0]}
                              </span>
                           </div>
                        </div>

                        {/* Content Area */}
                        <div className='p-6 text-left space-y-2'>
                           <h3 className='text-xl font-bold text-gray-800 group-hover:text-[#3298C8] transition-colors'>
                              {event.title}
                           </h3>
                           <p className='text-sm text-gray-500 line-clamp-2'>
                              {event.desc}
                           </p>
                           <div className='pt-4 flex items-center justify-between'>
                              <button
                                 onClick={() => setSelectedEvent(event)}
                                 className='text-[#3298C8] font-bold text-sm hover:underline'
                              >
                                 Event Details →
                              </button>
                              <div className='flex -space-x-2'>
                                 {[1, 2, 3].map((i) => (
                                    <img
                                       key={i}
                                       className='w-6 h-6 rounded-full border-2 border-white'
                                       src={`https://i.pravatar.cc/100?u=${event.id + i}`}
                                       alt='Attendee'
                                    />
                                 ))}
                                 <div className='w-6 h-6 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-400'>
                                    +{event.attendees}
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Event Details Modal */}
               <EventDetailsModal
                  event={selectedEvent}
                  isOpen={!!selectedEvent}
                  onClose={() => setSelectedEvent(null)}
               />
            </section>

            {/* Redesigned 3. OUR SERVICES */}
            <section className='space-y-12'>
               <div className='text-center'>
                  <h2 className='text-4xl font-black text-gray-800 tracking-tight'>
                     Divine Worship & Fellowships
                  </h2>
                  <p className='text-sky-600 font-medium mt-2'>
                     Join us as we seek the Lord together
                  </p>
                  <div className='w-24 h-1.5 bg-[#3298C8] mx-auto mt-4 rounded-full'></div>
               </div>

               <div className='grid grid-cols-1 lg:grid-cols-2 gap-8 px-2'>
                  {/* Sabbath Service Redesign */}
                  <div className='relative group h-112.5 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.01]'>
                     <img
                        src='https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200&auto=format&fit=crop'
                        alt='Sabbath Worship'
                        className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                     />
                     <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent'></div>

                     <div className='absolute bottom-0 left-0 right-0 p-8 space-y-4'>
                        <div className='flex items-center gap-3 text-sky-400'>
                           <span className='bg-sky-400/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-sky-400/30'>
                              Every Saturday
                           </span>
                        </div>
                        <h3 className='text-3xl font-bold text-white'>
                           Sabbath Service
                        </h3>
                        <p className='text-gray-300 max-w-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500'>
                           A full day of spiritual nourishment starting with
                           Sabbath School, followed by Divine Worship and
                           afternoon Bible study.
                        </p>
                        <div className='flex items-center gap-4 text-white/80 text-sm'>
                           <FontAwesomeIcon
                              icon={faClock}
                              className='text-[#3298C8]'
                           />
                           <span>8:00 AM — 6:00 PM</span>
                        </div>
                        <div className='flex flex-wrap gap-3 pt-4'>
                           <button className='bg-[#3298C8] hover:bg-white hover:text-[#3298C8] text-white px-6 py-2 rounded-xl font-bold transition-all text-sm'>
                              Guest Speaker
                           </button>
                           <button className='bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-6 py-2 rounded-xl font-bold transition-all text-sm'>
                              Full Program
                           </button>
                        </div>
                     </div>
                  </div>

                  {/* Weekly Vespers Redesign */}
                  <div className='relative group h-112.5 rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 hover:scale-[1.01]'>
                     <img
                        src='https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=1200'
                        alt='Prayer Meeting'
                        className='absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                     />
                     <div className='absolute inset-0 bg-linear-to-t from-black/90 via-black/40 to-transparent'></div>

                     <div className='absolute bottom-0 left-0 right-0 p-8 space-y-4'>
                        <div className='flex items-center gap-3 text-amber-400'>
                           <span className='bg-amber-400/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-400/30'>
                              Mid-Week & Friday
                           </span>
                        </div>
                        <h3 className='text-3xl font-bold text-white'>
                           Weekly Vespers
                        </h3>
                        <p className='text-gray-300 max-w-md transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500'>
                           Recharge your spirit during our mid-week prayer
                           sessions and welcome the Sabbath with our Friday
                           evening vespers.
                        </p>
                        <div className='flex items-center gap-4 text-white/80 text-sm'>
                           <FontAwesomeIcon
                              icon={faClock}
                              className='text-[#3298C8]'
                           />
                           <span>6:00 PM — 8:00 PM</span>
                        </div>
                        <div className='pt-4'>
                           <button className='bg-white text-black hover:bg-[#3298C8] hover:text-white px-8 py-2 rounded-xl font-bold transition-all text-sm'>
                              Join Online
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
            {/* 4. HISTORY & MESSAGE */}
            <section className='grid md:grid-cols-2 gap-10'>
               <div className='space-y-3'>
                  <h4 className='text-lg font-bold text-gray-700'>
                     Our History
                  </h4>
                  <div className='relative h-40 overflow-hidden rounded-lg mb-2'>
                     <img
                        src='https://images.unsplash.com/photo-1548625361-195feee742f1?q=80&w=800&auto=format&fit=crop'
                        alt='Vintage Church'
                        className='w-full h-full object-cover opacity-60 absolute'
                     />
                     <div className='relative z-10 p-6 bg-white/80 h-full italic text-gray-700'>
                        MUTSDA began as a small prayer group in...
                     </div>
                  </div>
               </div>
               <div className='space-y-3'>
                  <h4 className='text-lg font-bold text-gray-700'>
                     Today Message
                  </h4>
                  <div className='bg-white p-8 rounded-lg shadow-inner border border-gray-100 min-h-40 flex items-center text-gray-500 italic text-center'>
                     &quot;For I know the plans I have for you,&quot; declares
                     the Lord, &quot;plans to prosper you and not to harm you,
                     plans to give you hope and a future.&quot; — Jeremiah 29:11
                  </div>
               </div>
            </section>

            {/* Redesigned 5. FORMS SECTION */}
            <section className='space-y-16 py-12'>
               <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch'>
                  {/* Contact Us Panel */}
                  <div className='bg-white rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col border border-gray-100 transition-all hover:shadow-2xl'>
                     <div className='bg-[#3298C8] p-8 text-white'>
                        <div className='flex items-center gap-4 mb-2'>
                           <div className='bg-white/20 p-3 rounded-2xl backdrop-blur-md'>
                              <FontAwesomeIcon
                                 icon={faEnvelope}
                                 className='text-xl'
                              />
                           </div>
                           <h3 className='text-2xl font-bold'>Contact Us</h3>
                        </div>
                        <p className='text-sky-100 text-sm'>
                           Have a question or need prayer? Our team is here to
                           listen and support you.
                        </p>
                     </div>

                     <div className='p-8 space-y-4 grow'>
                        <div className='space-y-1'>
                           <label className='text-xs font-bold text-gray-400 uppercase ml-1'>
                              Full Name
                           </label>
                           <input
                              type='text'
                              placeholder='e.g. John Doe'
                              className='w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-sky-400 outline-none transition-all placeholder:text-gray-300'
                           />
                        </div>
                        <div className='grid grid-cols-2 gap-4'>
                           <div className='space-y-1'>
                              <label className='text-xs font-bold text-gray-400 uppercase ml-1'>
                                 Phone Number
                              </label>
                              <input
                                 type='tel'
                                 placeholder='+254...'
                                 className='w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-sky-400 outline-none transition-all placeholder:text-gray-300'
                              />
                           </div>
                           <div className='space-y-1'>
                              <label className='text-xs font-bold text-gray-400 uppercase ml-1'>
                                 Email
                              </label>
                              <input
                                 type='email'
                                 placeholder='email@example.com'
                                 className='w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-sky-400 outline-none transition-all placeholder:text-gray-300'
                              />
                           </div>
                        </div>
                        <div className='space-y-1'>
                           <label className='text-xs font-bold text-gray-400 uppercase ml-1'>
                              Your Message
                           </label>
                           <textarea
                              placeholder='How can we help you today?'
                              className='w-full p-4 rounded-2xl bg-gray-50 border-none h-32 focus:ring-2 focus:ring-sky-400 outline-none transition-all resize-none placeholder:text-gray-300'
                           ></textarea>
                        </div>
                        <button className='w-full bg-[#3298C8] hover:bg-sky-700 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-sky-200 transition-all active:scale-[0.98]'>
                           Send Message
                        </button>
                     </div>
                  </div>

                  {/* Register For Mission Panel */}
                  <div className='bg-gray-900 rounded-[2.5rem] shadow-xl overflow-hidden flex flex-col transition-all hover:shadow-2xl border border-gray-800'>
                     <div className='bg-linear-to-br from-amber-500 to-orange-600 p-8 text-white'>
                        <div className='flex items-center gap-4 mb-2'>
                           <div className='bg-white/20 p-3 rounded-2xl backdrop-blur-md'>
                              <FontAwesomeIcon
                                 icon={faPhone}
                                 className='text-xl'
                              />
                           </div>
                           <h3 className='text-2xl font-bold'>
                              Register For Mission
                           </h3>
                        </div>
                        <p className='text-amber-100 text-sm'>
                           Join our missionary team and make an impact in the
                           community.
                        </p>
                     </div>

                     <div className='p-8 space-y-4 grow'>
                        <div className='space-y-1 text-gray-400'>
                           <label className='text-xs font-bold uppercase ml-1'>
                              Volunteer Name
                           </label>
                           <input
                              type='text'
                              placeholder='Enter your name'
                              className='w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-600'
                           />
                        </div>
                        <div className='space-y-1 text-gray-400'>
                           <label className='text-xs font-bold uppercase ml-1'>
                              Phone Number
                           </label>
                           <input
                              type='tel'
                              placeholder='+254...'
                              className='w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-600'
                           />
                        </div>
                        <div className='space-y-1 text-gray-400'>
                           <label className='text-xs font-bold uppercase ml-1'>
                              Email Address
                           </label>
                           <input
                              type='email'
                              placeholder='email@example.com'
                              className='w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-600'
                           />
                        </div>
                        <div className='pt-2'>
                           <p className='text-[10px] text-gray-500 mb-4 italic px-1 text-center font-light'>
                              By clicking the button below, you agree to be
                              contacted by the mission coordinator.
                           </p>
                           <button className='w-full bg-linear-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-orange-900/20 transition-all active:scale-[0.98]'>
                              Get Involved Now
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </section>
         </div>
      </div>
   );
};

export default Home;
