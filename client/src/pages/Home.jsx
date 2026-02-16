import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faClock,
   faEnvelope,
   faPhone,
   faChevronDown,
   faCalendarAlt,
   faBell,
   faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import EventDetailsModal from "../components/ui/EventDetailsModal";
import NoEvents from "../components/empty/NoEvents";
import userStore from "../hooks/useStore";
import calendarEvents from "../../utilities/calendarEvents";
import { useGetAnnouncements, useGetUpcomingEvents } from "../services/events";
import NoAnnouncement from "../components/empty/NoAnnouncement";
import AnnouncementLoader from "../components/loaders/announcementLoader";
import { useSaveVisitorMessage } from "../services/message";
import { formatEventDate } from "../helpers/dateUtils";
import BibleStudyAdmin from "./admin/BibleStudyAdmin";
import LibraryAdmin from "./admin/LibraryAdmin";
import EventsAdmin from "./admin/EventsAdmin";
import MerchandiseAdmin from "./admin/MerchandiseAdmin";

const Home = () => {
   const {
      upcomingEvents,
      announcements,
      setAnnouncements,
      setUpcomingEvents,
   } = userStore();
   // Example: Access siteData from userStore
   const siteData = userStore((state) => state.siteData);
   const [selectedEvent, setSelectedEvent] = useState(null);
   // form states
   const [messageData, setMessageData] = useState({
      name: "",
      email: "",
      phoneNumber: "",
      message: "",
   });
   const [missionData, setMissionData] = useState({
      name: "",
      email: "",
      phoneNumber: "",
   });

   const handleMsgChange = (e) => {
      const { name, value } = e.target;
      setMessageData((prev) => ({ ...prev, [name]: value }));
   };
   const handleMissionChange = (e) => {
      const { name, value } = e.target;
      setMissionData((prev) => ({ ...prev, [name]: value }));
   };

   const { mutate: saveMessage, isPending: saveLoading } =
      useSaveVisitorMessage();

   // save visitor message
   const handleSaveVisitorMessage = (e) => {
      e.preventDefault();
      saveMessage(
         {
            message: messageData.message,
            name: messageData.name,
            phoneNumber: messageData.phoneNumber,
            email: messageData.email,
         },
         {
            onSuccess: () => {
               setMessageData({
                  name: "",
                  email: "",
                  phoneNumber: "",
                  message: "",
               });
               console.log("Message sent");
            },
            onError: (e) =>
               console.log("Error saving the visitor Message", e.message),
         },
      );
   };

   // save mission message
   const handleSaveMissionMessage = (e) => {
      e.preventDefault();
      saveMessage(
         {
            message: "I want to register for mission",
            name: missionData.name,
            phoneNumber: missionData.phoneNumber,
            email: missionData.email,
         },
         {
            onSuccess: () => {
               setMissionData({
                  name: "",
                  email: "",
                  phoneNumber: "",
               });
               console.log("Mission registrationessage sent");
            },
            onError: (e) =>
               console.log("Error saving the visitor Message", e.message),
         },
      );
   };

   // load announcements from db
   const { data, isLoading, isSuccess } = useGetAnnouncements();
   const {
      data: events,
      isLoading: eventLoading,
      isSuccess: eventSuccess,
   } = useGetUpcomingEvents();

   useEffect(() => {
      if (isSuccess && data) setAnnouncements(data.announcements);
      if (eventSuccess && events) setUpcomingEvents(events.events);
   }, [isSuccess, events, data, eventSuccess]);

   return (
      <div className='flex flex-col animate-fadeIn'>
         {/* Example: Show current Bible Study topic from siteData */}
         {siteData?.bibleStudy?.Topic && (
            <div className='bg-sky-50 border-l-4 border-sky-400 p-4 mb-6 rounded-r-xl max-w-2xl mx-auto'>
               <span className='font-bold text-sky-700'>
                  Current Bible Study Topic:
               </span>
               <span className='ml-2 text-sky-900'>
                  {siteData.bibleStudy.Topic}
               </span>
            </div>
         )}
         {/* 1. HERO SECTION */}
         <section className='relative min-h-[91vh] flex items-center justify-center text-white overflow-hidden'>
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
                  &quot;We love you, we value you, we cherish you and we mean
                  it&quot;
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
            <div className='absolute bottom-0 left-0 right-0 h-24 bg-linear-to-t from-[#7F5741] to-transparent z-10'></div>
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

               {eventLoading ? (
                  <AnnouncementLoader info={"Checking for upcoming events"} />
               ) : upcomingEvents && upcomingEvents.length > 0 ? (
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
                     {upcomingEvents.map((event) => {
                        const { month, day } = formatEventDate(
                           event?.startDateTime,
                        );
                        return (
                           <div
                              key={event?.eventID}
                              className='group relative bg-white rounded-4xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500'
                           >
                              {/* Image Container */}
                              <div className='h-72 overflow-hidden relative'>
                                 <img
                                    src={event?.imageURL}
                                    alt={event?.title}
                                    className='w-full h-full object-cover transition-transform duration-700 group-hover:scale-110'
                                 />
                                 {/* Date Badge */}
                                 <div className='absolute top-4 left-4 bg-white rounded-2xl p-2 px-4 shadow-md text-center'>
                                    <span className='block text-[#3298C8] font-black text-lg leading-none'>
                                       {day}
                                    </span>
                                    <span className='block text-gray-400 text-[10px] font-bold uppercase'>
                                       {month}
                                    </span>
                                 </div>
                              </div>

                              {/* Content Area */}
                              <div className='p-6 text-left space-y-2'>
                                 <h3 className='text-xl font-bold text-gray-800 group-hover:text-[#3298C8] transition-colors'>
                                    {event.title}
                                 </h3>
                                 <p className='text-sm text-gray-500 line-clamp-2'>
                                    {event.description}
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
                        );
                     })}
                  </div>
               ) : (
                  <NoEvents />
               )}

               {/* Event Details Modal */}
               <EventDetailsModal
                  event={selectedEvent}
                  isOpen={!!selectedEvent}
                  onClose={() => setSelectedEvent(null)}
               />
            </section>

            {/* CALENDAR OF EVENTS SECTION */}
            <section className='space-y-10'>
               <div className='text-center'>
                  <div className='inline-flex items-center gap-3 mb-4'>
                     <FontAwesomeIcon
                        icon={faCalendarAlt}
                        className='text-3xl text-[#3298C8]'
                     />
                     <h2 className='text-4xl font-black text-gray-800 tracking-tight uppercase'>
                        Calendar of Events
                     </h2>
                  </div>
                  <p className='text-gray-500 max-w-2xl mx-auto'>
                     Plan ahead and mark your calendars for these exciting
                     upcoming activities and gatherings.
                  </p>
                  <div className='w-24 h-1.5 bg-[#3298C8] mx-auto mt-4 rounded-full'></div>
               </div>

               <div className='grid grid-cols-1 lg:grid-cols-[5fr_3.45fr] gap-8 items-stretch'>
                  {/* Events Table */}
                  <div className='bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col h-135'>
                     <div className='bg-[#3298C8] p-6 text-white shrink-0'>
                        <h3 className='text-xl font-bold'>Scheduled Events</h3>
                        <p className='text-sky-100 text-sm mt-1'>
                           Semester Program Overview
                        </p>
                     </div>
                     <div className='overflow-y-auto flex-1'>
                        <table className='w-full'>
                           <thead className='bg-gray-50 sticky top-0'>
                              <tr>
                                 <th className='px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>
                                    Date
                                 </th>
                                 <th className='px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>
                                    Event
                                 </th>
                                 <th className='px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider'>
                                    Description
                                 </th>
                              </tr>
                           </thead>
                           <tbody className='divide-y divide-gray-100'>
                              {calendarEvents.map((item, index) => (
                                 <tr
                                    key={index}
                                    className='hover:bg-gray-50 transition-colors'
                                 >
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                       <span
                                          className={`${item.color} px-3 py-1 rounded-full text-sm font-semibold`}
                                       >
                                          {item.date}
                                       </span>
                                    </td>
                                    <td className='px-6 py-4 font-medium text-gray-800'>
                                       {item.event}
                                    </td>
                                    <td className='px-6 py-4 text-gray-500 text-sm'>
                                       {item.description}
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>

                  {/* Announcements Section */}
                  <div className='bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 flex flex-col h-135'>
                     <div className='bg-linear-to-r from-amber-500 to-orange-500 p-6 text-white shrink-0'>
                        <h3 className='text-xl font-bold flex items-center gap-2'>
                           <FontAwesomeIcon icon={faBell} />
                           Announcements
                        </h3>
                        <p className='text-amber-100 text-sm mt-1'>
                           Stay updated with latest news
                        </p>
                     </div>
                     <div className='p-6 flex-1 overflow-y-auto space-y-4'>
                        <div className='space-y-4'>
                           {isLoading ? (
                              <AnnouncementLoader
                                 info={"Checking for announcements"}
                              />
                           ) : announcements && announcements.length > 0 ? (
                              announcements.map((item, index) => {
                                 const colors = [
                                    {
                                       bg: "bg-amber-50",
                                       border: "border-amber-400",
                                    },
                                    {
                                       bg: "bg-sky-50",
                                       border: "border-[#3298C8]",
                                    },
                                    {
                                       bg: "bg-emerald-50",
                                       border: "border-emerald-400",
                                    },
                                    {
                                       bg: "bg-purple-50",
                                       border: "border-purple-400",
                                    },
                                    {
                                       bg: "bg-rose-50",
                                       border: "border-rose-400",
                                    },
                                 ];
                                 const color = colors[index % colors.length];
                                 return (
                                    <div
                                       key={item.eventID}
                                       className={`p-4 ${color.bg} border-l-4 ${color.border} rounded-r-xl`}
                                    >
                                       <h4 className='font-semibold text-gray-800 text-sm'>
                                          {item.title}
                                       </h4>
                                       <p className='text-xs text-gray-600 mt-1'>
                                          {item.description}
                                       </p>
                                       {item.eventLocation && (
                                          <p className='text-xs text-gray-500 mt-1 flex items-center gap-1'>
                                             <FontAwesomeIcon
                                                icon={faMapMarkerAlt}
                                                className='text-[10px]'
                                             />
                                             {item.eventLocation}
                                          </p>
                                       )}
                                    </div>
                                 );
                              })
                           ) : (
                              <NoAnnouncement
                                 info={"Check later for updates"}
                              />
                           )}
                        </div>
                     </div>
                  </div>
               </div>
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

                     <form
                        onSubmit={handleSaveVisitorMessage}
                        className='p-8 space-y-4 grow'
                     >
                        <div className='space-y-1'>
                           <label className='text-xs font-bold text-gray-400 uppercase ml-1'>
                              Full Name
                           </label>
                           <input
                              type='text'
                              name='name'
                              onChange={handleMsgChange}
                              value={messageData.name}
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
                                 name='phoneNumber'
                                 onChange={handleMsgChange}
                                 value={messageData.phoneNumber}
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
                                 name='email'
                                 onChange={handleMsgChange}
                                 value={messageData.email}
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
                              name='message'
                              onChange={handleMsgChange}
                              value={messageData.message}
                              placeholder='How can we help you today?'
                              className='w-full p-4 rounded-2xl bg-gray-50 border-none h-32 focus:ring-2 focus:ring-sky-400 outline-none transition-all resize-none placeholder:text-gray-300'
                           ></textarea>
                        </div>
                        <button
                           className='w-full bg-[#3298C8] hover:bg-sky-700 text-white py-4 
                           rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-sky-200 
                           transition-all active:scale-[0.98]'
                           type='submit'
                           disabled={saveLoading}
                        >
                           {saveLoading ? "Sending Message..." : "Send Message"}
                        </button>
                     </form>
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

                     <form
                        onSubmit={handleSaveMissionMessage}
                        className='p-8 space-y-4 grow'
                     >
                        <div className='space-y-1 text-gray-400'>
                           <label className='text-xs font-bold uppercase ml-1'>
                              Volunteer Name
                           </label>
                           <input
                              type='text'
                              name='name'
                              onChange={handleMissionChange}
                              placeholder='Enter your name'
                              value={missionData.name}
                              className='w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-600'
                           />
                        </div>
                        <div className='space-y-1 text-gray-400'>
                           <label className='text-xs font-bold uppercase ml-1'>
                              Phone Number
                           </label>
                           <input
                              type='tel'
                              name='phoneNumber'
                              onChange={handleMissionChange}
                              value={missionData.phoneNumber}
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
                              name='email'
                              onChange={handleMissionChange}
                              value={missionData.email}
                              placeholder='email@example.com'
                              className='w-full p-4 rounded-2xl bg-white/5 border border-white/10 text-white focus:ring-2 focus:ring-amber-500 outline-none transition-all placeholder:text-gray-600'
                           />
                        </div>
                        <div className='pt-2'>
                           <p className='text-[10px] text-gray-500 mb-4 italic px-1 text-center font-light'>
                              By clicking the button below, you agree to be
                              contacted by the mission coordinator.
                           </p>
                           <button
                              className='w-full bg-linear-to-r from-amber-500 to-orange-500
                            hover:from-amber-600 hover:to-orange-600 text-white py-4 rounded-2xl
                             font-black uppercase tracking-widest shadow-lg shadow-orange-900/20 
                             transition-all active:scale-[0.98]'
                              type='submit'
                              disabled={saveLoading}
                           >
                              {saveLoading
                                 ? "Submitting your request..."
                                 : "Get Involved Now"}
                           </button>
                        </div>
                     </form>
                  </div>
               </div>
            </section>
         </div>
      </div>
   );
};

export default Home;
