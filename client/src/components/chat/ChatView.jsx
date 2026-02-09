import { useRef, useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faArrowLeft,
   faUsers,
   faGlobe,
   faSmile,
   faImage,
   faPaperPlane,
   faCheckDouble,
   faReply,
   faTrash,
   faTimes,
   faUserMinus,
   faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

const ChatView = ({
   activeTab,
   selectedChat,
   setSelectedChat,
   messages,
   message,
   setMessage,
   onSendMessage,
   onViewMembers,
   onDeleteMessage,
   onDeleteForMe,
   replyingTo,
   setReplyingTo,
   currentUserId,
   isLoadingMessages = false,
}) => {
   const messagesEndRef = useRef(null);
   const [selectedMessage, setSelectedMessage] = useState(null);
   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   const handleSubmit = (e) => {
      e.preventDefault();
      onSendMessage();
   };

   const handleMessageClick = (msg, e) => {
      e.stopPropagation();
      setSelectedMessage(selectedMessage?.id === msg.id ? null : msg);
   };

   const handleReply = (msg) => {
      setReplyingTo?.(msg);
      setSelectedMessage(null);
   };

   const handleDeleteForMe = (msgId) => {
      setShowDeleteConfirm({ id: msgId, type: "forMe" });
      setSelectedMessage(null);
   };

   const handleDeleteForAll = (msgId) => {
      setShowDeleteConfirm({ id: msgId, type: "forAll" });
      setSelectedMessage(null);
   };

   const confirmDelete = () => {
      if (showDeleteConfirm.type === "forMe") {
         onDeleteForMe?.(showDeleteConfirm.id);
      } else {
         onDeleteMessage?.(showDeleteConfirm.id);
      }
      setShowDeleteConfirm(null);
   };

   const isOwnMessage = (msg) => {
      return (
         msg.sender === "me" ||
         msg.sender === "You" ||
         msg.senderId === currentUserId
      );
   };

   return (
      <div className='flex-1 flex flex-col h-full'>
         {/* Chat Header */}
         <div className='p-4 border-b border-gray-200 bg-white flex items-center gap-4'>
            {(activeTab === "messages" || activeTab === "groups") && (
               <button
                  onClick={() => setSelectedChat(null)}
                  className='lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors'
               >
                  <FontAwesomeIcon
                     icon={faArrowLeft}
                     className='text-gray-600'
                  />
               </button>
            )}
            <div className='w-10 h-10 bg-linear-to-br from-[#3298C8] to-sky-600 rounded-full flex items-center justify-center text-white font-semibold'>
               {activeTab === "community" ? (
                  <FontAwesomeIcon icon={faGlobe} />
               ) : (
                  selectedChat?.avatar
               )}
            </div>
            <div className='flex-1'>
               <h3 className='font-bold text-gray-800'>
                  {activeTab === "community"
                     ? "MUTSDA Leaders Community"
                     : selectedChat?.name}
               </h3>
               <p className='text-xs text-gray-500'>
                  {activeTab === "community"
                     ? "All members can chat here"
                     : activeTab === "groups"
                       ? `${selectedChat?.members} members`
                       : selectedChat?.online
                         ? "Online"
                         : "Offline"}
               </p>
            </div>
            {activeTab === "groups" && (
               <button
                  onClick={() => onViewMembers?.(selectedChat)}
                  className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                  title='View members'
               >
                  <FontAwesomeIcon icon={faUsers} className='text-gray-500' />
               </button>
            )}
         </div>

         {/* Messages Area */}
         <div
            className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50'
            onClick={() => setSelectedMessage(null)}
         >
            {isLoadingMessages ? (
               <div className='flex items-center justify-center h-full'>
                  <div className='flex flex-col items-center gap-3'>
                     <div className='w-8 h-8 border-3 border-[#3298C8] border-t-transparent rounded-full animate-spin'></div>
                     <p className='text-gray-500 text-sm'>
                        Loading messages...
                     </p>
                  </div>
               </div>
            ) : messages.length === 0 ? (
               <div className='flex items-center justify-center h-full'>
                  <p className='text-gray-400 text-sm'>
                     No messages yet. Start the conversation!
                  </p>
               </div>
            ) : (
               messages.map((msg) => (
                  <div
                     key={msg.id}
                     className={`flex ${isOwnMessage(msg) ? "justify-end" : "justify-start"} relative`}
                  >
                     <div
                        onClick={(e) => handleMessageClick(msg, e)}
                        className={`max-w-[70%] cursor-pointer transition-all ${
                           isOwnMessage(msg)
                              ? "bg-[#3298C8] text-white rounded-2xl rounded-br-md"
                              : "bg-gray-700 text-gray-100 rounded-2xl rounded-bl-md shadow-sm"
                        } px-4 py-3 ${selectedMessage?.id === msg.id ? "ring-2 ring-sky-400 ring-offset-2" : ""}`}
                     >
                        {/* Reply quote if this message is a reply */}
                        {msg.replyTo && (
                           <div
                              className={`mb-2 p-2 rounded-lg border-l-4 ${
                                 isOwnMessage(msg)
                                    ? "bg-white/10 border-white/50"
                                    : "bg-black/10 border-sky-400"
                              }`}
                           >
                              <p className='text-[10px] font-semibold opacity-70'>
                                 {msg.replyTo.sender ||
                                    msg.replyTo.convoUser?.userName}
                              </p>
                              <p className='text-xs opacity-80 line-clamp-2'>
                                 {msg.replyTo.text || msg.replyTo.content}
                              </p>
                           </div>
                        )}

                        {(activeTab === "community" ||
                           activeTab === "groups") &&
                           !isOwnMessage(msg) && (
                              <p className='text-xs font-semibold text-sky-300 mb-1'>
                                 {msg.sender}
                              </p>
                           )}
                        <p className='text-sm'>{msg.text}</p>
                        <div
                           className={`flex items-center justify-end gap-1 mt-1 ${isOwnMessage(msg) ? "text-sky-100" : "text-gray-400"}`}
                        >
                           <span className='text-[10px]'>{msg.time}</span>
                           {isOwnMessage(msg) && (
                              <FontAwesomeIcon
                                 icon={faCheckDouble}
                                 className='text-[10px]'
                              />
                           )}
                        </div>
                     </div>

                     {/* Message Actions Popup */}
                     {selectedMessage?.id === msg.id && (
                        <div
                           className={`absolute ${isOwnMessage(msg) ? "right-0 mr-2" : "left-0 ml-2"} top-full mt-1 z-20`}
                           onClick={(e) => e.stopPropagation()}
                        >
                           <div className='bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden min-w-40'>
                              {/* Reply */}
                              <button
                                 onClick={() => handleReply(msg)}
                                 className='w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left'
                              >
                                 <FontAwesomeIcon
                                    icon={faReply}
                                    className='text-[#3298C8]'
                                 />
                                 <span className='text-sm font-medium text-gray-700'>
                                    Reply
                                 </span>
                              </button>

                              <div className='border-t border-gray-100' />

                              {/* Delete for me */}
                              <button
                                 onClick={() => handleDeleteForMe(msg.id)}
                                 className='w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left'
                              >
                                 <FontAwesomeIcon
                                    icon={faUserMinus}
                                    className='text-orange-500'
                                 />
                                 <span className='text-sm font-medium text-gray-700'>
                                    Delete for me
                                 </span>
                              </button>

                              {/* Delete for all - only for sender */}
                              {isOwnMessage(msg) && (
                                 <>
                                    <div className='border-t border-gray-100' />
                                    <button
                                       onClick={() =>
                                          handleDeleteForAll(msg.id)
                                       }
                                       className='w-full flex items-center gap-3 px-4 py-3 hover:bg-red-50 transition-colors text-left'
                                    >
                                       <FontAwesomeIcon
                                          icon={faTrashAlt}
                                          className='text-red-500'
                                       />
                                       <span className='text-sm font-medium text-red-600'>
                                          Delete for everyone
                                       </span>
                                    </button>
                                 </>
                              )}
                           </div>
                        </div>
                     )}
                  </div>
               ))
            )}
            <div ref={messagesEndRef} />
         </div>

         {/* Message Input */}
         <form
            onSubmit={handleSubmit}
            className='bg-white border-t border-gray-200'
         >
            {/* Reply Quote */}
            {replyingTo && (
               <div className='px-4 pt-3'>
                  <div className='flex items-start gap-2 p-3 bg-gray-100 rounded-xl border-l-4 border-[#3298C8]'>
                     <div className='flex-1 min-w-0'>
                        <p className='text-xs font-semibold text-[#3298C8]'>
                           Replying to{" "}
                           {replyingTo.sender === "me" ||
                           replyingTo.sender === "You"
                              ? "yourself"
                              : replyingTo.sender}
                        </p>
                        <p className='text-sm text-gray-600 truncate'>
                           {replyingTo.text}
                        </p>
                     </div>
                     <button
                        type='button'
                        onClick={() => setReplyingTo?.(null)}
                        className='p-1 hover:bg-gray-200 rounded-full transition-colors'
                     >
                        <FontAwesomeIcon
                           icon={faTimes}
                           className='text-gray-400 text-sm'
                        />
                     </button>
                  </div>
               </div>
            )}

            <div className='p-4 flex items-center gap-3'>
               <button
                  type='button'
                  className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
               >
                  <FontAwesomeIcon
                     icon={faSmile}
                     className='text-gray-400 text-xl'
                  />
               </button>
               <button
                  type='button'
                  className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
               >
                  <FontAwesomeIcon
                     icon={faImage}
                     className='text-gray-400 text-xl'
                  />
               </button>
               <input
                  type='text'
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder='Type a message...'
                  className='flex-1 p-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#3298C8]/30 transition-all'
               />
               <button
                  type='submit'
                  disabled={!message.trim()}
                  className='p-3 bg-[#3298C8] text-white rounded-xl hover:bg-sky-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed'
               >
                  <FontAwesomeIcon icon={faPaperPlane} />
               </button>
            </div>
         </form>

         {/* Delete Confirmation Modal */}
         {showDeleteConfirm && (
            <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4'>
               <div className='bg-white rounded-2xl p-6 max-w-sm w-full shadow-xl'>
                  <div className='text-center'>
                     <div
                        className={`w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 ${
                           showDeleteConfirm.type === "forAll"
                              ? "bg-red-100"
                              : "bg-orange-100"
                        }`}
                     >
                        <FontAwesomeIcon
                           icon={
                              showDeleteConfirm.type === "forAll"
                                 ? faTrashAlt
                                 : faUserMinus
                           }
                           className={`text-2xl ${showDeleteConfirm.type === "forAll" ? "text-red-500" : "text-orange-500"}`}
                        />
                     </div>
                     <h3 className='text-xl font-bold text-gray-800 mb-2'>
                        {showDeleteConfirm.type === "forAll"
                           ? "Delete for everyone?"
                           : "Delete for you?"}
                     </h3>
                     <p className='text-gray-500 mb-6'>
                        {showDeleteConfirm.type === "forAll"
                           ? "This message will be deleted for all members of this chat."
                           : "This message will only be removed from your view."}
                     </p>
                     <div className='flex gap-3'>
                        <button
                           onClick={() => setShowDeleteConfirm(null)}
                           className='flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors'
                        >
                           Cancel
                        </button>
                        <button
                           onClick={confirmDelete}
                           className={`flex-1 px-4 py-3 text-white rounded-xl font-medium transition-colors ${
                              showDeleteConfirm.type === "forAll"
                                 ? "bg-red-500 hover:bg-red-600"
                                 : "bg-orange-500 hover:bg-orange-600"
                           }`}
                        >
                           Delete
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default ChatView;
