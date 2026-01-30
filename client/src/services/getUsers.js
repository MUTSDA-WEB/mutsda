import { useQuery } from "@tanstack/react-query";
import Ax from "../helpers/axios";

export function useGetUsers() {
   return useQuery({
      queryKey: ["GET_USERS"],
      queryFn: async () => {
         const allUsers = await Ax.get("/user/look");
         return allUsers.data;
      },
   });
}
