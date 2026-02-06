import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faCalendarAlt,
   faBook,
   faUsers,
   faChurch,
   faBell,
   faArrowRight,
   faClock,
   faHeart,
   faChevronDown,
   faPlus,
   faTimes,
   faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import userStore from "../../hooks/useStore";
import {
   useCreateEvent,
   useGetAnnouncements,
   useGetUpcomingEvents,
} from "../../services/events";
import { useEffect, useState } from "react";
import NoAnnouncement from "../../components/empty/NoAnnouncement";
import AnnouncementLoader from "../../components/loaders/announcementLoader";
import { formatEventDate, formatEventTime } from "../../helpers/dateUtils";

const Dashboard = () => {
   const [expandedEventId, setExpandedEventId] = useState(null);
   const [showAllEvents, setShowAllEvents] = useState(false);
   const [showAnnouncementForm, setShowAnnouncementForm] = useState(false);
   const [announcementData, setAnnouncementData] = useState({
      title: "",
      description: "",
      dateTime: "",
      venue: "",
   });
   // Sample data - replace with actual data from API
   const {
      upcomingEvents,
      setUpcomingEvents,
      announcements,
      setAnnouncements,
   } = userStore();

   const { data: UEvents, isSuccess } = useGetUpcomingEvents();
   const { mutate: announce, isLoading } = useCreateEvent();
   const {
      data: aInfo,
      isSuccess: aSuccess,
      isLoading: aLoading,
   } = useGetAnnouncements();

   useEffect(() => {
      if (isSuccess && UEvents) setUpcomingEvents(UEvents.events);
      if (aSuccess && aInfo) setAnnouncements(aInfo.announcements);
   }, [isSuccess, UEvents, aSuccess, aInfo]);

   // add an announcement
   const handleAddAnnouncement = () => {
      announce(
         {
            title: announcementData.title,
            description: announcementData.description,
            startDateTime: announcementData.dateTime,
            category: "Announcement",
            eventLocation: announcementData.venue,
         },
         {
            onSuccess: () => {
               setAnnouncementData({
                  title: "",
                  description: "",
                  dateTime: "",
                  venue: "",
               });
               setShowAnnouncementForm(false);
            },
            onError: (e) => {
               console.log("Error happened:", e.message);
            },
         },
      );
   };

   const quickLinks = [
      {
         name: "Library",
         icon: faBook,
         to: "/dashboard/library",
         color: "from-blue-500 to-blue-600",
      },
      {
         name: "Ministries",
         icon: faUsers,
         to: "/dashboard/ministries/music",
         color: "from-purple-500 to-purple-600",
      },
      {
         name: "About Us",
         icon: faChurch,
         to: "/dashboard/about",
         color: "from-emerald-500 to-emerald-600",
      },
      {
         name: "Gallery",
         icon: faHeart,
         to: "/dashboard/gallery",
         color: "from-pink-500 to-pink-600",
      },
   ];

   return (
      <div className='animate-fadeIn'>
         {/* Welcome Banner */}
         <section className='relative bg-linear-to-r from-[#3298C8] to-sky-600 text-white py-16 px-6 overflow-hidden'>
            {/* Decorative Elements */}
            <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2'></div>
            <div className='absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2'></div>

            <div className='max-w-7xl mx-auto relative z-10'>
               <h1 className='text-3xl md:text-4xl font-bold mb-2'>
                  Welcome Back!
               </h1>
               <p className='text-sky-100 text-lg'>
                  We&apos;re glad to have you here. Explore your dashboard and
                  stay connected.
               </p>
            </div>
         </section>

         <div className='max-w-7xl mx-auto px-6 py-10'>
            {/* Quick Links Grid */}
            <section className='mb-12'>
               <h2 className='text-xl font-bold text-gray-800 mb-6 flex items-center gap-2'>
                  <span className='w-1 h-6 bg-[#3298C8] rounded-full'></span>
                  Quick Access
               </h2>
               <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                  {quickLinks.map((link) => (
                     <Link
                        key={link.name}
                        to={link.to}
                        className='group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden'
                     >
                        <div
                           className={`absolute inset-0 bg-linear-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        ></div>
                        <div className='relative z-10'>
                           <div
                              className={`w-12 h-12 bg-linear-to-br ${link.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:bg-white/20 transition-colors`}
                           >
                              <FontAwesomeIcon
                                 icon={link.icon}
                                 className='text-lg'
                              />
                           </div>
                           <h3 className='font-semibold text-gray-800 group-hover:text-white transition-colors'>
                              {link.name}
                           </h3>
                        </div>
                     </Link>
                  ))}
               </div>
            </section>

            <div className='grid md:grid-cols-3 gap-8'>
               {/* Upcoming Events */}
               <section className='md:col-span-2'>
                  <div className='bg-white rounded-2xl shadow-md p-6'>
                     <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-xl font-bold text-gray-800 flex items-center gap-2'>
                           <FontAwesomeIcon
                              icon={faCalendarAlt}
                              className='text-[#3298C8]'
                           />
                           Upcoming Events
                        </h2>
                        <button
                           onClick={() => setShowAllEvents(!showAllEvents)}
                           className='text-sm text-[#3298C8] hover:underline flex items-center gap-1 font-semibold'
                        >
                           {showAllEvents ? "Show Less" : "View All"}
                           <FontAwesomeIcon
                              icon={faArrowRight}
                              className='text-xs'
                           />
                        </button>
                     </div>

                     <div className='space-y-4'>
                        {(showAllEvents
                           ? upcomingEvents
                           : upcomingEvents.slice(0, 3)
                        ).map((event) => {
                           const { month, day } = formatEventDate(
                              event.startDateTime,
                           );
                           const time = formatEventTime(event.startDateTime);
                           const isExpanded = expandedEventId === event.eventID;
                           return (
                              <div
                                 key={event.eventID}
                                 className={`bg-gray-50 rounded-xl transition-all duration-300 ${isExpanded ? "ring-2 ring-[#3298C8]" : "hover:bg-sky-50"}`}
                              >
                                 {/* Event Header */}
                                 <div
                                    onClick={() =>
                                       setExpandedEventId(
                                          isExpanded ? null : event.eventID,
                                       )
                                    }
                                    className='flex items-center gap-4 p-4 cursor-pointer'
                                 >
                                    <div className='w-14 h-14 bg-linear-to-br from-[#3298C8] to-sky-500 rounded-xl flex flex-col items-center justify-center text-white'>
                                       <span className='text-xs font-medium'>
                                          {month}
                                       </span>
                                       <span className='text-lg font-bold leading-none'>
                                          {day}
                                       </span>
                                    </div>
                                    <div className='flex-1'>
                                       <h4 className='font-semibold text-gray-800 group-hover:text-[#3298C8] transition-colors'>
                                          {event.title}
                                       </h4>
                                       <p className='text-sm text-gray-500 flex items-center gap-1'>
                                          <FontAwesomeIcon
                                             icon={faClock}
                                             className='text-xs'
                                          />
                                          {time}
                                       </p>
                                    </div>
                                    <FontAwesomeIcon
                                       icon={faChevronDown}
                                       className={`text-gray-400 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
                                    />
                                 </div>

                                 {/* Event Details (Expanded) */}
                                 {isExpanded && (
                                    <div className='border-t border-gray-200 bg-white rounded-b-xl overflow-hidden'>
                                       {/* Event Image at Top */}
                                       <img
                                          src={
                                             event.imageURL &&
                                             "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=500&fit=crop"
                                          }
                                          alt={event.title}
                                          className='w-full h-56 object-cover'
                                       />

                                       {/* Details Section */}
                                       <div className='p-4 space-y-4'>
                                          <div>
                                             <h5 className='text-sm font-semibold text-gray-700 mb-2'>
                                                Description
                                             </h5>
                                             <p className='text-sm text-gray-600 leading-relaxed'>
                                                {event.description ||
                                                   "No description provided"}
                                             </p>
                                          </div>

                                          <div className='grid grid-cols-2 gap-4'>
                                             <div>
                                                <h5 className='text-sm font-semibold text-gray-700 mb-1'>
                                                   Location
                                                </h5>
                                                <p className='text-sm text-gray-600'>
                                                   {event.eventLocation ||
                                                      "TBD"}
                                                </p>
                                             </div>
                                             <div>
                                                <h5 className='text-sm font-semibold text-gray-700 mb-1'>
                                                   Category
                                                </h5>
                                                <p className='text-sm text-gray-600'>
                                                   {event.category || "General"}
                                                </p>
                                             </div>
                                          </div>

                                          {/* Event Creator Info */}
                                          <div>
                                             <h5 className='text-sm font-semibold text-gray-700 mb-2'>
                                                Event Creator
                                             </h5>
                                             {event.user ? (
                                                <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-lg'>
                                                   <div className='w-10 h-10 bg-linear-to-br from-[#3298C8] to-sky-500 rounded-full flex items-center justify-center text-white font-bold text-sm'>
                                                      {event.user.userName?.[0]?.toUpperCase() ||
                                                         "?"}
                                                   </div>
                                                   <div>
                                                      <p className='text-sm font-medium text-gray-800'>
                                                         {event.user.userName ||
                                                            "Unknown"}
                                                      </p>
                                                      <p className='text-xs text-gray-500'>
                                                         {event.user.email ||
                                                            "No email"}
                                                      </p>
                                                   </div>
                                                </div>
                                             ) : (
                                                <p className='text-sm text-gray-500 italic'>
                                                   Creator details not available
                                                </p>
                                             )}
                                          </div>

                                          {event.maxAttendees && (
                                             <div>
                                                <h5 className='text-sm font-semibold text-gray-700 mb-1'>
                                                   Max Attendees
                                                </h5>
                                                <p className='text-sm text-gray-600'>
                                                   {event.maxAttendees}
                                                </p>
                                             </div>
                                          )}
                                       </div>
                                    </div>
                                 )}
                              </div>
                           );
                        })}
                     </div>
                  </div>
               </section>

               {/* Notifications / Announcements */}
               <section>
                  <div className='bg-white rounded-2xl shadow-md p-6'>
                     <div className='flex items-center justify-between mb-6'>
                        <h2 className='text-xl font-bold text-gray-800 flex items-center gap-2'>
                           <FontAwesomeIcon
                              icon={faBell}
                              className='text-amber-500'
                           />
                           Announcements
                        </h2>
                        <button
                           onClick={() =>
                              setShowAnnouncementForm(!showAnnouncementForm)
                           }
                           className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
                              showAnnouncementForm
                                 ? "bg-red-100 text-red-500 hover:bg-red-200"
                                 : "bg-amber-100 text-amber-600 hover:bg-amber-200"
                           }`}
                        >
                           <FontAwesomeIcon
                              icon={showAnnouncementForm ? faTimes : faPlus}
                              className='text-sm'
                           />
                        </button>
                     </div>

                     {showAnnouncementForm ? (
                        /* Announcement Form */
                        <div className='space-y-4 animate-scaleIn'>
                           <div>
                              <label className='block text-xs font-semibold text-gray-500 uppercase mb-1'>
                                 Title
                              </label>
                              <input
                                 type='text'
                                 value={announcementData.title}
                                 onChange={(e) =>
                                    setAnnouncementData((prev) => ({
                                       ...prev,
                                       title: e.target.value,
                                    }))
                                 }
                                 placeholder='Announcement title...'
                                 className='w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all text-sm'
                              />
                           </div>
                           <div>
                              <label className='block text-xs font-semibold text-gray-500 uppercase mb-1'>
                                 Description
                              </label>
                              <textarea
                                 value={announcementData.description}
                                 onChange={(e) =>
                                    setAnnouncementData((prev) => ({
                                       ...prev,
                                       description: e.target.value,
                                    }))
                                 }
                                 placeholder='Describe the announcement...'
                                 rows={3}
                                 className='w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all text-sm resize-none'
                              />
                           </div>
                           <div className='grid grid-cols-2 gap-3'>
                              <div>
                                 <label className='block text-xs font-semibold text-gray-500 uppercase mb-1'>
                                    <FontAwesomeIcon
                                       icon={faClock}
                                       className='mr-1 text-amber-500'
                                    />
                                    Date & Time
                                 </label>
                                 <input
                                    type='datetime-local'
                                    value={announcementData.dateTime}
                                    onChange={(e) =>
                                       setAnnouncementData((prev) => ({
                                          ...prev,
                                          dateTime: e.target.value,
                                       }))
                                    }
                                    className='w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all text-sm'
                                 />
                              </div>
                              <div>
                                 <label className='block text-xs font-semibold text-gray-500 uppercase mb-1'>
                                    <FontAwesomeIcon
                                       icon={faMapMarkerAlt}
                                       className='mr-1 text-amber-500'
                                    />
                                    Venue
                                 </label>
                                 <input
                                    type='text'
                                    value={announcementData.venue}
                                    onChange={(e) =>
                                       setAnnouncementData((prev) => ({
                                          ...prev,
                                          venue: e.target.value,
                                       }))
                                    }
                                    placeholder='Location...'
                                    className='w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-amber-200 focus:border-amber-400 transition-all text-sm'
                                 />
                              </div>
                           </div>
                           <button
                              onClick={handleAddAnnouncement}
                              disabled={isLoading}
                              className='w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-xl font-semibold transition-all'
                           >
                              {isLoading
                                 ? "Adding Announcement..."
                                 : "Post Announcement"}
                           </button>
                        </div>
                     ) : aLoading ? (
                        <AnnouncementLoader
                           info={"Checking for announcements"}
                        />
                     ) : (
                        /* Announcements List */
                        <div className='space-y-4'>
                           {announcements && announcements.length > 0 ? (
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
                                 info={"Click the + button to add one"}
                              />
                           )}
                        </div>
                     )}
                  </div>
               </section>
            </div>

            {/* Scripture of the Day */}
            <section className='mt-8'>
               <div className='bg-linear-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white relative overflow-hidden'>
                  <div className='absolute top-0 right-0 w-40 h-40 bg-[#3298C8]/20 rounded-full -translate-y-1/2 translate-x-1/2'></div>
                  <div className='relative z-10'>
                     <p className='text-sky-300 text-sm font-semibold uppercase tracking-wider mb-2'>
                        Scripture of the Day
                     </p>
                     <blockquote className='text-xl md:text-2xl font-light italic mb-4'>
                        &quot;Trust in the LORD with all your heart and lean not
                        on your own understanding; in all your ways submit to
                        him, and he will make your paths straight.&quot;
                     </blockquote>
                     <p className='text-sky-200 font-medium'>
                        — Proverbs 3:5-6
                     </p>
                  </div>
               </div>
            </section>
         </div>
      </div>
   );
};

export default Dashboard;
