import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import localforage from "localforage";
import userStore from "./useStore";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export default function useChatSocket({ activeTab, selectedChat }) {
   const socketRef = useRef(null);
   const isConnected = useRef(false);
   const user = userStore((state) => state.user);

   // Connect socket on mount
   useEffect(() => {
      if (!socketRef.current) {
         socketRef.current = io(SOCKET_URL, {
            query: { userId: user?.userID },
            transports: ["websocket", "polling"],
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
         });

         socketRef.current.on("connect", () => {
            console.log("Socket connected:", socketRef.current.id);
            isConnected.current = true;

            // Resend unsent messages on reconnect
            localforage.getItem("unsentMessages").then((msgs) => {
               if (Array.isArray(msgs) && msgs.length > 0) {
                  msgs.forEach((msg) =>
                     socketRef.current.emit("chat:message", msg),
                  );
               }
            });
         });

         socketRef.current.on("disconnect", () => {
            console.log("Socket disconnected");
            isConnected.current = false;
         });

         socketRef.current.on("connect_error", (err) => {
            console.error("Socket connection error:", err.message);
         });

         // Listen for incoming messages
         socketRef.current.on("chat:message", (msg) => {
            const state = userStore.getState();
            const {
               setDMs,
               setGroupMessages,
               setComMsg,
               setVisitorMsg,
               directMessages,
               groups,
               communityMessages,
               visitorMessages,
            } = state;

            // Don't add duplicate messages (from own send - already added optimistically)
            if (msg.senderId === user?.userID || msg.userId === user?.userID) {
               return;
            }

            if (msg.type === "direct") {
               // Check if message already exists
               const chatExists = directMessages.some((chat) =>
                  chat.messages?.some(
                     (m) => m.id === msg.id || m.tempId === msg.tempId,
                  ),
               );
               if (chatExists) return;

               // Update the specific DM conversation
               const updatedDMs = directMessages.map((chat) =>
                  chat.id === msg.senderId || chat.id === msg.receiverId
                     ? {
                          ...chat,
                          messages: [...(chat.messages || []), msg],
                          lastMessage: msg.text,
                          time: msg.time,
                       }
                     : chat,
               );
               setDMs(updatedDMs);
            } else if (msg.type === "group") {
               // Check if message already exists
               const groupChat = groups.find((g) => g.id === msg.groupId);
               if (
                  groupChat?.messages?.some(
                     (m) => m.id === msg.id || m.tempId === msg.tempId,
                  )
               )
                  return;

               // Update the specific group conversation
               const updatedGroups = groups.map((group) =>
                  group.id === msg.groupId
                     ? {
                          ...group,
                          messages: [...(group.messages || []), msg],
                          lastMessage: msg.text,
                          time: msg.time,
                       }
                     : group,
               );
               userStore.getState().setGroups(updatedGroups);
            } else if (msg.type === "community") {
               // Check if message already exists
               if (
                  communityMessages.some(
                     (m) => m.id === msg.id || m.tempId === msg.tempId,
                  )
               )
                  return;
               setComMsg([...communityMessages, msg]);
            } else if (msg.type === "visitor") {
               // Check if message already exists
               if (
                  visitorMessages.some(
                     (m) => m.id === msg.id || m.tempId === msg.tempId,
                  )
               )
                  return;
               setVisitorMsg([...visitorMessages, msg]);
            }
         });

         // Listen for ack to remove from localforage
         socketRef.current.on("chat:ack", ({ tempId }) => {
            localforage.getItem("unsentMessages").then((msgs = []) => {
               if (Array.isArray(msgs)) {
                  const filtered = msgs.filter((m) => m.tempId !== tempId);
                  localforage.setItem("unsentMessages", filtered);
               }
            });
         });
      }

      return () => {
         // Don't disconnect on tab change, only on unmount
      };
   }, [user?.userID]);

   // Join/leave rooms based on activeTab and selectedChat
   useEffect(() => {
      if (!socketRef.current || !isConnected.current) return;

      // Always join user's personal room for DMs
      if (user?.userID) {
         socketRef.current.emit("join", `user:${user.userID}`);
      }

      // Join specific rooms based on active context
      if (activeTab === "groups" && selectedChat?.id) {
         socketRef.current.emit("join", `group:${selectedChat.id}`);
      } else if (activeTab === "messages" && selectedChat?.id) {
         socketRef.current.emit("join", `dm:${selectedChat.id}`);
      } else if (activeTab === "community") {
         socketRef.current.emit("join", "community");
      }
   }, [activeTab, selectedChat?.id, user?.userID]);

   // Send message function
   const sendMessage = useCallback(
      (msg) => {
         const tempId = Date.now();
         const message = {
            ...msg,
            tempId,
            senderId: user?.userID,
            timestamp: new Date().toISOString(),
         };

         // Determine the room to send to
         let room = "community";
         if (msg.type === "direct") {
            room = `dm:${msg.receiverId}`;
         } else if (msg.type === "group") {
            room = `group:${msg.groupId}`;
         }
         message.room = room;

         if (socketRef.current && isConnected.current) {
            socketRef.current.emit("chat:message", message);
         }

         // Save to localforage for offline support
         localforage.getItem("unsentMessages").then((msgs = []) => {
            const existing = Array.isArray(msgs) ? msgs : [];
            localforage.setItem("unsentMessages", [...existing, message]);
         });

         return message;
      },
      [user?.userID],
   );

   return { sendMessage, isConnected: isConnected.current };
}
