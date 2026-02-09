import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faUserSecret,
   faEnvelope,
   faPhone,
   faUser,
   faCalendarAlt,
   faReply,
   faTrash,
   faCheck,
   faSearch,
   faPaperPlane,
   faTimes,
   faCheckDouble,
   faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import userStore from "../../hooks/useStore";
import { useDeleteMessage } from "../../services/message";
import { queryClient } from "../../main";

const VisitorMessages = () => {
   const [selectedMessage, setSelectedMessage] = useState(null);
   const [searchQuery, setSearchQuery] = useState("");
   const [filterStatus, setFilterStatus] = useState("all");
   const [showReplyModal, setShowReplyModal] = useState(false);
   const [replyText, setReplyText] = useState("");
   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

   // Get visitor messages from store
   const { visitorMessages, setVisitorMsg } = userStore();

   // Delete mutation
   const { mutate: deleteMsg, isPending: deleting } = useDeleteMessage();

   const handleMarkAsRead = (id) => {
      const updated = visitorMessages.map((msg) =>
         msg.id === id ? { ...msg, isRead: true } : msg,
      );
      setVisitorMsg(updated);
   };

   const handleDeleteMessage = (id) => {
      deleteMsg(id, {
         onSuccess: () => {
            const updated = visitorMessages.filter((msg) => msg.id !== id);
            setVisitorMsg(updated);
            if (selectedMessage?.id === id) {
               setSelectedMessage(null);
            }
            setShowDeleteConfirm(null);
            queryClient.invalidateQueries({
               queryKey: ["GET_VISITOR_MESSAGES"],
            });
         },
         onError: (e) => {
            console.error("Failed to delete message:", e.message);
            setShowDeleteConfirm(null);
         },
      });
   };

   const handleSendReply = () => {
      if (!replyText.trim()) return;
      // Open email client with pre-filled content
      const subject = encodeURIComponent(
         `Re: ${selectedMessage?.topic || "Your inquiry to MUTSDA"}`,
      );
      const body = encodeURIComponent(replyText);
      window.location.href = `mailto:${selectedMessage?.email}?subject=${subject}&body=${body}`;
      setReplyText("");
      setShowReplyModal(false);
   };

   // Ensure visitorMessages is an array
   const messagesArray = Array.isArray(visitorMessages) ? visitorMessages : [];

   const filteredMessages = messagesArray.filter((msg) => {
      const matchesSearch =
         msg?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         msg?.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
         msg?.message?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesFilter =
         filterStatus === "all" ||
         (filterStatus === "unread" && !msg?.isRead) ||
         (filterStatus === "read" && msg?.isRead);

      return matchesSearch && matchesFilter;
   });

   const unreadCount = messagesArray.filter((msg) => !msg?.isRead).length;

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
                           onClick={() => setShowReplyModal(true)}
                           className='p-2 hover:bg-sky-50 text-[#3298C8] rounded-lg transition-colors'
                           title='Reply'
                        >
                           <FontAwesomeIcon icon={faReply} />
                        </button>
                        <button
                           onClick={() =>
                              setShowDeleteConfirm(selectedMessage.id)
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
                           <button
                              onClick={() => setShowReplyModal(true)}
                              className='flex items-center gap-2 px-6 py-3 bg-[#3298C8] text-white rounded-xl hover:bg-sky-600 transition-colors font-medium'
                           >
                              <FontAwesomeIcon icon={faReply} />
                              Reply
                           </button>
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
                           <button
                              onClick={() =>
                                 setShowDeleteConfirm(selectedMessage.id)
                              }
                              className='flex items-center gap-2 px-6 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors font-medium'
                           >
                              <FontAwesomeIcon icon={faTrash} />
                              Delete
                           </button>
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

         {/* WhatsApp-style Reply Modal */}
         {showReplyModal && selectedMessage && (
            <div className='fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50 p-4'>
               <div className='bg-white w-full max-w-lg rounded-t-3xl sm:rounded-2xl overflow-hidden animate-slide-up'>
                  {/* Modal Header - WhatsApp style */}
                  <div className='bg-[#075E54] p-4 flex items-center gap-3'>
                     <button
                        onClick={() => {
                           setShowReplyModal(false);
                           setReplyText("");
                        }}
                        className='p-2 hover:bg-white/10 rounded-full transition-colors'
                     >
                        <FontAwesomeIcon
                           icon={faArrowLeft}
                           className='text-white'
                        />
                     </button>
                     <div className='w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white font-semibold'>
                        {selectedMessage.name
                           ?.split(" ")
                           .map((n) => n[0])
                           .join("")
                           .substring(0, 2)}
                     </div>
                     <div className='flex-1'>
                        <h3 className='font-semibold text-white'>
                           {selectedMessage.name}
                        </h3>
                        <p className='text-xs text-white/70'>
                           {selectedMessage.email}
                        </p>
                     </div>
                  </div>

                  {/* Chat area - shows original message */}
                  <div className='bg-[#ECE5DD] p-4 min-h-50 max-h-75 overflow-y-auto'>
                     {/* Original message bubble (received) */}
                     <div className='flex justify-start mb-3'>
                        <div className='bg-white rounded-lg rounded-tl-none p-3 max-w-[80%] shadow-sm'>
                           <p className='text-sm text-gray-800 whitespace-pre-wrap'>
                              {selectedMessage.message}
                           </p>
                           <div className='flex items-center justify-end gap-1 mt-1'>
                              <span className='text-[10px] text-gray-400'>
                                 {selectedMessage.time}
                              </span>
                           </div>
                        </div>
                     </div>

                     {/* Preview of reply if typing */}
                     {replyText && (
                        <div className='flex justify-end'>
                           <div className='bg-[#DCF8C6] rounded-lg rounded-tr-none p-3 max-w-[80%] shadow-sm'>
                              <p className='text-sm text-gray-800 whitespace-pre-wrap'>
                                 {replyText}
                              </p>
                              <div className='flex items-center justify-end gap-1 mt-1'>
                                 <span className='text-[10px] text-gray-400'>
                                    Draft
                                 </span>
                                 <FontAwesomeIcon
                                    icon={faCheckDouble}
                                    className='text-[10px] text-gray-400'
                                 />
                              </div>
                           </div>
                        </div>
                     )}
                  </div>

                  {/* Input area - WhatsApp style */}
                  <div className='bg-[#F0F0F0] p-3 flex items-end gap-2'>
                     <textarea
                        value={replyText}
                        onChange={(e) => setReplyText(e.target.value)}
                        placeholder='Type a message...'
                        rows={1}
                        className='flex-1 p-3 bg-white rounded-3xl outline-none resize-none max-h-32 text-sm'
                        onKeyDown={(e) => {
                           if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSendReply();
                           }
                        }}
                     />
                     <button
                        onClick={handleSendReply}
                        disabled={!replyText.trim()}
                        className='w-12 h-12 bg-[#075E54] rounded-full flex items-center justify-center text-white disabled:opacity-50 hover:bg-[#128C7E] transition-colors'
                     >
                        <FontAwesomeIcon icon={faPaperPlane} />
                     </button>
                  </div>
               </div>
            </div>
         )}

         {/* Delete Confirmation Modal */}
         {showDeleteConfirm && (
            <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
               <div className='bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl'>
                  <div className='text-center'>
                     <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <FontAwesomeIcon
                           icon={faTrash}
                           className='text-2xl text-red-500'
                        />
                     </div>
                     <h3 className='text-xl font-bold text-gray-800 mb-2'>
                        Delete Message?
                     </h3>
                     <p className='text-gray-500 mb-6'>
                        This action cannot be undone. The message will be
                        permanently deleted.
                     </p>
                     <div className='flex gap-3'>
                        <button
                           onClick={() => setShowDeleteConfirm(null)}
                           className='flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors'
                        >
                           Cancel
                        </button>
                        <button
                           onClick={() =>
                              handleDeleteMessage(showDeleteConfirm)
                           }
                           disabled={deleting}
                           className='flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-medium hover:bg-red-600 transition-colors disabled:opacity-50'
                        >
                           {deleting ? "Deleting..." : "Delete"}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default VisitorMessages;
