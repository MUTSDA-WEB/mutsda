import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faQuoteLeft,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const Leadership = () => {
  const boardMembers = [
    {
      name: "Pr. John Doe",
      role: "Church Pastor",
      dept: "Administration",
      email: "pastor@mutsda.org",
      quote:
        "The greatest want of the world is the want of men—men who will not be bought or sold; men who in their inmost souls are true and honest; men who do not fear to call sin by its right name.",
      image:
        "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800",
    },
    {
      name: "Elder Jane Smith",
      role: "First Elder",
      dept: "Administration",
      email: "elder1@mutsda.org",
      quote:
        "God never leads His children otherwise than they would choose to be led, if they could see the end from the beginning.",
      image:
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800",
    },
    {
      name: "David Mwangi",
      role: "Youth Director",
      dept: "Youth Ministries",
      email: "youth@mutsda.org",
      quote:
        "With such an army of workers as our youth, rightly trained, how soon the message of a crucified Saviour might be carried to the whole world!",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800",
    },
    {
      name: "Alice Johnson",
      role: "Music Director",
      dept: "Music",
      email: "music@mutsda.org",
      quote:
        "Music was made to serve a holy purpose, to lift the thoughts to that which is pure, noble, and elevating.",
      image:
        "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=800",
    },
    {
      name: "James Omondi",
      role: "Sabbath School Supt.",
      dept: "Sabbath School",
      email: "ss@mutsda.org",
      quote:
        "The Sabbath school is an important branch of the missionary work, not only because it gives to young and old a knowledge of God’s word.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=800",
    },
    {
      name: "Dr. Peter Kamau",
      role: "Health Secretary",
      dept: "Health Ministries",
      email: "health@mutsda.org",
      quote:
        "The right hand of the gospel is the medical missionary work, used to break down prejudice and open the way for the truth.",
      image:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800",
    },
    {
      name: "Martha White",
      role: "Children's Leader",
      dept: "Children Ministries",
      email: "kids@mutsda.org",
      quote:
        "While the shepherds are looking after the lost sheep, the lambs should be looked after with equal care.",
      image:
        "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=800",
    },
    {
      name: "Thomas Bell",
      role: "Head Deacon",
      dept: "Deaconry",
      email: "deacons@mutsda.org",
      quote:
        "The deacons are to be men of honest report, full of the Holy Ghost and wisdom, whom we may appoint over this business.",
      image:
        "https://images.unsplash.com/photo-1463453091185-61582044d556?q=80&w=800",
    },
    {
      name: "Lucy Gray",
      role: "Welfare Leader",
      dept: "Community Services",
      email: "welfare@mutsda.org",
      quote:
        "True religion is to visit the fatherless and widows in their affliction, and to keep oneself unspotted from the world.",
      image:
        "https://images.unsplash.com/photo-1554151228-14d9def656e4?q=80&w=800",
    },
  ];

  return (
    <div className="bg-[#F6EBEB] min-h-screen font-sans">
      {/* HEADER SECTION */}
      <section className="py-24 text-center text-[#3298C8] px-6">
        <FontAwesomeIcon icon={faUsers} className="text-6xl mb-6 opacity-40" />
        <h1 className="text-5xl md:text-6xl font-black mb-4 tracking-tight">
          Meet Our Board
        </h1>
        <p className="text-xl text-blue-400 max-w-2xl mx-auto font-light leading-relaxed">
          The leadership of MUTSDA is committed to the spiritual growth and
          service of our community.
        </p>
      </section>

      {/* LEADERS LIST */}
      <div className="max-w-6xl mx-auto py-12 px-6">
        {boardMembers.map((member, index) => (
          <div
            key={index}
            className={`flex flex-col md:flex-row items-center gap-12 py-20 border-b border-sky-200/50 last:border-0 ${
              index % 2 !== 0 ? "md:flex-row-reverse" : ""
            }`}
          >
            {/* IMAGE AREA */}
            <div className="w-full md:w-1/2">
              <div className="relative group">
                <div
                  className={`absolute -inset-3 bg-[#3298C8]/10 rounded-2xl transform transition-transform group-hover:rotate-0 ${
                    index % 2 === 0 ? "rotate-3" : "-rotate-3"
                  }`}
                ></div>
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-112.5 object-cover rounded-xl shadow-xl border-4 border-white"
                />
              </div>
            </div>

            {/* TEXT AREA */}
            <div className="w-full md:w-1/2 space-y-6">
              <div className="space-y-1">
                <span className="text-[#3298C8] font-bold text-xs uppercase tracking-[0.3em] block mb-2">
                  {member.dept}
                </span>
                <h2 className="text-4xl font-bold text-gray-900 leading-tight">
                  {member.name}
                </h2>
                <p className="text-lg text-gray-500 font-medium tracking-wide">
                  {member.role}
                </p>
              </div>

              <div className="relative pt-6">
                <FontAwesomeIcon
                  icon={faQuoteLeft}
                  className="text-[#3298C8] opacity-10 text-6xl absolute -top-2 -left-4"
                />
                <p className="text-xl text-gray-600 italic leading-relaxed relative z-10">
                  &quot;{member.quote}&quot;
                </p>
              </div>

              <div className="pt-4">
                <a
                  href={`mailto:${member.email}`}
                  className="inline-flex items-center gap-3 bg-[#3298C8] text-white px-8 py-3.5 rounded-xl font-bold hover:bg-sky-700 transition-all shadow-lg hover:shadow-sky-200/50 active:scale-95"
                >
                  <FontAwesomeIcon icon={faEnvelope} />
                  Message {member.name.split(" ")[0]}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leadership;
