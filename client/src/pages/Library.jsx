import { useState, useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faDownload, faSearch, faBook, faMusic, 
  faNotesMedical, faUsers, faLayerGroup, faCross
} from '@fortawesome/free-solid-svg-icons';

// 1. The Full Data Object
const libraryData = [
  { id: 'kjv', title: 'King James Version', series: 'Bibles', category: 'Bibles', format: 'PDF', size: '2.4 MB' },
  { id: 'hymnal', title: 'SDA Hymnal', series: 'Music', category: 'Church Resources', format: 'PDF', size: '5.1 MB' },
  { id: 'sop-01', title: 'Patriarchs and Prophets', series: 'Conflict of the Ages', category: 'SOP', format: 'PDF', size: '3.2 MB' },
  { id: 'sop-02', title: 'Prophets and Kings', series: 'Conflict of the Ages', category: 'SOP', format: 'PDF', size: '2.8 MB' },
  { id: 'sop-03', title: 'The Desire of Ages', series: 'Conflict of the Ages', category: 'SOP', format: 'PDF', size: '4.5 MB' },
  { id: 'sop-04', title: 'The Acts of the Apostles', series: 'Conflict of the Ages', category: 'SOP', format: 'PDF', size: '2.1 MB' },
  { id: 'sop-05', title: 'The Great Controversy', series: 'Conflict of the Ages', category: 'SOP', format: 'PDF', size: '3.9 MB' },
  { id: 'test-01', title: 'Testimonies for the Church Vol. 1', series: 'Testimonies', category: 'SOP',format: 'PDF', size: '3.9 MB' },
  { id: 'test-02', title: 'Testimonies for the Church Vol. 2', series: 'Testimonies', category: 'SOP',format: 'PDF', size: '3.9 MB' },
  { id: 'test-03', title: 'Testimonies for the Church Vol. 3', series: 'Testimonies', category: 'SOP',format: 'PDF', size: '3.9 MB' },
  { id: 'test-04', title: 'Testimonies for the Church Vol. 4', series: 'Testimonies', category: 'SOP' ,format: 'PDF', size: '3.9 MB'},
  { id: 'test-05', title: 'Testimonies for the Church Vol. 5', series: 'Testimonies', category: 'SOP', format: 'PDF', size: '3.9 MB' },
  { id: 'test-06', title: 'Testimonies for the Church Vol. 6', series: 'Testimonies', category: 'SOP', format: 'PDF', size: '3.9 MB' },
  { id: 'test-07', title: 'Testimonies for the Church Vol. 7', series: 'Testimonies', category: 'SOP' , format: 'PDF', size: '3.9 MB'},
  { id: 'test-08', title: 'Testimonies for the Church Vol. 8', series: 'Testimonies', category: 'SOP' , format: 'PDF', size: '3.9 MB'},
  { id: 'test-09', title: 'Testimonies for the Church Vol. 9', series: 'Testimonies', category: 'SOP', format: 'PDF', size: '3.9 MB' },
  { id: 'home', title: 'The Adventist Home', series: 'Family Life', category: 'SOP', format: 'PDF', size: '1.5 MB' },
  { id: 'home-2, ', title: 'Child Guidance', series: 'Family Life', category: 'SOP' , format: 'PDF', size: '3.9 MB'},
  { id: 'diet', title: 'Counsels on Diet and Foods', series: 'Health', category: 'SOP', format: 'PDF', size: '1.9 MB' },
  { id: 'res-02', title: 'The 28 Fundamental Beliefs', series: 'Doctrine', category: 'Church Resources', format: 'PDF', size: '3.9 MB' },
  { id: 'manual', title: 'SDA Church Manual', series: 'Policy', category: 'Church Resources', format: 'PDF', size: '4.0 MB' },
  { 
    id: 'bible-kjv', 
    title: 'King James Version (KJV)', 
    series: 'Bibles', 
    category: 'Bibles', 
    format: 'PDF', 
    size: '2.4 MB',
    description: 'The classic authorized version, widely used for deep study.'
  },
  { 
    id: 'bible-nkjv', 
    title: 'New King James Version (NKJV)', 
    series: 'Bibles', 
    category: 'Bibles', 
    format: 'PDF', 
    size: '2.6 MB',
    description: 'Modern language update maintaining the KJV structure.'
  },
  { 
    id: 'bible-niv', 
    title: 'New International Version (NIV)', 
    series: 'Bibles', 
    category: 'Bibles', 
    format: 'PDF', 
    size: '2.3 MB',
    description: 'A popular balanced translation for easy reading.'
  },
  { 
    id: 'bible-esv', 
    title: 'English Standard Version (ESV)', 
    series: 'Bibles', 
    category: 'Bibles', 
    format: 'PDF', 
    size: '2.5 MB',
    description: 'Word-for-word translation excellent for serious study.'
  },

  // --- STUDY BIBLES ---
  { 
    id: 'bible-andrews', 
    title: 'Andrews University Study Bible', 
    series: 'Bibles', 
    category: 'Bibles', 
    format: 'PDF', 
    size: '8.2 MB',
    description: 'The standard SDA academic study Bible with extensive notes.'
  },
  { 
    id: 'bible-remnant', 
    title: 'Remnant Study Bible (with SOP)', 
    series: 'Bibles', 
    category: 'Bibles', 
    format: 'PDF', 
    size: '7.8 MB',
    description: 'NKJV Bible featuring Ellen G. White comments integrated into the text.'
  },

  // --- FOREIGN LANGUAGES ---
  { 
    id: 'bible-rv', 
    title: 'Reina-Valera 1960 (Español)', 
    series: 'Bibles', 
    category: 'Bibles', 
    format: 'PDF', 
    size: '2.7 MB',
    description: 'The most popular Spanish version for SDA congregations.'
  },
  { 
    id: 'bible-swahili', 
    title: 'Biblia Habari Njema (Kiswahili)', 
    series: 'Bibles', 
    category: 'Bibles', 
    format: 'PDF', 
    size: '2.5 MB',
    description: 'Standard Swahili translation for East African regions.'
  },
  { 
    id: 'bible-louis', 
    title: 'Louis Segond (Français)', 
    series: 'Bibles', 
    category: 'Bibles', 
    format: 'PDF', 
    size: '2.6 MB',
    description: 'The classic French translation.'
  }
];

