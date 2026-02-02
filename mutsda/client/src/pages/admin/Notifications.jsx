import { useEffect, useState } from "react";
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
import userStore from "../../hooks/useStore";
import { useGetUserGroups } from "../../services/getGroups";
import { useGetUsers } from "../../services/getUsers";
import {
   useGetCommunityMessages,
   useGetGroupMessages,
   useGetUserDirectMsg,
   useGetVisitorMessages,
} from "../../services/message";

const Notifications = () => {
   const [activeTab, setActiveTab] = useState("messages");
   const [selectedChat, setSelectedChat] = useState(null);
   const [message, setMessage] = useState("");
   const [searchQuery, setSearchQuery] = useState("");
   const [showCreateGroup, setShowCreateGroup] = useState(false);
   const [newGroupName, setNewGroupName] = useState("");
   const [selectedMembers, setSelectedMembers] = useState([]);

   // Todo:  get user groups
   const {
      data: groupData,
      isSuccess: groupSuccess,
      isLoading: groupLoading,
      isError: groupError,
   } = useGetUserGroups();
   // Todo: get users from the db
   const {
      data: users,
      isSuccess: userSuccess,
      isLoading: userLoading,
      isError: userError,
   } = useGetUsers();
   // Todo: get user DirectMessages
   const {
      data: userDMs,
      isSuccess: DMSuccess,
      isLoading: DMloading,
      isError: DMError,
   } = useGetUserDirectMsg();
   // Todo: get group messages
   // const {data: groupMsg, isSuccess: gSuccess, isLoading: gLoading, isError: gError} = useGetGroupMessages()
   // Todo: get comminity messages
   const {
      data: comMsg,
      isSuccess: comSuccess,
      isLoading: comLoading,
      isError: comError,
   } = useGetCommunityMessages();
   // Todo: get visitor messages
   const {
      data: visitorMsg,
      isSuccess: visitorSuccess,
      isLoading: visitorLoading,
      isError: visitorError,
   } = useGetVisitorMessages();

   //  destructure userStore to get the necessary resources
   const {
      setGroups,
      setMembers,
      setComMsg,
      setVisitorMsg,
      groups,
      directMessages,
      communityMessages,
      members,
      visitorMessages,
      setDMs,
      user,
   } = userStore();

   // update the stores whenever the data is ready/available
   useEffect(() => {
      // API returns { message: "...", dataKey: [...] }, extract the array
      if (groupData?.userGroups && groupSuccess)
         setGroups(groupData.userGroups);
      if (users?.leaders && userSuccess) setMembers(users.leaders);
      if (comMsg?.DMs && comSuccess) setComMsg(comMsg.DMs);
      if (userDMs?.DMs && DMSuccess) setDMs(userDMs.DMs);
      if (visitorMsg?.visitorMsg && visitorSuccess)
         setVisitorMsg(visitorMsg.visitorMsg);
   }, [
      groupData,
      users,
      comMsg,
      visitorMsg,
      userDMs,
      groupSuccess,
      visitorSuccess,
      DMSuccess,
      comSuccess,
      userSuccess,
      setGroups,
      setMembers,
      setComMsg,
      setDMs,
      setVisitorMsg,
   ]);

   const handleSendMessage = () => {
      if (!message.trim()) return;

      const newMessage = {
         id: Date.now(),
         sender: activeTab === "community" ? user?.username || "You" : "me",
         text: message,
         time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
         }),
         avatar: user?.username?.substring(0, 2).toUpperCase() || "YO",
      };

      if (activeTab === "messages" && selectedChat) {
         // Update direct messages in store
         const updatedDMs = directMessages.map((chat) =>
            chat.id === selectedChat.id
               ? {
                    ...chat,
                    messages: [...(chat.messages || []), newMessage],
                    lastMessage: message,
                    time: "Just now",
                 }
               : chat,
         );
         setDMs(updatedDMs);
         setSelectedChat((prev) => ({
            ...prev,
            messages: [...(prev.messages || []), newMessage],
         }));
      } else if (activeTab === "groups" && selectedChat) {
         // Update groups in store
         const updatedGroups = groups.map((group) =>
            group.id === selectedChat.id
               ? {
                    ...group,
                    messages: [...(group.messages || []), newMessage],
                    lastMessage: message,
                    time: "Just now",
                 }
               : group,
         );
         setGroups(updatedGroups);
         setSelectedChat((prev) => ({
            ...prev,
            messages: [...(prev.messages || []), newMessage],
         }));
      } else if (activeTab === "community") {
         // Update community messages in store
         setComMsg([...communityMessages, newMessage]);
      }

      setMessage("");
      // TODO: Send message to backend API
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

      // Update groups in store
      setGroups([newGroup, ...groups]);
      setShowCreateGroup(false);
      setNewGroupName("");
      setSelectedMembers([]);
      // TODO: Create group via backend API
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
            allUsers={members}
            onCreateGroup={handleCreateGroup}
         />
      </div>
   );
};

export default Notifications;
