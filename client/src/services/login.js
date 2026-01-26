import Ax from "../helpers/axios";
import { useMutation } from "@tanstack/react-query";

function useLogin() {
   return useMutation({
      mutationKey: ["USER_LOGIN"],
      mutationFn: async (data) => {
         const response = await Ax.post("/auth/login", data);
         return response.data;
      },
   });
}

export default useLogin;
