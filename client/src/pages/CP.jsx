import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBullhorn, 
  faBookOpen, 
  faNewspaper, 
  faMicrophone, 
  faArchive, 
  faInfoCircle 
} from '@fortawesome/free-solid-svg-icons';

const CPPage = () => {
  const archives = [
    { title: "Church Board Minutes", period: "1990 - Present", type: "Hard Copy Only" },
    { title: "Quarterly Newsletters", period: "2010 - 2025", type: "Digital & Hard Copy" },
    { title: "Historical Photos", period: "Founding - Present", type: "Physical Album" },
    { title: "Guest Speaker Register", period: "2015 - Present", type: "Ledger" }
  ];

  return (
    <div className="bg-[#F6EBEB] min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-[#3298C8] py-20 text-white text-center px-6 relative">
        <FontAwesomeIcon icon={faBullhorn} className="absolute top-1/2 left-10 text-9xl opacity-10 -translate-y-1/2 -rotate-12 hidden lg:block" />
        <div className="relative z-10">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Communication & Publishing</h1>
          <p className="text-xl max-w-3xl mx-auto font-light opacity-90">
            Broadcasting the Gospel and preserving the heritage of MUTSDA through modern media and physical archives.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-16 px-6 space-y-20">
        
        {/* TOP SECTION: THE THREE PILLARS */}
        <section className="grid md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-3xl shadow-sm border-b-4 border-sky-400">
            <FontAwesomeIcon icon={faMicrophone} className="text-[#3298C8] text-3xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Media & PR</h3>
            <p className="text-gray-600 text-sm">Managing the church&apos;s public image, social media, and technical coverage of all services.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border-b-4 border-amber-400">
            <FontAwesomeIcon icon={faBookOpen} className="text-amber-500 text-3xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Publishing</h3>
            <p className="text-gray-600 text-sm">Producing weekly bulletins, newsletters, and missionary tracts for the congregation.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl shadow-sm border-b-4 border-green-400">
            <FontAwesomeIcon icon={faArchive} className="text-green-500 text-3xl mb-4" />
            <h3 className="text-xl font-bold mb-2">Archives</h3>
            <p className="text-gray-600 text-sm">Safe-guarding the physical books, records, and historical documents of the church.</p>
          </div>
        </section>

        {/* PHYSICAL LIBRARY & HARD COPY ARCHIVE SECTION */}
        <section className="bg-white rounded-[3rem] overflow-hidden shadow-xl flex flex-col lg:flex-row border border-gray-100">
          <div className="w-full lg:w-1/2 bg-gray-900 p-12 text-white flex flex-col justify-center space-y-6">
            <div className="flex items-center gap-3 text-amber-400">
              <FontAwesomeIcon icon={faArchive} size="lg" />
              <span className="font-bold uppercase tracking-widest text-sm">Physical Archive</span>
            </div>
            <h2 className="text-4xl font-bold">The Hard-Copy Library</h2>
            <p className="text-gray-400 leading-relaxed">
              Our department manages the church&apos;s physical repository. While our digital library offers many resources, the C&P department maintains original Spirit of Prophecy books, rare SDA publications, and the church’s historical records that are only available in hard copy.
            </p>
            <div className="bg-white/10 p-4 rounded-xl flex gap-4 items-center">
              <FontAwesomeIcon icon={faInfoCircle} className="text-sky-400" />
              <p className="text-xs italic">Members must visit the C&P Office to request or check out physical books.</p>
            </div>
          </div>

          <div className="w-full lg:w-1/2 p-12">
            <h3 className="text-2xl font-bold mb-6 text-gray-800 underline decoration-sky-300">Archive Categories</h3>
            <div className="space-y-4">
              {archives.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl hover:bg-sky-50 transition-colors">
                  <div>
                    <h4 className="font-bold text-gray-700">{item.title}</h4>
                    <p className="text-xs text-gray-400">{item.period}</p>
                  </div>
                  <span className="text-[10px] font-bold text-[#3298C8] bg-white border border-sky-100 px-3 py-1 rounded-full uppercase">
                    {item.type}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* COMMUNICATION CHANNELS */}
        <section className="text-center space-y-12">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">Communication Channels</h2>
            <p className="text-gray-500">How we keep the congregation informed</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "WhatsApp", icon: faBullhorn, color: "bg-green-100 text-green-600" },
              { label: "Weekly Bulletin", icon: faNewspaper, color: "bg-blue-100 text-blue-600" },
              { label: "Email Lists", icon: faBullhorn, color: "bg-purple-100 text-purple-600" },
              { label: "Social Media", icon: faBullhorn, color: "bg-pink-100 text-pink-600" }
            ].map((channel, i) => (
              <div key={i} className="flex flex-col items-center p-8 bg-white rounded-3xl shadow-sm border border-transparent hover:border-[#3298C8] transition-all">
                <div className={`w-16 h-16 rounded-2xl mb-4 flex items-center justify-center ${channel.color}`}>
                  <FontAwesomeIcon icon={channel.icon} size="xl" />
                </div>
                <h4 className="font-bold text-gray-800">{channel.label}</h4>
              </div>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default CPPage;