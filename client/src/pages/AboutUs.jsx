import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandsHelping, faQuoteLeft, faUsers, faHistory } from '@fortawesome/free-solid-svg-icons';

const About = () => {
  return (
    <div className="flex flex-col animate-fadeIn">
      {/* 1. PAGE HEADER */}
      <section className=" py-16 text-center text-[#3298C8]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">About MUTSDA</h1>
        <p className="max-w-2xl mx-auto px-4 text-lg opacity-90">
          Rooted in faith, growing in service, and reaching out with love to our community.
        </p>
      </section>

      <div className="max-w-6xl mx-auto w-full py-16 px-6 space-y-20">
        
        {/* 2. OUR MISSION & VISION */}
        <section className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-[#3298C8]">
              <FontAwesomeIcon icon={faHandsHelping} size="2xl" />
              <h2 className="text-3xl font-bold">Our Mission</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">
              To share the everlasting gospel of Jesus Christ through worship, fellowship, and 
              dedicated community service. We strive to create an environment where every 
              soul feels valued and cherished.
            </p>
            <blockquote className="border-l-4 border-sky-400 pl-4 italic text-gray-600">
              <FontAwesomeIcon icon={faQuoteLeft} className="text-sky-300 mr-2" />
              &quot;Go ye therefore, and teach all nations...&quot;
            </blockquote>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1544427928-c49cdfebf194?auto=format&fit=crop&q=80" 
              alt="Mission" 
              className="w-full h-80 object-cover"
            />
          </div>
        </section>

        {/* 3. CORE VALUES SECTION */}
        <section className="bg-white p-10 rounded-3xl shadow-sm border border-sky-100">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8 text-center">
            {[
              { title: 'Faith', desc: 'Trusting in God’s word and His guidance for our journey.' },
              { title: 'Community', desc: 'Building strong, supportive bonds within our congregation.' },
              { title: 'Service', desc: 'Dedicated to helping those in need with kindness.' }
            ].map((value, index) => (
              <div key={index} className="space-y-3">
                <div className="w-12 h-12 bg-sky-100 text-[#3298C8] rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="font-bold">{index + 1}</span>
                </div>
                <h4 className="text-xl font-bold text-gray-800">{value.title}</h4>
                <p className="text-gray-600">{value.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 4. LEADERSHIP OVERVIEW */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 flex items-center justify-center gap-3">
              <FontAwesomeIcon icon={faUsers} className="text-[#3298C8]" />
              Our Leadership
            </h2>
            <p className="text-gray-500 mt-2">The dedicated team serving MUTSDA</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((leader) => (
              <div key={leader} className="text-center group">
                <div className="w-40 h-40 mx-auto rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-sky-300 transition-all mb-4">
                  <img 
                    src={`https://i.pravatar.cc/150?u=${leader}`} 
                    alt="Leader" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <h4 className="text-lg font-bold text-gray-800">Leader Name</h4>
                <p className="text-[#3298C8] text-sm uppercase tracking-wider font-semibold">Position Title</p>
              </div>
            ))}
          </div>
        </section>

        {/* 5. DETAILED HISTORY */}
        <section className="bg-sky-50 p-8 rounded-2xl border-l-8 border-[#3298C8]">
          <div className="flex items-center gap-4 mb-4 text-[#3298C8]">
            <FontAwesomeIcon icon={faHistory} size="xl" />
            <h2 className="text-2xl font-bold">Our Journey</h2>
          </div>
          <p className="text-gray-700 leading-relaxed">
            Founded with a vision to serve, MUTSDA has grown from a small gathering into a 
            vibrant community of believers. Over the years, we have expanded our ministries 
            to include library services, youth leadership programs, and mission registrations. 
            Our history is written in the lives of the people we serve and the faith we share.
          </p>
        </section>

      </div>
    </div>
  );
};

export default About;