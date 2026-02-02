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
import { useCreateGroup, useGetUserGroups } from "../../services/groups";
import { useGetUsers } from "../../services/getUsers";
import {
   useGetCommunityMessages,
   useGetGroupMessages,
   useGetUserDirectMsg,
   useGetVisitorMessages,
} from "../../services/message";
import useChatSocket from "../../hooks/useChatSocket";
import { queryClient } from "../../main";

const Notifications = () => {
   const [activeTab, setActiveTab] = useState("messages");
   const [selectedChat, setSelectedChat] = useState(null);
   const [message, setMessage] = useState("");
   const [searchQuery, setSearchQuery] = useState("");
   const [showCreateGroup, setShowCreateGroup] = useState(false);
   const [newGroupName, setNewGroupName] = useState("");
   const [selectedMembers, setSelectedMembers] = useState([]);

   // Integrate chat socket - moved up to be available for handleSendMessage
   const { sendMessage } = useChatSocket({ activeTab, selectedChat });

   // * run the create group service
   const {
      mutate: createGroup,
      isLoading: createGLoad,
      data,
   } = useCreateGroup();

   // *  get user groups
   const {
      data: groupData,
      isSuccess: groupSuccess,
      isLoading: groupLoading,
      isError: groupError,
   } = useGetUserGroups();
   // * get users from the db
   const {
      data: users,
      isSuccess: userSuccess,
      isLoading: userLoading,
      isError: userError,
   } = useGetUsers();
   // * get user DirectMessages
   const {
      data: userDMs,
      isSuccess: DMSuccess,
      isLoading: DMloading,
      isError: DMError,
   } = useGetUserDirectMsg();
   // * get group messages - fetch when a group is selected
   const {
      data: groupMsg,
      isSuccess: gSuccess,
      isLoading: gLoading,
      isError: gError,
   } = useGetGroupMessages(
      activeTab === "groups" && selectedChat?.id ? selectedChat.id : null,
   );
   // * get comminity messages
   const {
      data: comMsg,
      isSuccess: comSuccess,
      isLoading: comLoading,
      isError: comError,
   } = useGetCommunityMessages();
   // * get visitor messages
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
      // Transform groups to match expected shape (id, name, avatar, etc.)
      if (groupData?.userGroups && groupSuccess) {
         const transformedGroups = groupData.userGroups.map((group) => ({
            id: group.groupId,
            name: group.groupName,
            avatar: group.groupName?.substring(0, 2).toUpperCase() || "GR",
            members: group._count?.groupMembers || 0,
            lastMessage: group.lastMessage || "No messages yet",
            time: group.updatedAt
               ? new Date(group.updatedAt).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                 })
               : "",
            unread: 0,
            messages: [],
         }));
         setGroups(transformedGroups);
      }
      if (users?.leaders && userSuccess) setMembers(users.leaders);
      if (comMsg?.DMs && comSuccess) setComMsg(comMsg.DMs);
      if (visitorMsg?.visitorMsg && visitorSuccess)
         setVisitorMsg(visitorMsg.visitorMsg);

      // Transform raw DM data into grouped chat list format
      if (userDMs?.DMs && DMSuccess && users?.leaders) {
         const rawDMs = userDMs.DMs;
         const leadersMap = new Map(
            users.leaders.map((l) => [l.userID, l.userName]),
         );

         // Group messages by the other person in the conversation
         const chatMap = new Map();
         rawDMs.forEach((dm) => {
            // Determine the other person's ID
            const otherUserId =
               dm.userId === user?.userID ? dm.receiverId : dm.userId;
            if (!otherUserId) return;

            if (!chatMap.has(otherUserId)) {
               const otherUserName =
                  leadersMap.get(otherUserId) || "Unknown User";
               chatMap.set(otherUserId, {
                  id: otherUserId,
                  name: otherUserName,
                  avatar: otherUserName.substring(0, 2).toUpperCase(),
                  messages: [],
                  online: false,
                  lastMessage: "",
                  time: "",
                  unread: 0,
               });
            }

            const chat = chatMap.get(otherUserId);
            chat.messages.push({
               id: dm.messageId,
               sender:
                  dm.userId === user?.userID
                     ? "me"
                     : leadersMap.get(dm.userId) || "Unknown",
               text: dm.content,
               time: new Date(dm.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
               }),
            });
         });

         // Set lastMessage and time from the most recent message
         chatMap.forEach((chat) => {
            if (chat.messages.length > 0) {
               // Sort messages by time (newest last)
               chat.messages.sort((a, b) => new Date(a.id) - new Date(b.id));
               const lastMsg = chat.messages[chat.messages.length - 1];
               chat.lastMessage =
                  lastMsg.text?.substring(0, 30) +
                  (lastMsg.text?.length > 30 ? "..." : "");
               chat.time = lastMsg.time;
            }
         });

         setDMs(Array.from(chatMap.values()));
      }
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
      user?.userID,
   ]);

   // Update selected chat with group messages when they are fetched
   useEffect(() => {
      if (
         gSuccess &&
         groupMsg?.messages &&
         selectedChat &&
         activeTab === "groups"
      ) {
         const transformedMessages = groupMsg.messages.map((msg) => ({
            id: msg.messageId,
            sender:
               msg.userId === user?.userID
                  ? "me"
                  : msg.user?.userName || "Unknown",
            text: msg.content,
            time: new Date(msg.createdAt).toLocaleTimeString([], {
               hour: "2-digit",
               minute: "2-digit",
            }),
            avatar: msg.user?.userName?.substring(0, 2).toUpperCase() || "??",
         }));
         setSelectedChat((prev) => ({
            ...prev,
            messages: transformedMessages,
         }));
      }
   }, [gSuccess, groupMsg, selectedChat?.id, activeTab, user?.userID]);

   // Compute overall loading and error states
   const isLoading =
      groupLoading || userLoading || DMloading || comLoading || visitorLoading;
   const hasError =
      groupError || userError || DMError || comError || visitorError;

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
         // Add type and routing info for socket
         type:
            activeTab === "messages"
               ? "direct"
               : activeTab === "groups"
                 ? "group"
                 : activeTab === "community"
                   ? "community"
                   : "visitor",
         userId: user?.userID,
         receiverId:
            activeTab === "messages" && selectedChat
               ? selectedChat.id
               : undefined,
         groupId:
            activeTab === "groups" && selectedChat
               ? selectedChat.id
               : undefined,
         room: activeTab === "community" ? "community" : selectedChat?.id,
      };

      sendMessage(newMessage); // send via socket and localforage

      // Optimistically update UI as before
      if (activeTab === "messages" && selectedChat) {
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
         setComMsg([...communityMessages, newMessage]);
      }

      setMessage("");
   };

   const handleCreateGroup = () => {
      if (!newGroupName.trim() || selectedMembers.length === 0) return;
      // Create group via backend API
      createGroup(
         { newGroupName, selectedMembers },
         {
            onSuccess: (response) => {
               console.log("Group created:", response?.group);
               // Invalidate and refetch groups
               queryClient.invalidateQueries({ queryKey: ["GET_USER_GROUPS"] });
               // Close modal and reset form
               setShowCreateGroup(false);
               setNewGroupName("");
               setSelectedMembers([]);
            },
            onError: (error) => {
               console.log("Failed to create group:", error);
            },
         },
      );
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
            {/* Loading State */}
            {isLoading && (
               <div className='flex-1 flex items-center justify-center'>
                  <div className='flex flex-col items-center gap-3'>
                     <div className='w-10 h-10 border-4 border-[#3298C8] border-t-transparent rounded-full animate-spin'></div>
                     <p className='text-gray-500'>Loading...</p>
                  </div>
               </div>
            )}

            {/* Error State */}
            {hasError && !isLoading && (
               <div className='flex-1 flex items-center justify-center'>
                  <div className='flex flex-col items-center gap-3 text-center px-4'>
                     <div className='w-16 h-16 bg-red-100 rounded-full flex items-center justify-center'>
                        <span className='text-red-500 text-2xl'>!</span>
                     </div>
                     <p className='text-gray-700 font-medium'>
                        Something went wrong
                     </p>
                     <p className='text-gray-500 text-sm'>
                        Failed to load data. Please try again.
                     </p>
                  </div>
               </div>
            )}

            {/* Visitors Tab */}
            {!isLoading && !hasError && activeTab === "visitors" ? (
               <VisitorMessages />
            ) : (
               !isLoading &&
               !hasError && (
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
                              isLoadingMessages={comLoading}
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
                              isLoadingMessages={
                                 activeTab === "groups" ? gLoading : false
                              }
                           />
                        ) : (
                           <EmptyState activeTab={activeTab} />
                        )}
                     </div>
                  </>
               )
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
            isLoading={createGLoad}
            onCreateGroup={handleCreateGroup}
         />
      </div>
   );
};

export default Notifications;
