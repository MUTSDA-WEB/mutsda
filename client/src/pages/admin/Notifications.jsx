import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
   faComments,
   faUsers,
   faGlobe,
   faUserSecret,
} from "@fortawesome/free-solid-svg-icons";
import {
   ChatList,
   ChatView,
   CreateGroupModal,
   EmptyState,
   VisitorMessages,
} from "../../components/chat/index";

const Notifications = () => {
   const [activeTab, setActiveTab] = useState("messages");
   const [selectedChat, setSelectedChat] = useState(null);
   const [message, setMessage] = useState("");
   const [searchQuery, setSearchQuery] = useState("");
   const [showCreateGroup, setShowCreateGroup] = useState(false);
   const [newGroupName, setNewGroupName] = useState("");
   const [selectedMembers, setSelectedMembers] = useState([]);

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

   const handleSendMessage = () => {
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
      { id: "visitors", name: "Visitors", icon: faUserSecret },
   ];

   const getCurrentMessages = () => {
      if (activeTab === "community") return communityMessages;
      return selectedChat?.messages || [];
   };

   const getCurrentItems = () => {
      return activeTab === "messages" ? directMessages : groups;
   };

   return (
      <div className='h-[calc(100vh-80px)] flex flex-col animate-fadeIn'>
         {/* Tabs */}
         <div className='bg-white border-b border-gray-200 px-4'>
            <div className='flex gap-1 overflow-x-auto'>
               {tabs.map((tab) => (
                  <button
                     key={tab.id}
                     onClick={() => {
                        setActiveTab(tab.id);
                        setSelectedChat(null);
                     }}
                     className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 relative whitespace-nowrap ${
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
            {/* Visitors Tab */}
            {activeTab === "visitors" ? (
               <VisitorMessages />
            ) : (
               <>
                  {/* Sidebar - Chat List (for messages and groups) */}
                  {activeTab !== "community" && (
                     <div
                        className={`w-full lg:w-80 bg-white border-r border-gray-200 flex flex-col ${
                           selectedChat ? "hidden lg:flex" : "flex"
                        }`}
                     >
                        <ChatList
                           activeTab={activeTab}
                           items={getCurrentItems()}
                           searchQuery={searchQuery}
                           setSearchQuery={setSearchQuery}
                           selectedChat={selectedChat}
                           setSelectedChat={setSelectedChat}
                           onCreateGroup={() => setShowCreateGroup(true)}
                        />
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
                        <ChatView
                           activeTab={activeTab}
                           selectedChat={null}
                           setSelectedChat={setSelectedChat}
                           messages={getCurrentMessages()}
                           message={message}
                           setMessage={setMessage}
                           onSendMessage={handleSendMessage}
                        />
                     ) : selectedChat ? (
                        <ChatView
                           activeTab={activeTab}
                           selectedChat={selectedChat}
                           setSelectedChat={setSelectedChat}
                           messages={getCurrentMessages()}
                           message={message}
                           setMessage={setMessage}
                           onSendMessage={handleSendMessage}
                        />
                     ) : (
                        <EmptyState activeTab={activeTab} />
                     )}
                  </div>
               </>
            )}
         </div>

         {/* Create Group Modal */}
         <CreateGroupModal
            show={showCreateGroup}
            onClose={() => setShowCreateGroup(false)}
            groupName={newGroupName}
            setGroupName={setNewGroupName}
            selectedMembers={selectedMembers}
            setSelectedMembers={setSelectedMembers}
            allUsers={allUsers}
            onCreateGroup={handleCreateGroup}
         />
      </div>
   );
};

export default Notifications;
