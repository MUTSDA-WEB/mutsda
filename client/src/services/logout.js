import { useMutation } from "@tanstack/react-query";
import Ax from "../helpers/axios";

export function useLogout() {
   return useMutation({
      mutationFn: async () => {
         const logout = await Ax.post("/auth/logout");
         return logout.data;
      },
      mutationKey: ["USER_LOGOUT"],
   });
}
