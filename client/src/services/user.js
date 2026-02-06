import { useMutation, useQuery } from "@tanstack/react-query";
import Ax from "../helpers/axios";

function useMutatePatch(mutKey, path) {
   return useMutation({
      mutationFn: async (data) => {
         const mutData = await Ax.patch(path, data);
         return mutData.data;
      },
      mutationKey: [mutKey],
   });
}

export function useGetUsers() {
   return useQuery({
      queryKey: ["GET_USERS"],
      queryFn: async () => {
         const allUsers = await Ax.get("/user/look");
         return allUsers.data;
      },
   });
}

export function useGetMembers() {
   return useQuery({
      queryKey: ["GET_MEMBERS"],
      queryFn: async () => {
         const allUsers = await Ax.get("/user/look/common");
         return allUsers.data;
      },
   });
}

export const useUpdateProfile = () =>
   useMutatePatch("UPDATE_USER_PROFILE", "/auth/update/profile");
export const useUpdatePassword = () =>
   useMutatePatch("UPDATE_USER_PASSWORD", "/auth/update/password");
