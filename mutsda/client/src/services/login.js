import Ax from "../helpers/axios";
import { useMutation, useQuery } from "@tanstack/react-query";

function useLogin() {
   return useMutation({
      mutationKey: ["USER_LOGIN"],
      mutationFn: async (data) => {
         const response = await Ax.post("/auth/login", data);
         return response.data;
      },
   });
}

export function useCheckLoggedIn() {
   return useQuery({
      queryKey: ["CHECK_LOGIN"],
      queryFn: async () => {
         const loggedIn = await Ax.get("/auth/check/login");
         return loggedIn.data;
      },
   });
}

export default useLogin;
