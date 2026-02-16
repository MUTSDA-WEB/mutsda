import { useState, useMemo } from "react";
import NoData from "../components/empty/NoData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faDownload,
   faSearch,
   faBook,
   faMusic,
   faNotesMedical,
   faUsers,
   faLayerGroup,
   faCross,
} from "@fortawesome/free-solid-svg-icons";
import userStore from "../hooks/useStore";

// Use dynamic data from Zustand store
const Library = () => {
   const siteData = userStore((state) => state.siteData);
   const libraryData = siteData?.library || [];
   const [searchTerm, setSearchTerm] = useState("");
   const [activeTab, setActiveTab] = useState("All");

   // Filter Logic
   const filteredBooks = useMemo(() => {
      return libraryData.filter((book) => {
         const matchesSearch = book.title
            .toLowerCase()
            .includes(searchTerm.toLowerCase());
         const matchesTab =
            activeTab === "All" ||
            book.category === activeTab ||
            book.series === activeTab;
         return matchesSearch && matchesTab;
      });
   }, [searchTerm, activeTab]);

   const categories = [
      "All",
      "Bibles",
      "Conflict of the Ages",
      "Testimonies",
      "Health",
      "Church Resources",
   ];

   return (
      <div className='flex flex-col md:flex-row min-h-screen bg-[#F6EBEB]'>
         {/* 2. SIDEBAR NAVIGATION */}
         <aside className='w-full md:w-64 bg-white shadow-lg p-6 space-y-8 z-10'>
            <div>
               <h2 className='text-[#3298C8] font-bold uppercase text-xs tracking-widest mb-4'>
                  Categories
               </h2>
               <div className='flex flex-col gap-2'>
                  {categories.map((cat) => (
                     <button
                        key={cat}
                        onClick={() => setActiveTab(cat)}
                        className={`text-left px-4 py-2 rounded-lg text-sm transition-all ${
                           activeTab === cat
                              ? "bg-[#3298C8] text-white shadow-md"
                              : "text-gray-600 hover:bg-sky-50"
                        }`}
                     >
                        {cat}
                     </button>
                  ))}
               </div>
            </div>

            <div className='pt-6 border-t border-gray-100'>
               <p className='text-xs text-gray-400 italic'>
                  Total Resources: {libraryData.length}
               </p>
            </div>
         </aside>

         {/* 3. MAIN CONTENT */}
         <main className='flex-1 p-6 md:p-10'>
            {/* Search Header */}
            <div className='mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6'>
               <div>
                  <h1 className='text-3xl font-bold text-gray-800'>
                     Resource Library
                  </h1>
                  <p className='text-gray-500'>
                     Search and download spiritual materials
                  </p>
               </div>
               <div className='relative w-full md:w-96'>
                  <FontAwesomeIcon
                     icon={faSearch}
                     className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                  />
                  <input
                     type='text'
                     placeholder='Search by title...'
                     className='w-full pl-12 pr-4 py-3 rounded-full border-none shadow-md focus:ring-2 focus:ring-sky-400 outline-none'
                     onChange={(e) => setSearchTerm(e.target.value)}
                  />
               </div>
            </div>

            {/* Results Grid */}
            {filteredBooks.length === 0 ? (
               <NoData info='No resources found.' />
            ) : (
               <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6'>
                  {filteredBooks.map((book) => (
                     <div
                        key={book.id}
                        className='bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-sky-200 transition-all flex flex-col justify-between group'
                     >
                        <div>
                           <div className='flex justify-between items-start mb-4'>
                              <div
                                 className={`p-3 rounded-xl bg-sky-50 text-[#3298C8]`}
                              >
                                 <FontAwesomeIcon
                                    icon={getIcon(book.series)}
                                    className='text-xl'
                                 />
                              </div>
                              <span className='text-[10px] font-bold bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase'>
                                 {book.format}
                              </span>
                           </div>
                           <h3 className='font-bold text-gray-800 mb-1 group-hover:text-sky-600 transition-colors'>
                              {book.title}
                           </h3>
                           <p className='text-xs text-sky-500 font-medium mb-3'>
                              {book.series}
                           </p>
                           <p className='text-[11px] text-gray-400'>
                              File size: {book.size}
                           </p>
                        </div>

                        <button className='mt-6 flex items-center justify-center gap-2 w-full bg-[#3298C8] text-white py-2 rounded-lg hover:bg-sky-600 transition-colors shadow-sm'>
                           <FontAwesomeIcon
                              icon={faDownload}
                              className='text-xs'
                           />
                           Download
                        </button>
                     </div>
                  ))}
               </div>
            )}
         </main>
      </div>
   );
};

// Icon Helper
const getIcon = (series) => {
   switch (series) {
      case "Bibles":
         return faBook;
      case "Music":
         return faMusic;
      case "Health":
         return faNotesMedical;
      case "Conflict of the Ages":
         return faCross;
      case "Testimonies":
         return faLayerGroup;
      default:
         return faUsers;
   }
};

export default Library;
