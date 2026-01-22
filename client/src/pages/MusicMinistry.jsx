import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMusic,
  faMicrophoneLines,
  faUsersLine,
  faPlayCircle,
} from "@fortawesome/free-solid-svg-icons";

const MusicMinistry = () => {
  const subChoirs = [
    {
      name: "The Youth Choir",
      description:
        "A dynamic group of young voices dedicated to contemporary and traditional spirituals.",
      members: "25 Members",
      practiceDay: "Sundays at 2:00 PM",
    },
    {
      name: "Heavenly Voices (Kids)",
      description:
        "Our children's choir focused on teaching the foundations of faith through song.",
      members: "15 Members",
      practiceDay: "Saturdays at 9:00 AM",
    },
    {
      name: "Vocal Melodies",
      description:
        "A specialized acapella group focused on intricate harmonies and hymn arrangements.",
      members: "8 Members",
      practiceDay: "Fridays at 5:00 PM",
    },
  ];

  return (
    <div className="bg-[#F6EBEB] min-h-screen">
      {/* HERO SECTION */}
      <section className="bg-[#3298C8] py-20 text-center text-white relative overflow-hidden">
        <FontAwesomeIcon
          icon={faMusic}
          className="absolute -top-10 -right-10 text-[15rem] opacity-10 rotate-12"
        />
        <div className="relative z-10 px-6">
          <h1 className="text-5xl md:text-6xl font-black mb-4 uppercase italic">
            Music Ministry
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            &quot;Make a joyful noise unto the Lord, all the earth: make a loud
            noise, and rejoice, and sing praise.&quot; — Psalm 98:4
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto py-16 px-6 space-y-24">
        {/* MAIN CHURCH CHOIR SECTION */}
        <section className="flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 relative group">
            <div className="absolute -inset-4 bg-sky-200 rounded-2xl -rotate-2 group-hover:rotate-0 transition-transform"></div>
            <img
              src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1200"
              alt="Main Church Choir"
              className="relative rounded-xl shadow-2xl w-full h-112.5 object-cover"
            />
            <button className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-xl">
              <FontAwesomeIcon
                icon={faPlayCircle}
                className="text-white text-7xl"
              />
            </button>
          </div>

          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-block bg-[#3298C8] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
              Featured Group
            </div>
            <h2 className="text-4xl font-black text-gray-900">
              The Main Church Choir
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              The heart of our musical worship, the Main Church Choir leads the
              congregation every Sabbath. Comprising dedicated men and women,
              the choir specializes in majestic anthems and the great hymns of
              the church.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4 text-sm font-semibold text-gray-500 uppercase tracking-tighter">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faUsersLine}
                  className="text-[#3298C8]"
                />
                40+ Active Voices
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon
                  icon={faMicrophoneLines}
                  className="text-[#3298C8]"
                />
                Soprano, Alto, Tenor, Bass
              </div>
            </div>
            <button className="bg-[#3298C8] text-white px-8 py-3 rounded-full font-bold shadow-lg hover:bg-sky-700 transition-all">
              Join the Choir
            </button>
          </div>
        </section>

        {/* SUB-CHOIRS & SINGING GROUPS */}
        <section>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-800">
              Singing Groups & Sub-Choirs
            </h2>
            <div className="w-20 h-1 bg-[#3298C8] mx-auto mt-4"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {subChoirs.map((choir, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-3xl shadow-sm border border-transparent hover:border-sky-200 transition-all group"
              >
                <div className="w-14 h-14 bg-sky-50 rounded-2xl flex items-center justify-center text-[#3298C8] mb-6 group-hover:bg-[#3298C8] group-hover:text-white transition-colors">
                  <FontAwesomeIcon icon={faMusic} size="lg" />
                </div>
                <h3 className="text-xl font-black text-gray-800 mb-3">
                  {choir.name}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">
                  {choir.description}
                </p>
                <div className="space-y-2 border-t pt-4 text-xs font-bold text-[#3298C8] uppercase tracking-wider">
                  <p>{choir.members}</p>
                  <p>{choir.practiceDay}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MusicMinistry;
