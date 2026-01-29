import { useQuery } from "@tanstack/react-query";
import Ax from "../helpers/axios";

export function useGetUserGroups() {
   return useQuery({
      queryKey: ["GET_USER_GROUPS"],
      queryFn: async () => {
         const userGroups = await Ax.get("/group/user");
         return userGroups.data;
      },
   });
}
