import { useQuery } from "@tanstack/react-query";
import Ax from "../helpers/axios";

function useProfileSettings() {
   return useQuery({
      queryKey: ["GET_USERS"],
      queryFn: async () => {
         const response = await Ax.get("/users/look");
         return response.data;
      },
   });
}

export default useProfileSettings;
