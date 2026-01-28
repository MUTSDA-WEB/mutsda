import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faUserSecret,
   faEnvelope,
   faPhone,
   faUser,
   faCalendarAlt,
   faEye,
   faReply,
   faTrash,
   faCheck,
   faSearch,
   faFilter,
} from "@fortawesome/free-solid-svg-icons";

const VisitorMessages = () => {
   const [selectedMessage, setSelectedMessage] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");
   const [filterStatus, setFilterStatus] = useState("all"); // all, unread, read

   // Sample visitor messages data - Replace with actual API data
   const [visitorMessages, setVisitorMessages] = useState([
      {
         id: 1,
         name: "Grace Wanjiku",
         email: "grace.wanjiku@example.com",
         phone: "+254 712 345 678",
         message:
            "Hello, I would like to know more about the youth programs at MUTSDA. My daughter is interested in joining. Can someone contact me?",
         time: "10 min ago",
         date: "2026-01-27",
         source: "Contact Page",
         isRead: false,
      },
      {
         id: 2,
         name: "Peter Kamau",
         email: "peter.kamau@email.com",
         phone: "+254 723 456 789",
         message:
            "I am a new student at MUT and looking for a church community. What time are your Sabbath services? Where exactly is the church located?",
         time: "1 hour ago",
         date: "2026-01-27",
         source: "Contact Page",
         isRead: false,
      },
      {
         id: 3,
         name: "Mary Njeri",
         email: "marynjeri2000@gmail.com",
         phone: "+254 734 567 890",
         message:
            "Good afternoon. I attended your church last Sabbath and was blessed by the sermon. How can I become a member?",
         time: "3 hours ago",
         date: "2026-01-27",
         source: "Contact Page",
         isRead: true,
      },
      {
         id: 4,
         name: "David Omondi",
         email: "david.omondi@university.ac.ke",
         phone: "+254 745 678 901",
         message:
            "Hi, I'm organizing a campus event and would like to invite your choir to perform. Who should I speak to about this?",
         time: "Yesterday",
         date: "2026-01-26",
         source: "Contact Page",
         isRead: true,
      },
      {
         id: 5,
         name: "Faith Akinyi",
         email: "faithakinyi@outlook.com",
         phone: null,
         message:
            "I need spiritual guidance and counseling. Is there a pastor I can speak with privately? Please let me know how to arrange a meeting.",
         time: "2 days ago",
         date: "2026-01-25",
         source: "Contact Page",
         isRead: true,
      },
   ]);

   const handleMarkAsRead = (id) => {
      setVisitorMessages((prev) =>
         prev.map((msg) => (msg.id === id ? { ...msg, isRead: true } : msg)),
      );
   };

   const handleDeleteMessage = (id) => {
      setVisitorMessages((prev) => prev.filter((msg) => msg.id !== id));
      if (selectedMessage?.id === id) {
         setSelectedMessage(null);
      }
   };

   const filteredMessages = visitorMessages.filter((msg) => {
      const matchesSearch =
         msg.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
         msg.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
         msg.message.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
         filterStatus === "all" ||
         (filterStatus === "unread" && !msg.isRead) ||
         (filterStatus === "read" && msg.isRead);

      return matchesSearch && matchesFilter;
   });

   const unreadCount = visitorMessages.filter((msg) => !msg.isRead).length;

   return (
      <div className='flex h-full'>
         {/* Messages List */}
         <div
            className={`w-full lg:w-96 bg-white border-r border-gray-200 flex flex-col ${
               selectedMessage ? "hidden lg:flex" : "flex"
            }`}
         >
            {/* Header & Search */}
            <div className='p-4 border-b border-gray-200 space-y-3'>
               <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-2'>
                     <FontAwesomeIcon
                        icon={faUserSecret}
                        className='text-[#3298C8]'
                     />
                     <h3 className='font-bold text-gray-800'>
                        Visitor Messages
                     </h3>
                     {unreadCount > 0 && (
                        <span className='px-2 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full'>
                           {unreadCount}
                        </span>
                     )}
                  </div>
               </div>

               {/* Search */}
               <div className='relative'>
                  <FontAwesomeIcon
                     icon={faSearch}
                     className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
                  />
                  <input
                     type='text'
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     placeholder='Search visitors...'
                     className='w-full pl-11 pr-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#3298C8]/30 transition-all'
                  />
               </div>

               {/* Filter */}
               <div className='flex gap-2'>
                  {["all", "unread", "read"].map((status) => (
                     <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors capitalize ${
                           filterStatus === status
                              ? "bg-[#3298C8] text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                     >
                        {status}
                     </button>
                  ))}
               </div>
            </div>

            {/* Messages List */}
            <div className='flex-1 overflow-y-auto'>
               {filteredMessages.length === 0 ? (
                  <div className='p-8 text-center text-gray-500'>
                     <FontAwesomeIcon
                        icon={faUserSecret}
                        className='text-4xl mb-3 text-gray-300'
                     />
                     <p>No visitor messages found</p>
                  </div>
               ) : (
                  filteredMessages.map((msg) => (
                     <div
                        key={msg.id}
                        onClick={() => {
                           setSelectedMessage(msg);
                           if (!msg.isRead) handleMarkAsRead(msg.id);
                        }}
                        className={`p-4 cursor-pointer transition-all duration-200 border-b border-gray-100 ${
                           selectedMessage?.id === msg.id
                              ? "bg-sky-50"
                              : "hover:bg-gray-50"
                        } ${!msg.isRead ? "bg-blue-50/50" : ""}`}
                     >
                        <div className='flex items-start gap-3'>
                           <div className='relative'>
                              <div className='w-12 h-12 bg-linear-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold'>
                                 {msg.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")
                                    .substring(0, 2)}
                              </div>
                              {!msg.isRead && (
                                 <span className='absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-white rounded-full'></span>
                              )}
                           </div>
                           <div className='flex-1 min-w-0'>
                              <div className='flex justify-between items-start'>
                                 <h4
                                    className={`font-semibold text-gray-800 truncate ${!msg.isRead ? "font-bold" : ""}`}
                                 >
                                    {msg.name}
                                 </h4>
                                 <span className='text-xs text-gray-400 whitespace-nowrap ml-2'>
                                    {msg.time}
                                 </span>
                              </div>
                              <p className='text-xs text-gray-500 truncate'>
                                 {msg.email}
                              </p>
                              <p
                                 className={`text-sm text-gray-600 mt-1 line-clamp-2 ${!msg.isRead ? "font-medium" : ""}`}
                              >
                                 {msg.message}
                              </p>
                           </div>
                        </div>
                     </div>
                  ))
               )}
            </div>
         </div>

         {/* Message Detail View */}
         <div
            className={`flex-1 flex flex-col bg-gray-50 ${
               !selectedMessage ? "hidden lg:flex" : "flex"
            }`}
         >
            {selectedMessage ? (
               <>
                  {/* Detail Header */}
                  <div className='p-4 bg-white border-b border-gray-200 flex items-center justify-between'>
                     <div className='flex items-center gap-4'>
                        <button
                           onClick={() => setSelectedMessage(null)}
                           className='lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors'
                        >
                           <FontAwesomeIcon
                              icon={faUserSecret}
                              className='text-gray-600'
                           />
                        </button>
                        <div className='w-12 h-12 bg-linear-to-br from-amber-500 to-orange-600 rounded-full flex items-center justify-center text-white font-semibold'>
                           {selectedMessage.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .substring(0, 2)}
                        </div>
                        <div>
                           <h3 className='font-bold text-gray-800'>
                              {selectedMessage.name}
                           </h3>
                           <p className='text-xs text-gray-500'>
                              via {selectedMessage.source}
                           </p>
                        </div>
                     </div>
                     <div className='flex items-center gap-2'>
                        <button
                           onClick={() =>
                              handleDeleteMessage(selectedMessage.id)
                           }
                           className='p-2 hover:bg-red-50 text-red-500 rounded-lg transition-colors'
                           title='Delete'
                        >
                           <FontAwesomeIcon icon={faTrash} />
                        </button>
                     </div>
                  </div>

                  {/* Message Content */}
                  <div className='flex-1 overflow-y-auto p-6'>
                     <div className='max-w-2xl mx-auto space-y-6'>
                        {/* Contact Info Card */}
                        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
                           <h4 className='font-bold text-gray-800 mb-4 flex items-center gap-2'>
                              <FontAwesomeIcon
                                 icon={faUser}
                                 className='text-[#3298C8]'
                              />
                              Contact Information
                           </h4>
                           <div className='space-y-3'>
                              <div className='flex items-center gap-3 text-gray-600'>
                                 <FontAwesomeIcon
                                    icon={faUser}
                                    className='w-5 text-gray-400'
                                 />
                                 <span className='font-medium'>
                                    {selectedMessage.name}
                                 </span>
                              </div>
                              <div className='flex items-center gap-3 text-gray-600'>
                                 <FontAwesomeIcon
                                    icon={faEnvelope}
                                    className='w-5 text-gray-400'
                                 />
                                 <a
                                    href={`mailto:${selectedMessage.email}`}
                                    className='text-[#3298C8] hover:underline'
                                 >
                                    {selectedMessage.email}
                                 </a>
                              </div>
                              {selectedMessage.phone && (
                                 <div className='flex items-center gap-3 text-gray-600'>
                                    <FontAwesomeIcon
                                       icon={faPhone}
                                       className='w-5 text-gray-400'
                                    />
                                    <a
                                       href={`tel:${selectedMessage.phone}`}
                                       className='text-[#3298C8] hover:underline'
                                    >
                                       {selectedMessage.phone}
                                    </a>
                                 </div>
                              )}
                              <div className='flex items-center gap-3 text-gray-600'>
                                 <FontAwesomeIcon
                                    icon={faCalendarAlt}
                                    className='w-5 text-gray-400'
                                 />
                                 <span>{selectedMessage.date}</span>
                              </div>
                           </div>
                        </div>

                        {/* Message Card */}
                        <div className='bg-white rounded-2xl p-6 shadow-sm border border-gray-100'>
                           <h4 className='font-bold text-gray-800 mb-4 flex items-center gap-2'>
                              <FontAwesomeIcon
                                 icon={faEnvelope}
                                 className='text-[#3298C8]'
                              />
                              Message
                           </h4>
                           <p className='text-gray-700 leading-relaxed whitespace-pre-wrap'>
                              {selectedMessage.message}
                           </p>
                        </div>

                        {/* Action Buttons */}
                        <div className='flex flex-wrap gap-3'>
                           <a
                              href={`mailto:${selectedMessage.email}?subject=Re: Your inquiry to MUTSDA`}
                              className='flex items-center gap-2 px-6 py-3 bg-[#3298C8] text-white rounded-xl hover:bg-sky-600 transition-colors font-medium'
                           >
                              <FontAwesomeIcon icon={faReply} />
                              Reply via Email
                           </a>
                           {selectedMessage.phone && (
                              <a
                                 href={`tel:${selectedMessage.phone}`}
                                 className='flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition-colors font-medium'
                              >
                                 <FontAwesomeIcon icon={faPhone} />
                                 Call
                              </a>
                           )}
                           {!selectedMessage.isRead && (
                              <button
                                 onClick={() =>
                                    handleMarkAsRead(selectedMessage.id)
                                 }
                                 className='flex items-center gap-2 px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium'
                              >
                                 <FontAwesomeIcon icon={faCheck} />
                                 Mark as Read
                              </button>
                           )}
                        </div>
                     </div>
                  </div>
               </>
            ) : (
               <div className='flex-1 flex items-center justify-center'>
                  <div className='text-center'>
                     <div className='w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <FontAwesomeIcon
                           icon={faUserSecret}
                           className='text-4xl text-gray-400'
                        />
                     </div>
                     <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                        Select a message
                     </h3>
                     <p className='text-gray-500'>
                        Choose a visitor message to view details
                     </p>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default VisitorMessages;
