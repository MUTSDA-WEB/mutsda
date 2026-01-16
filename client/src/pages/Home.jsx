import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faEnvelope, faPhone } from '@fortawesome/free-solid-svg-icons';

const Home = () => {
  return (
    <div className="flex flex-col animate-fadeIn">
      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] flex items-center justify-center text-white overflow-hidden">
        {/* Background Image Overlay */}
        <div className="absolute  inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80" 
            alt="Congregation" 
            className="w-full h-full object-cover brightness-50"
          />
        </div>
        
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to MUTSDA</h1>
          <p className="text-xl md:text-2xl italic font-light mb-8">
            We love you, we value you and we cherish you
          </p>
          <button className="bg-[#3298C8] hover:bg-sky-600 transition-all text-white px-10 py-3 rounded-md font-bold text-lg shadow-lg">
            Join Us
          </button>
        </div>
      </section>

      {/* MAIN CONTENT WRAPPER */}
      <div className="max-w-6xl mx-auto w-full py-16 px-6 space-y-20">
        
        {/* 2. UPCOMING EVENTS */}
        <section className="text-center">
          <div className="inline-block border-b-2 border-dashed border-sky-400 mb-10 px-4">
            <h2 className="text-3xl font-semibold text-gray-800 pb-2">Upcoming events</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((item) => (
              <div key={item} className="group overflow-hidden rounded-2xl shadow-xl transition-transform hover:-translate-y-2">
                <img 
                  src={`https://picsum.photos/seed/${item + 10}/500/350`} 
                  alt="Event" 
                  className="w-full h-64 object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        {/* 3. OUR SERVICES */}
        <section className="text-center space-y-12">
          <h2 className="text-3xl font-bold text-gray-800">Our Services</h2>
          <div className="grid md:grid-cols-2 gap-16">
            {/* Sabbath Service */}
            <div className="space-y-6">
              <h3 className="text-[#3298C8] text-2xl font-bold underline decoration-2 underline-offset-8">Sabbath service</h3>
              <div className="text-gray-700 space-y-1">
                <p className="font-semibold text-lg">Every Saturday</p>
                <p className="flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faClock} className="text-sky-500" />
                  8:00a.m - 6:00pm
                </p>
              </div>
              <div className="flex flex-col gap-3 max-w-xs mx-auto">
                <button className="bg-[#3298C8] hover:bg-sky-600 text-white py-2.5 rounded font-medium transition-colors">See Guest Speaker</button>
                <button className="bg-[#3298C8] hover:bg-sky-600 text-white py-2.5 rounded font-medium transition-colors">Sabbath Program</button>
              </div>
            </div>

            {/* Weekly Vespers */}
            <div className="space-y-6">
              <h3 className="text-[#3298C8] text-2xl font-bold underline decoration-2 underline-offset-8">Weekly Verspers</h3>
              <div className="text-gray-700 space-y-1">
                <p className="font-semibold text-lg">Wednesday & Friday</p>
                <p className="flex items-center justify-center gap-2">
                  <FontAwesomeIcon icon={faClock} className="text-sky-500" />
                  6pm to 8pm
                </p>
              </div>
              <div className="max-w-xs mx-auto">
                <button className="w-full bg-[#3298C8] hover:bg-sky-600 text-white py-2.5 rounded font-medium transition-colors">See Speaker</button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. HISTORY & MESSAGE */}
        <section className="grid md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-gray-700">Our History</h4>
            <div className="bg-white p-8 rounded-lg shadow-inner border border-gray-100 min-h-30 flex items-center text-gray-500 italic">
              The history of the church will be seen here...
            </div>
          </div>
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-gray-700">Today Message</h4>
            <div className="bg-white p-8 rounded-lg shadow-inner border border-gray-100 min-h-30 flex items-center text-gray-500 italic">
              &quot;The quote or verse of the day will be displayed here&quot;
            </div>
          </div>
        </section>

        {/* 5. FORMS (CONTACT & MISSION) */}
        <section className="grid md:grid-cols-2 border-t-2 border-sky-200 pt-12 overflow-hidden">
          {/* Contact Form */}
          <div className="p-8 md:border-r-2 border-sky-100 space-y-6">
            <h3 className="text-[#3298C8] text-2xl font-bold underline text-center mb-4">Contact Us</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Name" className="w-full p-3 rounded bg-white shadow-sm focus:ring-2 focus:ring-sky-400 outline-none transition-all" />
              <textarea placeholder="Message" className="w-full p-3 rounded bg-white shadow-sm h-32 focus:ring-2 focus:ring-sky-400 outline-none transition-all resize-none"></textarea>
              <button className="w-full md:w-48 mx-auto block bg-[#3298C8] hover:bg-sky-600 text-white py-3 rounded-lg font-bold shadow-md">
                Send <FontAwesomeIcon icon={faEnvelope} className="ml-2" />
              </button>
            </div>
          </div>

          {/* Registration Form */}
          <div className="p-8 space-y-6">
            <h3 className="text-[#3298C8] text-2xl font-bold underline text-center mb-4">Register For Mission</h3>
            <div className="space-y-4">
              <input type="text" placeholder="Name" className="w-full p-3 rounded bg-white shadow-sm focus:ring-2 focus:ring-sky-400 outline-none transition-all" />
              <input type="text" placeholder="Phone number" className="w-full p-3 rounded bg-white shadow-sm focus:ring-2 focus:ring-sky-400 outline-none transition-all" />
              <button className="w-full md:w-48 mx-auto block bg-[#3298C8] hover:bg-sky-600 text-white py-3 rounded-lg font-bold shadow-md">
                Get Involved <FontAwesomeIcon icon={faPhone} className="ml-2" />
              </button>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;





