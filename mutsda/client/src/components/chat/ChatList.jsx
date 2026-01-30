import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPlus } from "@fortawesome/free-solid-svg-icons";

const ChatList = ({
   activeTab,
   items = [],
   searchQuery,
   setSearchQuery,
   selectedChat,
   setSelectedChat,
   onCreateGroup,
}) => {
   // Ensure items is an array before filtering
   const itemsArray = Array.isArray(items) ? items : [];
   const filtered = itemsArray.filter((item) =>
      item?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
   );

   return (
      <div className='flex flex-col h-full'>
         {/* Search & Create */}
         <div className='p-4 space-y-3'>
            <div className='relative'>
               <FontAwesomeIcon
                  icon={faSearch}
                  className='absolute left-4 top-1/2 -translate-y-1/2 text-gray-400'
               />
               <input
                  type='text'
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={`Search ${activeTab}...`}
                  className='w-full pl-11 pr-4 py-3 bg-gray-100 rounded-xl outline-none focus:ring-2 focus:ring-[#3298C8]/30 transition-all'
               />
            </div>
            {activeTab === "groups" && (
               <button
                  onClick={onCreateGroup}
                  className='w-full flex items-center justify-center gap-2 p-3 bg-[#3298C8] text-white rounded-xl hover:bg-sky-600 transition-colors'
               >
                  <FontAwesomeIcon icon={faPlus} />
                  Create New Group
               </button>
            )}
         </div>

         {/* Chat List */}
         <div className='flex-1 overflow-y-auto'>
            {filtered.length === 0 ? (
               <div className='flex items-center justify-center h-32 text-gray-400'>
                  No {activeTab} found
               </div>
            ) : (
               filtered.map((item) => (
                  <div
                     key={item.id}
                     onClick={() => setSelectedChat(item)}
                     className={`flex items-center gap-3 p-4 cursor-pointer transition-all duration-200 border-b border-gray-100 ${
                        selectedChat?.id === item.id
                           ? "bg-sky-50"
                           : "hover:bg-gray-50"
                     }`}
                  >
                     <div className='relative'>
                        <div className='w-12 h-12 bg-linear-to-br from-[#3298C8] to-sky-600 rounded-full flex items-center justify-center text-white font-semibold'>
                           {item.avatar}
                        </div>
                        {activeTab === "messages" && item.online && (
                           <span className='absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full'></span>
                        )}
                     </div>
                     <div className='flex-1 min-w-0'>
                        <div className='flex justify-between items-start'>
                           <h4 className='font-semibold text-gray-800 truncate'>
                              {item.name}
                           </h4>
                           <span className='text-xs text-gray-400 whitespace-nowrap ml-2'>
                              {item.time}
                           </span>
                        </div>
                        <div className='flex justify-between items-center'>
                           <p className='text-sm text-gray-500 truncate'>
                              {activeTab === "groups" && (
                                 <span className='text-gray-400'>
                                    {item.members} members ·{" "}
                                 </span>
                              )}
                              {item.lastMessage}
                           </p>
                           {item.unread > 0 && (
                              <span className='ml-2 px-2 py-0.5 bg-[#3298C8] text-white text-xs font-bold rounded-full'>
                                 {item.unread}
                              </span>
                           )}
                        </div>
                     </div>
                  </div>
               ))
            )}
         </div>
      </div>
   );
};

export default ChatList;
