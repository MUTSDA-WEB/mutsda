import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import NoData from "../components/empty/NoData";
import {
   faHandHoldingHeart,
   faCartShopping,
   faHeartPulse,
   faShirt,
   faUsersViewfinder,
   faCircleCheck,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import userStore from "../hooks/useStore";

const Welfare = () => {
   const siteData = userStore((state) => state.siteData);
   const merchandise = siteData?.merchandise || [];

   return (
      <div className='bg-[#F6EBEB] min-h-screen'>
         {/* 1. HERO SECTION */}
         <section className='bg-linear-to-r from-rose-500 to-rose-600 py-20 text-white text-center px-6'>
            <FontAwesomeIcon
               icon={faHandHoldingHeart}
               size='3x'
               className='mb-6 opacity-40'
            />
            <h1 className='text-5xl font-black uppercase tracking-tighter mb-4'>
               Welfare Ministry
            </h1>
            <p className='text-xl max-w-2xl mx-auto font-light'>
               &quot;Pure religion and undefiled before God and the Father is
               this, To visit the fatherless and widows in their
               affliction.&quot; — James 1:27
            </p>
         </section>

         <div className='max-w-7xl mx-auto py-16 px-6 space-y-24'>
            {/* 2. CORE MISSION & ACTIVITIES */}
            <section className='grid lg:grid-cols-2 gap-16 items-center'>
               <div className='space-y-8'>
                  <h2 className='text-4xl font-bold text-gray-800 leading-tight'>
                     Serving Our Community <br />
                     <span className='text-rose-500 underline'>With Love.</span>
                  </h2>
                  <p className='text-gray-600 text-lg'>
                     The Welfare Department is the hands and feet of MUTSDA. We
                     provide emotional, spiritual, and financial support to
                     those in need within our congregation and the surrounding
                     neighborhood.
                  </p>
                  <div className='space-y-4'>
                     {[
                        "Hospital Visitations",
                        "Food Bank Distribution",
                        "Student Support Fund",
                        "Widow & Orphan Care",
                     ].map((item, i) => (
                        <div
                           key={i}
                           className='flex items-center gap-4 text-gray-700 font-semibold'
                        >
                           <FontAwesomeIcon
                              icon={faCircleCheck}
                              className='text-rose-500'
                           />
                           {item}
                        </div>
                     ))}
                  </div>
               </div>
               <div className='rounded-[3rem] overflow-hidden shadow-2xl'>
                  <img
                     src='https://images.unsplash.com/photo-1469571483399-af239969ef4d?q=80&w=1200'
                     alt='Community Service'
                     className='w-full h-full object-cover'
                  />
               </div>
            </section>

            {/* 3. THE WELFARE SHOP (Business for Cash Raising) */}
            <section className='bg-white rounded-[3rem] p-10 md:p-16 shadow-xl border border-rose-100'>
               <div className='flex flex-col md:flex-row justify-between items-end mb-12 gap-6'>
                  <div className='space-y-2'>
                     <div className='flex items-center gap-3 text-rose-500'>
                        <FontAwesomeIcon icon={faShirt} />
                        <span className='font-bold uppercase tracking-widest text-xs'>
                           Support the Mission
                        </span>
                     </div>
                     <h2 className='text-3xl font-black text-gray-900'>
                        MUTSDA Apparel Store
                     </h2>
                     <p className='text-gray-500 max-w-md'>
                        All proceeds from these sales go directly into the
                        Welfare Fund to support needy families.
                     </p>
                  </div>
                  <button className='bg-gray-900 text-white px-8 py-3 rounded-2xl font-bold flex items-center gap-3 hover:bg-rose-600 transition-colors'>
                     <FontAwesomeIcon icon={faCartShopping} /> View Full Catalog
                  </button>
               </div>

               <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10'>
                  {merchandise.length === 0 ? (
                     <div className='col-span-full'>
                        <NoData info='No merchandise available.' />
                     </div>
                  ) : (
                     merchandise.map((item) => (
                        <div key={item.id} className='group cursor-pointer'>
                           <div className='relative h-80 rounded-3xl overflow-hidden mb-4 shadow-md group-hover:shadow-xl transition-all'>
                              <img
                                 src={item.img}
                                 alt={item.name}
                                 className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                              />
                              <div className='absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full font-black text-rose-600 text-sm'>
                                 {item.price}
                              </div>
                           </div>
                           <h4 className='font-bold text-gray-800 text-lg'>
                              {item.name}
                           </h4>
                           <p className='text-sm text-gray-400 mb-4 italic'>
                              Funds raised go to Welfare projects
                           </p>
                           <button className='w-full border-2 border-gray-100 py-2.5 rounded-xl font-bold text-gray-600 group-hover:bg-rose-50 group-hover:border-rose-200 group-hover:text-rose-600 transition-all'>
                              Buy to Support
                           </button>
                        </div>
                     ))
                  )}
               </div>
            </section>

            {/* 4. CALL TO ACTION: GIVE DIRECTLY */}
            <section className='grid md:grid-cols-2 gap-8'>
               <div className='bg-rose-500 p-10 rounded-[2.5rem] text-white space-y-6 shadow-lg'>
                  <FontAwesomeIcon
                     icon={faHeartPulse}
                     size='2xl'
                     className='opacity-50'
                  />
                  <h3 className='text-2xl font-bold'>Emergency Welfare Fund</h3>
                  <p className='opacity-90 leading-relaxed'>
                     Prefer to give a direct donation? Your contribution helps
                     us respond immediately to hospital emergencies and funeral
                     support within our church family.
                  </p>
                  <Link
                     to='/donate'
                     className='bg-white text-rose-600 px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm shadow-xl'
                  >
                     Donate Now
                  </Link>
               </div>
               <div className='bg-gray-900 p-10 rounded-[2.5rem] text-white flex flex-col justify-center'>
                  <div className='flex items-center gap-4 mb-4'>
                     <FontAwesomeIcon
                        icon={faUsersViewfinder}
                        className='text-rose-400 text-2xl'
                     />
                     <h3 className='text-xl font-bold'>Join the Team</h3>
                  </div>
                  <p className='text-gray-400 text-sm mb-8'>
                     We are always looking for volunteers to help with hospital
                     visitations and community outreach programs.
                  </p>
                  <button className='w-full border border-white/20 py-3 rounded-xl hover:bg-white hover:text-black font-bold transition-all'>
                     Volunteer with Welfare
                  </button>
               </div>
            </section>
         </div>
      </div>
   );
};

export default Welfare;
