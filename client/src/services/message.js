import { useMutation, useQuery } from "@tanstack/react-query";
import Ax from "../helpers/axios";

// here I query db to get all messages of each category

// rewrite the code to use a generic getter
function useGetMessage(path, ...getKey) {
   return useQuery({
      queryKey: [...getKey],
      queryFn: async () => {
         const messages = (await Ax.get(path)).data;
         return messages;
      },
   });
}

const useGetGroupMessages = (groupId) =>
   useGetMessage(`/message/look/group/${groupId}`, [
      "GET_GROUP_MESSAGES",
      groupId,
   ]);
const useGetCommunityMessages = () =>
   useGetMessage("/message/look/community", ["GET_COMMUNITY_MESSAGES"]);
const useGetUserDirectMsg = () =>
   useGetMessage("/message/look/DMs", ["GET_USER_DMs"]);
const useGetVisitorMessages = () =>
   useGetMessage("/message/look/visitor", ["GET_VISITOR_MESSAGES"]);

// function useUpdateMessageStatus() {
//    return useMutation({
//       mutationKey: ["UPDATE_MSG_STATUS"],
//       mutationFn: async (data) => {
//          const updatedMessage = await Ax.patch(
//             `/message/edit/${message}`,
//             data,
//          );
//          return updatedMessage.data;
//       },
//    });
// }

function useSaveVisitorMessage() {
   return useMutation({
      mutationKey: ["SAVE_VISITOR_MSG"],
      mutationFn: async (data) => {
         const msg = (await Ax.post("/message/save/visitor", data)).data;
         return msg;
      },
   });
}

function useDeleteMessage() {
   return useMutation({
      mutationKey: ["DELETE_MESSAGE"],
      mutationFn: async (messageId) => {
         const res = (await Ax.delete(`/message/delete/${messageId}`)).data;
         return res;
      },
   });
}

function useDeleteMessageForMe() {
   return useMutation({
      mutationKey: ["DELETE_MESSAGE_FOR_ME"],
      mutationFn: async (messageId) => {
         const res = (await Ax.patch(`/message/delete-for-me/${messageId}`))
            .data;
         return res;
      },
   });
}

export {
   useGetCommunityMessages,
   useGetGroupMessages,
   useGetUserDirectMsg,
   useGetVisitorMessages,
   useSaveVisitorMessage,
   useDeleteMessage,
   useDeleteMessageForMe,
};
