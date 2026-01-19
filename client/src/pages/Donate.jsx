import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHeart, 
  faBuildingColumns, 
  faMobileScreenButton, 
  faHandHoldingDollar,
  faCircleCheck,
  faShieldHeart,
  faShieldAlt
} from '@fortawesome/free-solid-svg-icons';

const Donate = () => {
  const [selectedFund, setSelectedFund] = useState("Tithe & Offering");

  const funds = [
    { name: "Tithe & Offering", icon: faBuildingColumns, desc: "General church operations and worldwide missions." },
    { name: "Welfare Fund", icon: faHeart, desc: "Supporting the needy, widows, and orphans in our community." },
    { name: "Building Project", icon: faHandHoldingDollar, desc: "Contributions toward the expansion of our sanctuary." },
  ];

  return (
    <div className="bg-[#F6EBEB] min-h-screen animate-fadeIn">
      {/* 1. HEADER SECTION */}
      <section className="bg-[#3298C8] py-20 text-white text-center px-6">
        <h1 className="text-5xl font-black uppercase mb-4 tracking-tighter">Support the Mission</h1>
        <p className="text-xl max-w-2xl mx-auto opacity-90 font-light">
          &quot;Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.&quot;
        </p>
        <p className="mt-4 font-bold italic text-sky-200">— 2 Corinthians 9:7</p>
      </section>

      <div className="max-w-6xl mx-auto py-16 px-6 grid lg:grid-cols-2 gap-16">
        
        {/* 2. CHOOSE A FUND */}
        <div className="space-y-8">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold text-gray-800">Select a Fund</h2>
            <p className="text-gray-500">Where would you like to direct your support?</p>
          </div>

          <div className="space-y-4">
            {funds.map((fund) => (
              <div 
                key={fund.name}
                onClick={() => setSelectedFund(fund.name)}
                className={`p-6 rounded-3xl border-2 cursor-pointer transition-all flex items-start gap-5 ${
                  selectedFund === fund.name 
                  ? 'border-[#3298C8] bg-white shadow-xl scale-[1.02]' 
                  : 'border-transparent bg-white/50 hover:bg-white'
                }`}
              >
                <div className={`p-4 rounded-2xl ${selectedFund === fund.name ? 'bg-[#3298C8] text-white' : 'bg-sky-100 text-[#3298C8]'}`}>
                  <FontAwesomeIcon icon={fund.icon} size="lg" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <h3 className="font-bold text-lg text-gray-800">{fund.name}</h3>
                    {selectedFund === fund.name && <FontAwesomeIcon icon={faCircleCheck} className="text-[#3298C8]" />}
                  </div>
                  <p className="text-sm text-gray-500 leading-relaxed">{fund.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. PAYMENT METHODS PANEL */}
        <div className="space-y-8">
          <div className="bg-gray-900 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden">
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faMobileScreenButton} className="text-green-400 text-2xl" />
                <h3 className="text-2xl font-bold">Mobile Money (M-Pesa)</h3>
              </div>

              <div className="space-y-6">
                <div className="bg-white/5 p-6 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3">
                    <span className="text-gray-400 text-sm uppercase tracking-widest font-bold">Paybill Number</span>
                    <span className="text-2xl font-black text-green-400 tracking-tighter">247247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm uppercase tracking-widest font-bold">Account Name</span>
                    <span className="text-lg font-bold">MUTSDA Church</span>
                  </div>
                </div>

                <div className="p-4 bg-white/10 rounded-xl text-xs text-gray-400 italic">
                  * For specific funds, use the fund name (e.g., WELFARE) as the account number.
                </div>
              </div>

              <div className="pt-4 border-t border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <FontAwesomeIcon icon={faShieldHeart} className="text-[#3298C8]" />
                  <span className="text-sm font-semibold">Bank Transfer (Equity Bank)</span>
                </div>
                <p className="text-sm text-gray-400">Account: 0123 4567 8901</p>
                <p className="text-sm text-gray-400">Branch: Murang&apos;a</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
             <div className="w-16 h-16 bg-sky-50 rounded-2xl flex items-center justify-center text-[#3298C8]">
                <FontAwesomeIcon icon={faShieldAlt} size="xl" />
             </div>
             <div>
                <h4 className="font-bold text-gray-800">Secure Giving</h4>
                <p className="text-xs text-gray-500">Your contributions are managed with full transparency by the church board.</p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donate;