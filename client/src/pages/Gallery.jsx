import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faImages,
   faChurch,
   faHandsHelping,
   faUsers,
   faHeart,
   faTimes,
   faChevronLeft,
   faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const Gallery = () => {
   const [selectedCategory, setSelectedCategory] = useState("all");
   const [lightboxOpen, setLightboxOpen] = useState(false);
   const [currentImageIndex, setCurrentImageIndex] = useState(0);

   const categories = [
      { id: "all", name: "All Memories", icon: faImages },
      { id: "baptism", name: "Baptisms", icon: faChurch },
      { id: "evangelism", name: "Evangelism", icon: faHandsHelping },
      { id: "outreach", name: "Community Outreach", icon: faHeart },
      { id: "social", name: "Social Events", icon: faUsers },
   ];

   // Sample gallery data - replace with actual images
   const galleryItems = [
      // Baptism Events
      {
         id: 1,
         category: "baptism",
         title: "Baptism Ceremony 2025",
         date: "December 2025",
         image: "https://images.unsplash.com/photo-1519491050282-cf00c82424fd?q=80&w=800&auto=format&fit=crop",
         description: "A blessed day as 12 souls gave their lives to Christ.",
      },
      {
         id: 2,
         category: "baptism",
         title: "Youth Baptism",
         date: "August 2025",
         image: "https://images.unsplash.com/photo-1438232992991-995b7058bbb3?q=80&w=800&auto=format&fit=crop",
         description: "Young members making their commitment to follow Jesus.",
      },

      // Evangelistic Missions
      {
         id: 3,
         category: "evangelism",
         title: "Evangelistic Crusade",
         date: "October 2025",
         image: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=800&auto=format&fit=crop",
         description:
            "Two-week evangelistic mission reaching hundreds in the community.",
      },
      {
         id: 4,
         category: "evangelism",
         title: "Door-to-Door Outreach",
         date: "September 2025",
         image: "https://images.unsplash.com/photo-1529070538774-1843cb3265df?q=80&w=800&auto=format&fit=crop",
         description: "Members sharing the gospel in the neighborhood.",
      },

      // Community Outreach
      {
         id: 5,
         category: "outreach",
         title: "Hospital Visitation",
         date: "November 2025",
         image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?q=80&w=800&auto=format&fit=crop",
         description:
            "Visiting and praying with patients at the local hospital.",
      },
      {
         id: 6,
         category: "outreach",
         title: "Orphanage Visit",
         date: "July 2025",
         image: "https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop",
         description: "Spending quality time with children at Hope Orphanage.",
      },
      {
         id: 7,
         category: "outreach",
         title: "Prison Ministry",
         date: "June 2025",
         image: "https://images.unsplash.com/photo-1453847668862-487637052f8a?q=80&w=800&auto=format&fit=crop",
         description: "Sharing hope and the Word of God with inmates.",
      },
      {
         id: 8,
         category: "outreach",
         title: "Feeding the Homeless",
         date: "May 2025",
         image: "https://images.unsplash.com/photo-1593113630400-ea4288922497?q=80&w=800&auto=format&fit=crop",
         description: "Community feeding program for those in need.",
      },

      // Social Events
      {
         id: 9,
         category: "social",
         title: "Social Sunday Picnic",
         date: "April 2025",
         image: "https://images.unsplash.com/photo-1529543544277-89c4e3e9c1df?q=80&w=800&auto=format&fit=crop",
         description: "Church family enjoying fellowship and fun activities.",
      },
      {
         id: 10,
         category: "social",
         title: "Fun Day 2025",
         date: "March 2025",
         image: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=800&auto=format&fit=crop",
         description: "Annual fun day with games, food, and laughter.",
      },
      {
         id: 11,
         category: "social",
         title: "Youth Fellowship",
         date: "February 2025",
         image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
         description: "Young adults bonding through activities and worship.",
      },
      {
         id: 12,
         category: "social",
         title: "Christmas Celebration",
         date: "December 2024",
         image: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?q=80&w=800&auto=format&fit=crop",
         description:
            "Celebrating the birth of our Savior together as a church family.",
      },
   ];

   const filteredItems =
      selectedCategory === "all"
         ? galleryItems
         : galleryItems.filter((item) => item.category === selectedCategory);

   const openLightbox = (index) => {
      setCurrentImageIndex(index);
      setLightboxOpen(true);
   };

   const closeLightbox = () => {
      setLightboxOpen(false);
   };

   const goToPrevious = () => {
      setCurrentImageIndex((prev) =>
         prev === 0 ? filteredItems.length - 1 : prev - 1,
      );
   };

   const goToNext = () => {
      setCurrentImageIndex((prev) =>
         prev === filteredItems.length - 1 ? 0 : prev + 1,
      );
   };

   return (
      <div className='flex flex-col animate-fadeIn'>
         {/* HERO SECTION */}
         <section className='relative h-[50vh] flex items-center justify-center text-white overflow-hidden'>
            <div className='absolute inset-0 z-0'>
               <img
                  src='https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=2073&auto=format&fit=crop'
                  alt='Church Memories'
                  className='w-full h-full object-cover brightness-[0.4]'
               />
            </div>

            <div className='relative z-10 text-center px-4'>
               <h1 className='text-4xl md:text-6xl font-bold mb-4 tracking-tight'>
                  Our Gallery
               </h1>
               <p className='text-xl md:text-2xl italic font-light'>
                  Cherishing memories of God&apos;s work in our community
               </p>
            </div>
         </section>

         {/* MAIN CONTENT */}
         <div className='max-w-7xl mx-auto w-full py-16 px-6'>
            {/* Section Title */}
            <div className='text-center mb-12'>
               <div className='inline-block relative'>
                  <h2 className='text-4xl font-black text-gray-800 tracking-tight uppercase'>
                     Past Memories
                  </h2>
                  <div className='absolute -bottom-2 left-0 w-full h-1 bg-[#3298C8] rounded-full'></div>
               </div>
               <p className='mt-6 text-gray-600 max-w-2xl mx-auto'>
                  Browse through our collection of memorable moments - from
                  baptisms and evangelistic missions to community outreach and
                  social gatherings.
               </p>
            </div>

            {/* Category Filter */}
            <div className='flex flex-wrap justify-center gap-3 mb-12'>
               {categories.map((category) => (
                  <button
                     key={category.id}
                     onClick={() => setSelectedCategory(category.id)}
                     className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all duration-300 ${
                        selectedCategory === category.id
                           ? "bg-[#3298C8] text-white shadow-lg scale-105"
                           : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                     }`}
                  >
                     <FontAwesomeIcon icon={category.icon} />
                     <span>{category.name}</span>
                  </button>
               ))}
            </div>

            {/* Gallery Grid */}
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
               {filteredItems.map((item, index) => (
                  <div
                     key={item.id}
                     className='group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2'
                     onClick={() => openLightbox(index)}
                  >
                     <div className='aspect-4/3 overflow-hidden'>
                        <img
                           src={item.image}
                           alt={item.title}
                           className='w-full h-full object-cover group-hover:scale-110 transition-transform duration-500'
                        />
                     </div>

                     {/* Overlay on hover */}
                     <div className='absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4'>
                        <span className='text-[#3298C8] text-sm font-semibold uppercase tracking-wider'>
                           {
                              categories.find((c) => c.id === item.category)
                                 ?.name
                           }
                        </span>
                        <h3 className='text-white font-bold text-lg'>
                           {item.title}
                        </h3>
                        <p className='text-gray-300 text-sm'>{item.date}</p>
                     </div>

                     {/* Category Badge */}
                     <div className='absolute top-3 right-3 bg-[#3298C8] text-white text-xs px-3 py-1 rounded-full font-medium shadow-md'>
                        {item.date}
                     </div>
                  </div>
               ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
               <div className='text-center py-20'>
                  <FontAwesomeIcon
                     icon={faImages}
                     className='text-6xl text-gray-300 mb-4'
                  />
                  <p className='text-gray-500 text-lg'>
                     No memories found in this category yet.
                  </p>
               </div>
            )}

            {/* Call to Action */}
            <div className='mt-20 bg-linear-to-r from-[#3298C8] to-sky-600 rounded-2xl p-10 text-center text-white'>
               <h3 className='text-3xl font-bold mb-4'>
                  Have Photos to Share?
               </h3>
               <p className='text-sky-100 max-w-2xl mx-auto mb-6'>
                  If you have photos from church events that you&apos;d like to add
                  to our gallery, please contact the Communication Ministry.
               </p>
               <a
                  href='/contactUs'
                  className='inline-block bg-white text-[#3298C8] px-8 py-3 rounded-full font-bold hover:bg-sky-50 transition-colors shadow-lg'
               >
                  Contact Us
               </a>
            </div>
         </div>

         {/* Lightbox Modal */}
         {lightboxOpen && filteredItems[currentImageIndex] && (
            <div className='fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4'>
               {/* Close Button */}
               <button
                  onClick={closeLightbox}
                  className='absolute top-4 right-4 text-white text-3xl hover:text-gray-300 transition-colors z-50'
               >
                  <FontAwesomeIcon icon={faTimes} />
               </button>

               {/* Previous Button */}
               <button
                  onClick={goToPrevious}
                  className='absolute left-4 text-white text-4xl hover:text-gray-300 transition-colors z-50 p-2'
               >
                  <FontAwesomeIcon icon={faChevronLeft} />
               </button>

               {/* Image and Info */}
               <div className='max-w-5xl max-h-[90vh] flex flex-col items-center'>
                  <img
                     src={filteredItems[currentImageIndex].image}
                     alt={filteredItems[currentImageIndex].title}
                     className='max-h-[70vh] object-contain rounded-lg'
                  />
                  <div className='text-center mt-6 text-white'>
                     <h3 className='text-2xl font-bold'>
                        {filteredItems[currentImageIndex].title}
                     </h3>
                     <p className='text-[#3298C8] font-medium mt-1'>
                        {filteredItems[currentImageIndex].date}
                     </p>
                     <p className='text-gray-300 mt-2 max-w-xl'>
                        {filteredItems[currentImageIndex].description}
                     </p>
                  </div>
               </div>

               {/* Next Button */}
               <button
                  onClick={goToNext}
                  className='absolute right-4 text-white text-4xl hover:text-gray-300 transition-colors z-50 p-2'
               >
                  <FontAwesomeIcon icon={faChevronRight} />
               </button>

               {/* Image Counter */}
               <div className='absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm'>
                  {currentImageIndex + 1} / {filteredItems.length}
               </div>
            </div>
         )}
      </div>
   );
};

export default Gallery;