const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  // Filter Logic
  const filteredBooks = useMemo(() => {
    return libraryData.filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === "All" || book.category === activeTab || book.series === activeTab;
      return matchesSearch && matchesTab;
    });
  }, [searchTerm, activeTab]);

  const categories = ["All", "Bibles", "Conflict of the Ages", "Testimonies", "Health", "Church Resources"];

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#F6EBEB]">
      
      {/* 2. SIDEBAR NAVIGATION */}
      <aside className="w-full md:w-64 bg-white shadow-lg p-6 space-y-8 z-10">
        <div>
          <h2 className="text-[#3298C8] font-bold uppercase text-xs tracking-widest mb-4">Categories</h2>
          <div className="flex flex-col gap-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`text-left px-4 py-2 rounded-lg text-sm transition-all ${
                  activeTab === cat 
                  ? 'bg-[#3298C8] text-white shadow-md' 
                  : 'text-gray-600 hover:bg-sky-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <p className="text-xs text-gray-400 italic">Total Resources: {libraryData.length}</p>
        </div>
      </aside>

      {/* 3. MAIN CONTENT */}
      <main className="flex-1 p-6 md:p-10">
        
        {/* Search Header */}
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Resource Library</h1>
            <p className="text-gray-500">Search and download spiritual materials</p>
          </div>
          <div className="relative w-full md:w-96">
            <FontAwesomeIcon icon={faSearch} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search by title..." 
              className="w-full pl-12 pr-4 py-3 rounded-full border-none shadow-md focus:ring-2 focus:ring-sky-400 outline-none"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-white p-6 rounded-2xl shadow-sm border border-transparent hover:border-sky-200 transition-all flex flex-col justify-between group">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className={`p-3 rounded-xl bg-sky-50 text-[#3298C8]`}>
                    <FontAwesomeIcon icon={getIcon(book.series)} className="text-xl" />
                  </div>
                  <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase">
                    {book.format}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-1 group-hover:text-sky-600 transition-colors">{book.title}</h3>
                <p className="text-xs text-sky-500 font-medium mb-3">{book.series}</p>
                <p className="text-[11px] text-gray-400">File size: {book.size}</p>
              </div>

              <button className="mt-6 flex items-center justify-center gap-2 w-full bg-[#3298C8] text-white py-2 rounded-lg hover:bg-sky-600 transition-colors shadow-sm">
                <FontAwesomeIcon icon={faDownload} className="text-xs" />
                Download
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

// Icon Helper
const getIcon = (series) => {
  switch (series) {
    case 'Bibles': return faBook;
    case 'Music': return faMusic;
    case 'Health': return faNotesMedical;
    case 'Conflict of the Ages': return faCross;
    case 'Testimonies': return faLayerGroup;
    default: return faUsers;
  }
};

export default Library;