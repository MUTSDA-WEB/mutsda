import { useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faArrowLeft,
   faEllipsisV,
   faGlobe,
   faSmile,
   faImage,
   faPaperPlane,
   faCheckDouble,
} from "@fortawesome/free-solid-svg-icons";

const ChatView = ({
   activeTab,
   selectedChat,
   setSelectedChat,
   messages,
   message,
   setMessage,
   onSendMessage,
}) => {
   const messagesEndRef = useRef(null);

   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [messages]);

   const handleSubmit = (e) => {
      e.preventDefault();
      onSendMessage();
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
                     ? "MUTSDA Community"
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
            <button className='p-2 hover:bg-gray-100 rounded-lg transition-colors'>
               <FontAwesomeIcon icon={faEllipsisV} className='text-gray-500' />
            </button>
         </div>

         {/* Messages Area */}
         <div className='flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50'>
            {messages.map((msg) => (
               <div
                  key={msg.id}
                  className={`flex ${msg.sender === "me" || msg.sender === "You" ? "justify-end" : "justify-start"}`}
               >
                  <div
                     className={`max-w-[70%] ${
                        msg.sender === "me" || msg.sender === "You"
                           ? "bg-[#3298C8] text-white rounded-2xl rounded-br-md"
                           : "bg-white text-gray-800 rounded-2xl rounded-bl-md shadow-sm"
                     } px-4 py-3`}
                  >
                     {(activeTab === "community" || activeTab === "groups") &&
                        msg.sender !== "me" &&
                        msg.sender !== "You" && (
                           <p className='text-xs font-semibold text-[#3298C8] mb-1'>
                              {msg.sender}
                           </p>
                        )}
                     <p className='text-sm'>{msg.text}</p>
                     <div
                        className={`flex items-center justify-end gap-1 mt-1 ${msg.sender === "me" || msg.sender === "You" ? "text-sky-100" : "text-gray-400"}`}
                     >
                        <span className='text-[10px]'>{msg.time}</span>
                        {(msg.sender === "me" || msg.sender === "You") && (
                           <FontAwesomeIcon
                              icon={faCheckDouble}
                              className='text-[10px]'
                           />
                        )}
                     </div>
                  </div>
               </div>
            ))}
            <div ref={messagesEndRef} />
         </div>

         {/* Message Input */}
         <form
            onSubmit={handleSubmit}
            className='p-4 bg-white border-t border-gray-200'
         >
            <div className='flex items-center gap-3'>
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
      </div>
   );
};

export default ChatView;
