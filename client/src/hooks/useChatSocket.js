import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import localforage from "localforage";
import userStore from "./useStore";

const SOCKET_URL = "http://localhost:3001"; // adjust if needed

export default function useChatSocket({ activeTab, selectedChat }) {
   const socketRef = useRef();
   const {
      setDMs,
      setGroups,
      setComMsg,
      setGroupMessages,
      setVisitorMsg,
      user,
      directMessages,
      groups,
      communityMessages,
      groupMessages,
      visitorMessages,
   } = userStore();

   // Connect and join rooms
   useEffect(() => {
      socketRef.current = io(SOCKET_URL, {
         query: { userId: user?.userID },
         transports: ["websocket"],
      });

      // Join rooms based on activeTab/selectedChat
      if (activeTab === "groups" && selectedChat) {
         socketRef.current.emit("join", selectedChat.id);
      } else if (activeTab === "messages" && selectedChat) {
         socketRef.current.emit("join", user?.userID);
         socketRef.current.emit("join", selectedChat.id);
      } else if (activeTab === "community") {
         socketRef.current.emit("join", "community");
      }

      // On reconnect, resend unsent messages
      localforage.getItem("unsentMessages").then((msgs) => {
         if (Array.isArray(msgs)) {
            msgs.forEach((msg) => socketRef.current.emit("chat:message", msg));
            localforage.removeItem("unsentMessages");
         }
      });

      // Listen for incoming messages
      socketRef.current.on("chat:message", (msg) => {
         // Update the correct store based on message type
         if (msg.type === "direct") {
            setDMs([...directMessages, msg]);
         } else if (msg.type === "group") {
            setGroups([...groups, msg]);
         } else if (msg.type === "community") {
            setComMsg([...communityMessages, msg]);
         } else if (msg.type === "visitor") {
            setVisitorMsg([...visitorMessages, msg]);
         }
      });

      // Listen for ack to remove from localforage
      socketRef.current.on("chat:ack", ({ tempId }) => {
         localforage.getItem("unsentMessages").then((msgs = []) => {
            const filtered = msgs.filter((m) => m.tempId !== tempId);
            localforage.setItem("unsentMessages", filtered);
         });
      });

      return () => {
         socketRef.current.disconnect();
      };
      // eslint-disable-next-line
   }, [activeTab, selectedChat, user]);

   // Send message
   const sendMessage = (msg) => {
      const tempId = Date.now();
      const message = { ...msg, tempId };
      socketRef.current.emit("chat:message", message);
      // Save to localforage in case offline
      localforage.getItem("unsentMessages").then((msgs = []) => {
         localforage.setItem("unsentMessages", [...msgs, message]);
      });
   };

   return { sendMessage };
}
