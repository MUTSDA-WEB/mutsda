import { useQuery } from "@tanstack/react-query";
import Ax from "../helpers/axios";

function useRegister(data) {
   return useQuery({
      queryKey: ["REGISTER_USER"],
      queryFn: async () => {
         newUser = await Ax.post("/auth/register", data);
         return newUser;
      },
   });
}

export default useRegister;
