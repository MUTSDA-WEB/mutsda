import { useMutation, useQuery } from "@tanstack/react-query";
import Ax from "../helpers/axios";

export function useGetUserGroups() {
   return useQuery({
      queryKey: ["GET_USER_GROUPS"],
      queryFn: async () => {
         const userGroups = await Ax.get("/group/look");
         return userGroups.data;
      },
   });
}

export function useCreateGroup() {
   return useMutation({
      mutationKey: ["CREATE_GROUP"],
      mutationFn: async (data) => {
         const newGroup = await Ax.post("/group/create", data);
         return newGroup.data;
      },
   });
}

export function useGetGroupMembers(groupId) {
   return useQuery({
      queryKey: ["GET_GROUP_MEMBERS", groupId],
      queryFn: async () => {
         const res = await Ax.get(`/group/${groupId}/members`);
         return res.data;
      },
      enabled: !!groupId,
   });
}

export function useAddGroupMember() {
   return useMutation({
      mutationKey: ["ADD_GROUP_MEMBER"],
      mutationFn: async ({ groupId, userId }) => {
         const res = await Ax.post(`/group/${groupId}/members`, { userId });
         return res.data;
      },
   });
}

export function useRemoveGroupMember() {
   return useMutation({
      mutationKey: ["REMOVE_GROUP_MEMBER"],
      mutationFn: async ({ groupId, memberId }) => {
         const res = await Ax.delete(`/group/${groupId}/members/${memberId}`);
         return res.data;
      },
   });
}

export function useUpdateMemberRole() {
   return useMutation({
      mutationKey: ["UPDATE_MEMBER_ROLE"],
      mutationFn: async ({ groupId, memberId, role }) => {
         const res = await Ax.patch(`/group/${groupId}/members/${memberId}`, {
            role,
         });
         return res.data;
      },
   });
}

export function useUpdateGroup() {
   return useMutation({
      mutationKey: ["UPDATE_GROUP"],
      mutationFn: async ({ groupId, data }) => {
         const res = await Ax.patch(`/group/${groupId}`, data);
         return res.data;
      },
   });
}

export function useDeleteGroup() {
   return useMutation({
      mutationKey: ["DELETE_GROUP"],
      mutationFn: async (groupId) => {
         const res = await Ax.delete(`/group/${groupId}`);
         return res.data;
      },
   });
}
