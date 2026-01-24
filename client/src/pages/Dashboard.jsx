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
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Dashboard = () => {
   // Sample data - replace with actual data from API
   const upcomingEvents = [
      {
         id: 1,
         title: "Youth Bible Camp",
         date: "Jan 25, 2026",
         time: "8:00 AM",
      },
      { id: 2, title: "Music Concert", date: "Feb 14, 2026", time: "6:00 PM" },
      {
         id: 3,
         title: "Community Outreach",
         date: "Mar 02, 2026",
         time: "9:00 AM",
      },
   ];

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
         <section className='relative bg-gradient-to-r from-[#3298C8] to-sky-600 text-white py-16 px-6 overflow-hidden'>
            {/* Decorative Elements */}
            <div className='absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2'></div>
            <div className='absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2'></div>

            <div className='max-w-7xl mx-auto relative z-10'>
               <h1 className='text-3xl md:text-4xl font-bold mb-2'>
                  Welcome Back!
               </h1>
               <p className='text-sky-100 text-lg'>
                  We're glad to have you here. Explore your dashboard and stay
                  connected.
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
                           className={`absolute inset-0 bg-gradient-to-br ${link.color} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                        ></div>
                        <div className='relative z-10'>
                           <div
                              className={`w-12 h-12 bg-gradient-to-br ${link.color} rounded-xl flex items-center justify-center text-white mb-4 group-hover:bg-white/20 transition-colors`}
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
                        <Link
                           to='/'
                           className='text-sm text-[#3298C8] hover:underline flex items-center gap-1'
                        >
                           View All
                           <FontAwesomeIcon
                              icon={faArrowRight}
                              className='text-xs'
                           />
                        </Link>
                     </div>

                     <div className='space-y-4'>
                        {upcomingEvents.map((event) => (
                           <div
                              key={event.id}
                              className='flex items-center gap-4 p-4 bg-gray-50 rounded-xl hover:bg-sky-50 transition-colors group cursor-pointer'
                           >
                              <div className='w-14 h-14 bg-gradient-to-br from-[#3298C8] to-sky-500 rounded-xl flex flex-col items-center justify-center text-white'>
                                 <span className='text-xs font-medium'>
                                    {event.date.split(" ")[0]}
                                 </span>
                                 <span className='text-lg font-bold leading-none'>
                                    {event.date.split(" ")[1].replace(",", "")}
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
                                    {event.time}
                                 </p>
                              </div>
                              <FontAwesomeIcon
                                 icon={faArrowRight}
                                 className='text-gray-300 group-hover:text-[#3298C8] transition-colors'
                              />
                           </div>
                        ))}
                     </div>
                  </div>
               </section>

               {/* Notifications / Announcements */}
               <section>
                  <div className='bg-white rounded-2xl shadow-md p-6'>
                     <h2 className='text-xl font-bold text-gray-800 flex items-center gap-2 mb-6'>
                        <FontAwesomeIcon
                           icon={faBell}
                           className='text-amber-500'
                        />
                        Announcements
                     </h2>

                     <div className='space-y-4'>
                        <div className='p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-xl'>
                           <h4 className='font-semibold text-gray-800 text-sm'>
                              Sabbath Service
                           </h4>
                           <p className='text-xs text-gray-600 mt-1'>
                              Join us every Saturday at 9:00 AM for worship
                              service.
                           </p>
                        </div>

                        <div className='p-4 bg-sky-50 border-l-4 border-[#3298C8] rounded-r-xl'>
                           <h4 className='font-semibold text-gray-800 text-sm'>
                              Prayer Meeting
                           </h4>
                           <p className='text-xs text-gray-600 mt-1'>
                              Wednesday and Friday evenings at 6:00 PM.
                           </p>
                        </div>

                        <div className='p-4 bg-emerald-50 border-l-4 border-emerald-400 rounded-r-xl'>
                           <h4 className='font-semibold text-gray-800 text-sm'>
                              New Members
                           </h4>
                           <p className='text-xs text-gray-600 mt-1'>
                              Welcome! Visit our About page to learn more about
                              us.
                           </p>
                        </div>
                     </div>
                  </div>
               </section>
            </div>

            {/* Scripture of the Day */}
            <section className='mt-8'>
               <div className='bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl p-8 text-white relative overflow-hidden'>
                  <div className='absolute top-0 right-0 w-40 h-40 bg-[#3298C8]/20 rounded-full -translate-y-1/2 translate-x-1/2'></div>
                  <div className='relative z-10'>
                     <p className='text-sky-300 text-sm font-semibold uppercase tracking-wider mb-2'>
                        Scripture of the Day
                     </p>
                     <blockquote className='text-xl md:text-2xl font-light italic mb-4'>
                        "Trust in the LORD with all your heart and lean not on
                        your own understanding; in all your ways submit to him,
                        and he will make your paths straight."
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
