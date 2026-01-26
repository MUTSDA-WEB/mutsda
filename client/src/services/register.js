import { useMutation, useQuery } from "@tanstack/react-query";
import Ax from "../helpers/axios";

function useRegister() {
   return useMutation({
      mutationKey: ["REGISTER_USER"],
      mutationFn: async (data) => {
         const response = await Ax.post("/auth/register", data);
         return response.data;
      },
   });
}

function useRoles() {
   return useQuery({
      queryKey: ["GET_ROLES"],
      queryFn: async () => {
         const response = await Ax.get("/auth/roles");
         return response.data;
      },
   });
}

export { useRegister, useRoles };
