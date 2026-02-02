import { useMutation, useQuery } from "@tanstack/react-query";
import Ax from "../helpers/axios";

// here I query db to get all messages of each category

function useGetGroupMessages(groupId) {
   return useQuery({
      queryKey: ["GET_GROUP_MESSAGES", groupId],
      queryFn: async () => {
         const groupMessages = await Ax.get(`/message/look/group/${groupId}`);
         return groupMessages.data;
      },
      enabled: !!groupId, // Only fetch when groupId is provided
   });
}

function useGetCommunityMessages(groupId) {
   return useQuery({
      queryKey: ["GET_COMMUNITY_MESSAGES"],
      queryFn: async () => {
         const cMessages = await Ax.get("/message/look/community");
         return cMessages.data;
      },
   });
}

function useGetUserDirectMsg() {
   return useQuery({
      queryKey: ["GET_USER_DMs"],
      queryFn: async () => {
         const DMs = await Ax.get("/message/look/DMs");
         return DMs.data;
      },
   });
}

function useGetVisitorMessages() {
   return useQuery({
      queryKey: ["GET_VISITOR_MESSAGES"],
      queryFn: async () => {
         const visitorMsg = await Ax.get("/message/look/visitor");
         return visitorMsg.data;
      },
   });
}

function useUpdateMessageStatus() {
   return useMutation({
      mutationKey: ["UPDATE_MSG_STATUS"],
      mutationFn: async (data) => {
         const updatedMessage = await Ax.patch(
            `/message/edit/${message}`,
            data,
         );
         return updatedMessage.data;
      },
   });
}

export {
   useGetCommunityMessages,
   useGetGroupMessages,
   useUpdateMessageStatus,
   useGetUserDirectMsg,
   useGetVisitorMessages,
};
