import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faLocationDot,
   faPhone,
   faEnvelope,
   faClock,
   faShareNodes,
   faTimes,
   faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
   faFacebook,
   faWhatsapp,
   faSquareXTwitter,
} from "@fortawesome/free-brands-svg-icons";

const Contact = () => {
   const [showMap, setShowMap] = useState(false);

   return (
      <div className='bg-[#F6EBEB] min-h-screen animate-fadeIn'>
         {/* 1. MAP SECTION */}
         <section className='h-100 w-full bg-gray-300 relative overflow-hidden'>
            {/* Background Image */}
            <div
               className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  showMap ? "opacity-0 scale-110" : "opacity-100 scale-100"
               }`}
            >
               <img
                  src='https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?q=80&w=2000&auto=format&fit=crop'
                  alt='Map Placeholder'
                  className='w-full h-full object-cover grayscale opacity-80'
               />
            </div>

            {/* Google Maps Embed */}
            <div
               className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  showMap ? "opacity-100 scale-100" : "opacity-0 scale-95"
               }`}
            >
               <iframe
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.506738741153!2d37.14463731096367!3d-0.7160606352666001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x18289873299b19ed%3A0x97675389aba81506!2sMurang%E2%80%99a%20University%20of%20Technology%20(MUT)!5e0!3m2!1sen!2ske!4v1769227266841!5m2!1sen!2ske'
                  width='100%'
                  height='100%'
                  style={{ border: 0 }}
                  allowFullScreen=''
                  loading='lazy'
                  referrerPolicy='no-referrer-when-downgrade'
                  title="Murang'a University of Technology Map"
                  className='w-full h-full'
               ></iframe>
            </div>

            {/* Visit Us Card - Shows when map is hidden */}
            <div
               className={`absolute inset-0 flex items-center justify-center transition-all duration-500 ${
                  showMap
                     ? "opacity-0 pointer-events-none scale-95"
                     : "opacity-100 scale-100"
               }`}
            >
               <div
                  onClick={() => setShowMap(true)}
                  className='bg-white p-6 rounded-3xl shadow-2xl flex items-center gap-4 border-2 border-[#3298C8] cursor-pointer hover:shadow-sky-200/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group'
               >
                  <div className='bg-[#3298C8] p-4 rounded-2xl text-white group-hover:bg-sky-500 transition-colors'>
                     <FontAwesomeIcon icon={faLocationDot} size='xl' />
                  </div>
                  <div>
                     <h3 className='font-bold text-gray-800'>Visit Us</h3>
                     <p className='text-sm text-gray-500'>
                        Murang&apos;a University of Technology
                     </p>
                     <p className='text-xs text-[#3298C8] mt-1 flex items-center gap-1 font-medium'>
                        <FontAwesomeIcon
                           icon={faMapMarkerAlt}
                           className='text-[10px]'
                        />
                        Click to view map
                     </p>
                  </div>
               </div>
            </div>

            {/* Close Map Button - Shows when map is visible */}
            <div
               className={`absolute top-4 right-4 z-20 transition-all duration-500 ${
                  showMap
                     ? "opacity-100 scale-100"
                     : "opacity-0 pointer-events-none scale-95"
               }`}
            >
               <button
                  onClick={() => setShowMap(false)}
                  className='bg-white hover:bg-gray-100 text-gray-800 px-5 py-3 rounded-full shadow-lg flex items-center gap-2 font-semibold transition-all duration-300 hover:shadow-xl'
               >
                  <FontAwesomeIcon icon={faTimes} />
                  Close Map
               </button>
            </div>

            {/* Location Badge - Shows on map */}
            <div
               className={`absolute bottom-4 left-4 z-20 transition-all duration-500 ${
                  showMap
                     ? "opacity-100 translate-y-0"
                     : "opacity-0 translate-y-4 pointer-events-none"
               }`}
            >
               <div className='bg-white/95 backdrop-blur-sm px-4 py-3 rounded-2xl shadow-lg flex items-center gap-3'>
                  <div className='bg-[#3298C8] p-2 rounded-xl text-white'>
                     <FontAwesomeIcon icon={faLocationDot} />
                  </div>
                  <div>
                     <p className='font-bold text-gray-800 text-sm'>
                        Murang'a University of Technology
                     </p>
                     <p className='text-xs text-gray-500'>
                        Murang'a Town, Kenya
                     </p>
                  </div>
               </div>
            </div>
         </section>

         <div className='max-w-7xl mx-auto py-20 px-6 grid grid-cols-1 lg:grid-cols-12 gap-16'>
            {/* 2. CONTACT INFO (Left Column) */}
            <div className='lg:col-span-5 space-y-12'>
               <div className='space-y-4'>
                  <h1 className='text-5xl font-black text-gray-900 tracking-tighter uppercase'>
                     Reach Out
                  </h1>
                  <p className='text-lg text-gray-600 leading-relaxed'>
                     Whether you are looking for a spiritual home, need prayer,
                     or want to learn more about our ministries, we are here for
                     you.
                  </p>
               </div>

               <div className='space-y-8'>
                  {/* Phone */}
                  <div className='flex items-start gap-6 group'>
                     <div className='w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#3298C8] shadow-sm group-hover:bg-[#3298C8] group-hover:text-white transition-all'>
                        <FontAwesomeIcon icon={faPhone} />
                     </div>
                     <div>
                        <h4 className='font-bold text-gray-800'>Call Us</h4>
                        <p className='text-gray-500 text-sm'>
                           +254 700 000 000
                        </p>
                     </div>
                  </div>

                  {/* Email */}
                  <div className='flex items-start gap-6 group'>
                     <div className='w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#3298C8] shadow-sm group-hover:bg-[#3298C8] group-hover:text-white transition-all'>
                        <FontAwesomeIcon icon={faEnvelope} />
                     </div>
                     <div>
                        <h4 className='font-bold text-gray-800'>Email Us</h4>
                        <p className='text-gray-500 text-sm'>info@mutsda.org</p>
                     </div>
                  </div>

                  {/* Hours */}
                  <div className='flex items-start gap-6 group'>
                     <div className='w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#3298C8] shadow-sm group-hover:bg-[#3298C8] group-hover:text-white transition-all'>
                        <FontAwesomeIcon icon={faClock} />
                     </div>
                     <div>
                        <h4 className='font-bold text-gray-800'>
                           Service Hours
                        </h4>
                        <p className='text-gray-500 text-sm'>
                           Sat: 8:00am - 6:00pm
                        </p>
                        <p className='text-gray-500 text-sm'>
                           Wed & Fri: 6:00pm - 8:00pm
                        </p>
                     </div>
                  </div>
               </div>

               {/* Social Links */}
               <div className='pt-8 border-t border-gray-200'>
                  <h4 className='text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-6 flex items-center gap-2'>
                     <FontAwesomeIcon icon={faShareNodes} /> Follow Our Journey
                  </h4>
                  <div className='flex gap-4'>
                     <button className='w-12 h-12 rounded-full bg-white text-blue-600 shadow-sm flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all'>
                        <FontAwesomeIcon icon={faFacebook} size='lg' />
                     </button>
                     <button className='w-12 h-12 rounded-full bg-white text-green-600 shadow-sm flex items-center justify-center hover:bg-green-600 hover:text-white transition-all'>
                        <FontAwesomeIcon icon={faWhatsapp} size='lg' />
                     </button>
                     <button className='w-12 h-12 rounded-full bg-white text-black shadow-sm flex items-center justify-center hover:bg-black hover:text-white transition-all'>
                        <FontAwesomeIcon icon={faSquareXTwitter} size='lg' />
                     </button>
                  </div>
               </div>
            </div>

            {/* 3. CONTACT FORM (Right Column) */}
            <div className='lg:col-span-7'>
               <div className='bg-white p-10 md:p-14 rounded-[3rem] shadow-2xl border border-gray-50 relative overflow-hidden'>
                  <div className='absolute top-0 right-0 w-32 h-32 bg-sky-50 rounded-bl-[5rem] z-0'></div>

                  <form className='relative z-10 space-y-6'>
                     <div className='space-y-2'>
                        <label className='text-xs font-bold uppercase text-gray-400 ml-2'>
                           Your Name
                        </label>
                        <input
                           type='text'
                           className='w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#3298C8] transition-all outline-none'
                           placeholder='John Doe'
                        />
                     </div>

                     <div className='grid md:grid-cols-2 gap-6'>
                        <div className='space-y-2'>
                           <label className='text-xs font-bold uppercase text-gray-400 ml-2'>
                              Phone Number
                           </label>
                           <input
                              type='tel'
                              className='w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#3298C8] transition-all outline-none'
                              placeholder='+254...'
                           />
                        </div>
                        <div className='space-y-2'>
                           <label className='text-xs font-bold uppercase text-gray-400 ml-2'>
                              Email Address
                           </label>
                           <input
                              type='email'
                              className='w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#3298C8] transition-all outline-none'
                              placeholder='john@example.com'
                           />
                        </div>
                     </div>

                     <div className='space-y-2'>
                        <label className='text-xs font-bold uppercase text-gray-400 ml-2'>
                           Subject
                        </label>
                        <select className='w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#3298C8] transition-all outline-none text-gray-500'>
                           <option>General Inquiry</option>
                           <option>Prayer Request</option>
                           <option>Membership</option>
                           <option>Counseling</option>
                        </select>
                     </div>

                     <div className='space-y-2'>
                        <label className='text-xs font-bold uppercase text-gray-400 ml-2'>
                           Message
                        </label>
                        <textarea
                           className='w-full p-4 rounded-2xl bg-gray-50 border-none focus:ring-2 focus:ring-[#3298C8] transition-all outline-none h-40 resize-none'
                           placeholder='How can we help?'
                        ></textarea>
                     </div>

                     <button
                        type='submit'
                        className='w-full bg-[#3298C8] text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-sky-700 shadow-lg shadow-sky-200 transition-all active:scale-[0.98]'
                     >
                        Send Message
                     </button>
                  </form>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Contact;
