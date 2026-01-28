import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faComments,
   faUsers,
   faGlobe,
   faSearch,
   faPaperPlane,
   faPlus,
   faEllipsisV,
   faUserPlus,
   faArrowLeft,
   faCheck,
   faCheckDouble,
   faImage,
   faSmile,
   faTimes,
} from "@fortawesome/free-solid-svg-icons";

const Notifications = () => {
   const [activeTab, setActiveTab] = useState("messages"); // messages, groups, community
   const [selectedChat, setSelectedChat] = useState(null);
   const [message, setMessage] = useState("");
   const [searchQuery, setSearchQuery] = useState("");
   const [showCreateGroup, setShowCreateGroup] = useState(false);
   const [newGroupName, setNewGroupName] = useState("");
   const [selectedMembers, setSelectedMembers] = useState([]);
   const messagesEndRef = useRef(null);

   // Sample data - Replace with actual API data
   const [directMessages, setDirectMessages] = useState([
      {
         id: 1,
         name: "John Doe",
         avatar: "JD",
         lastMessage: "See you at the event tomorrow!",
         time: "2 min ago",
         unread: 2,
         online: true,
         messages: [
            {
               id: 1,
               sender: "them",
               text: "Hello! How are you?",
               time: "10:30 AM",
            },
            {
               id: 2,
               sender: "me",
               text: "I'm doing great, thanks! How about you?",
               time: "10:32 AM",
            },
            {
               id: 3,
               sender: "them",
               text: "Good! Are you coming to the event tomorrow?",
               time: "10:35 AM",
            },
            {
               id: 4,
               sender: "me",
               text: "Yes, definitely! What time does it start?",
               time: "10:36 AM",
            },
            {
               id: 5,
               sender: "them",
               text: "It starts at 8 AM. See you there!",
               time: "10:38 AM",
            },
            {
               id: 6,
               sender: "them",
               text: "See you at the event tomorrow!",
               time: "10:40 AM",
            },
         ],
      },
      {
         id: 2,
         name: "Sarah Wilson",
         avatar: "SW",
         lastMessage: "Thanks for the help!",
         time: "1 hour ago",
         unread: 0,
         online: false,
         messages: [
            {
               id: 1,
               sender: "me",
               text: "Hi Sarah, did you need help with the choir practice?",
               time: "9:00 AM",
            },
            {
               id: 2,
               sender: "them",
               text: "Yes please! I'm struggling with the alto part.",
               time: "9:15 AM",
            },
            {
               id: 3,
               sender: "me",
               text: "No problem, I'll send you the recording.",
               time: "9:20 AM",
            },
            {
               id: 4,
               sender: "them",
               text: "Thanks for the help!",
               time: "9:25 AM",
            },
         ],
      },
      {
         id: 3,
         name: "Michael Brown",
         avatar: "MB",
         lastMessage: "God bless you!",
         time: "Yesterday",
         unread: 0,
         online: true,
         messages: [
            {
               id: 1,
               sender: "them",
               text: "God bless you!",
               time: "Yesterday",
            },
         ],
      },
   ]);

   const [groups, setGroups] = useState([
      {
         id: 1,
         name: "Youth Ministry",
         avatar: "YM",
         members: 24,
         lastMessage: "Meeting rescheduled to 5 PM",
         time: "5 min ago",
         unread: 5,
         messages: [
            {
               id: 1,
               sender: "John",
               text: "Hey everyone! Quick update about tomorrow.",
               time: "3:00 PM",
            },
            {
               id: 2,
               sender: "Sarah",
               text: "What's the update?",
               time: "3:02 PM",
            },
            {
               id: 3,
               sender: "John",
               text: "Meeting rescheduled to 5 PM",
               time: "3:05 PM",
            },
         ],
      },
      {
         id: 2,
         name: "Choir Group",
         avatar: "CG",
         members: 15,
         lastMessage: "Practice tomorrow at 4 PM",
         time: "2 hours ago",
         unread: 0,
         messages: [
            {
               id: 1,
               sender: "Leader",
               text: "Practice tomorrow at 4 PM",
               time: "1:00 PM",
            },
         ],
      },
      {
         id: 3,
         name: "Bible Study Team",
         avatar: "BS",
         members: 12,
         lastMessage: "This week's topic: Book of Romans",
         time: "Yesterday",
         unread: 0,
         messages: [
            {
               id: 1,
               sender: "Pastor",
               text: "This week's topic: Book of Romans",
               time: "Yesterday",
            },
         ],
      },
   ]);

   const [communityMessages, setCommunityMessages] = useState([
      {
         id: 1,
         sender: "Pastor James",
         text: "Good morning everyone! Blessed Sabbath to all.",
         time: "8:00 AM",
         avatar: "PJ",
      },
      {
         id: 2,
         sender: "Mary Johnson",
         text: "Blessed Sabbath! 🙏",
         time: "8:05 AM",
         avatar: "MJ",
      },
      {
         id: 3,
         sender: "David Kim",
         text: "Amen! See everyone at service.",
         time: "8:10 AM",
         avatar: "DK",
      },
      {
         id: 4,
         sender: "Sarah Wilson",
         text: "Looking forward to today's sermon!",
         time: "8:15 AM",
         avatar: "SW",
      },
      {
         id: 5,
         sender: "John Doe",
         text: "Don't forget the youth event after service!",
         time: "8:20 AM",
         avatar: "JD",
      },
   ]);

   const allUsers = [
      { id: 1, name: "John Doe", avatar: "JD" },
      { id: 2, name: "Sarah Wilson", avatar: "SW" },
      { id: 3, name: "Michael Brown", avatar: "MB" },
      { id: 4, name: "Mary Johnson", avatar: "MJ" },
      { id: 5, name: "David Kim", avatar: "DK" },
      { id: 6, name: "Pastor James", avatar: "PJ" },
      { id: 7, name: "Anna Lee", avatar: "AL" },
      { id: 8, name: "Peter Chen", avatar: "PC" },
   ];

   // Scroll to bottom when messages change
   useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
   }, [selectedChat]);

   const handleSendMessage = (e) => {
      e.preventDefault();
      if (!message.trim()) return;

      const newMessage = {
         id: Date.now(),
         sender: activeTab === "community" ? "You" : "me",
         text: message,
         time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
         }),
         avatar: "YO",
      };

      if (activeTab === "messages" && selectedChat) {
         setDirectMessages((prev) =>
            prev.map((chat) =>
               chat.id === selectedChat.id
                  ? {
                       ...chat,
                       messages: [...chat.messages, newMessage],
                       lastMessage: message,
                       time: "Just now",
                    }
                  : chat,
            ),
         );
         setSelectedChat((prev) => ({
            ...prev,
            messages: [...prev.messages, newMessage],
         }));
      } else if (activeTab === "groups" && selectedChat) {
         setGroups((prev) =>
            prev.map((group) =>
               group.id === selectedChat.id
                  ? {
                       ...group,
                       messages: [...group.messages, newMessage],
                       lastMessage: message,
                       time: "Just now",
                    }
                  : group,
            ),
         );
         setSelectedChat((prev) => ({
            ...prev,
            messages: [...prev.messages, newMessage],
         }));
      } else if (activeTab === "community") {
         setCommunityMessages((prev) => [...prev, newMessage]);
      }

      setMessage("");
   };

   const handleCreateGroup = () => {
      if (!newGroupName.trim() || selectedMembers.length === 0) return;

      const newGroup = {
         id: Date.now(),
         name: newGroupName,
         avatar: newGroupName.substring(0, 2).toUpperCase(),
         members: selectedMembers.length + 1,
         lastMessage: "Group created",
         time: "Just now",
         unread: 0,
         messages: [
            {
               id: 1,
               sender: "System",
               text: "Group created. Start chatting!",
               time: "Just now",
            },
         ],
      };

      setGroups((prev) => [newGroup, ...prev]);
      setShowCreateGroup(false);
      setNewGroupName("");
      setSelectedMembers([]);
   };

   const tabs = [
      { id: "messages", name: "Messages", icon: faComments },
      { id: "groups", name: "Groups", icon: faUsers },
      { id: "community", name: "Community", icon: faGlobe },
   ];

   const renderChatList = () => {
      const list = activeTab === "messages" ? directMessages : groups;
      const filtered = list.filter((item) =>
         item.name.toLowerCase().includes(searchQuery.toLowerCase()),
      );

      return filtered.map((item) => (
         <div
            key={item.id}
            onClick={() => setSelectedChat(item)}
            className={`flex items-center gap-3 p-4 cursor-pointer transition-all duration-200 border-b border-gray-100 ${
               selectedChat?.id === item.id ? "bg-sky-50" : "hover:bg-gray-50"
            }`}
         >
            <div className='relative'>
               <div
                  className='w-12 h-12 bg-linear
               -to-br from-[#3298C8] to-sky-600 rounded-full flex items-center justify-center text-white font-semibold'
               >
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
      ));
   };

   const renderChatView = () => {
      const messages =
         activeTab === "community"
            ? communityMessages
            : selectedChat?.messages || [];

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
                  <FontAwesomeIcon
                     icon={faEllipsisV}
                     className='text-gray-500'
                  />
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
                        {(activeTab === "community" ||
                           activeTab === "groups") &&
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
               onSubmit={handleSendMessage}
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

   return (
      <div className='h-[calc(100vh-80px)] flex flex-col animate-fadeIn'>
         {/* Tabs */}
         <div className='bg-white border-b border-gray-200 px-4'>
            <div className='flex gap-1'>
               {tabs.map((tab) => (
                  <button
                     key={tab.id}
                     onClick={() => {
                        setActiveTab(tab.id);
                        setSelectedChat(null);
                     }}
                     className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 relative ${
                        activeTab === tab.id
                           ? "text-[#3298C8]"
                           : "text-gray-500 hover:text-gray-700"
                     }`}
                  >
                     <FontAwesomeIcon icon={tab.icon} />
                     <span className='hidden sm:inline'>{tab.name}</span>
                     {activeTab === tab.id && (
                        <span className='absolute bottom-0 left-0 right-0 h-0.5 bg-[#3298C8]'></span>
                     )}
                  </button>
               ))}
            </div>
         </div>

         {/* Main Content */}
         <div className='flex-1 flex overflow-hidden'>
            {/* Sidebar - Chat List (for messages and groups) */}
            {activeTab !== "community" && (
               <div
                  className={`w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col ${
                     selectedChat ? "hidden lg:flex" : "flex"
                  }`}
               >
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
                           onClick={() => setShowCreateGroup(true)}
                           className='w-full flex items-center justify-center gap-2 p-3 bg-[#3298C8] text-white rounded-xl hover:bg-sky-600 transition-colors'
                        >
                           <FontAwesomeIcon icon={faPlus} />
                           Create New Group
                        </button>
                     )}
                  </div>

                  {/* Chat List */}
                  <div className='flex-1 overflow-y-auto'>
                     {renderChatList()}
                  </div>
               </div>
            )}

            {/* Chat View */}
            <div
               className={`flex-1 flex flex-col bg-white ${
                  activeTab !== "community" && !selectedChat
                     ? "hidden lg:flex"
                     : "flex"
               }`}
            >
               {activeTab === "community" ? (
                  renderChatView()
               ) : selectedChat ? (
                  renderChatView()
               ) : (
                  <div className='flex-1 flex items-center justify-center bg-gray-50'>
                     <div className='text-center'>
                        <div className='w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4'>
                           <FontAwesomeIcon
                              icon={faComments}
                              className='text-4xl text-gray-400'
                           />
                        </div>
                        <h3 className='text-xl font-semibold text-gray-700 mb-2'>
                           Select a conversation
                        </h3>
                        <p className='text-gray-500'>
                           Choose a{" "}
                           {activeTab === "messages" ? "contact" : "group"} to
                           start chatting
                        </p>
                     </div>
                  </div>
               )}
            </div>
         </div>

         {/* Create Group Modal */}
         {showCreateGroup && (
            <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4'>
               <div className='bg-white rounded-2xl w-full max-w-md overflow-hidden animate-fadeIn'>
                  <div className='p-6 border-b border-gray-200 flex items-center justify-between'>
                     <h3 className='text-xl font-bold text-gray-800'>
                        Create New Group
                     </h3>
                     <button
                        onClick={() => setShowCreateGroup(false)}
                        className='p-2 hover:bg-gray-100 rounded-lg transition-colors'
                     >
                        <FontAwesomeIcon
                           icon={faTimes}
                           className='text-gray-500'
                        />
                     </button>
                  </div>

                  <div className='p-6 space-y-6'>
                     {/* Group Name */}
                     <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                           Group Name
                        </label>
                        <input
                           type='text'
                           value={newGroupName}
                           onChange={(e) => setNewGroupName(e.target.value)}
                           placeholder='Enter group name...'
                           className='w-full p-3 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#3298C8]/30 transition-all'
                        />
                     </div>

                     {/* Select Members */}
                     <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                           Add Members ({selectedMembers.length} selected)
                        </label>
                        <div className='max-h-48 overflow-y-auto border border-gray-200 rounded-xl'>
                           {allUsers.map((user) => (
                              <label
                                 key={user.id}
                                 className='flex items-center gap-3 p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-100 last:border-b-0'
                              >
                                 <input
                                    type='checkbox'
                                    checked={selectedMembers.includes(user.id)}
                                    onChange={(e) => {
                                       if (e.target.checked) {
                                          setSelectedMembers([
                                             ...selectedMembers,
                                             user.id,
                                          ]);
                                       } else {
                                          setSelectedMembers(
                                             selectedMembers.filter(
                                                (id) => id !== user.id,
                                             ),
                                          );
                                       }
                                    }}
                                    className='w-5 h-5 text-[#3298C8] rounded focus:ring-[#3298C8]'
                                 />
                                 <div className='w-10 h-10 bg-linear-to-br from-[#3298C8] to-sky-600 rounded-full flex items-center justify-center text-white text-sm font-semibold'>
                                    {user.avatar}
                                 </div>
                                 <span className='font-medium text-gray-800'>
                                    {user.name}
                                 </span>
                              </label>
                           ))}
                        </div>
                     </div>
                  </div>

                  <div className='p-6 border-t border-gray-200 flex gap-3'>
                     <button
                        onClick={() => setShowCreateGroup(false)}
                        className='flex-1 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors font-medium'
                     >
                        Cancel
                     </button>
                     <button
                        onClick={handleCreateGroup}
                        disabled={
                           !newGroupName.trim() || selectedMembers.length === 0
                        }
                        className='flex-1 p-3 bg-[#3298C8] text-white rounded-xl hover:bg-sky-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'
                     >
                        Create Group
                     </button>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default Notifications;
