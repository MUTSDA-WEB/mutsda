import { useMutation, useQuery } from "@tanstack/react-query";
import Ax from "../helpers/axios";

function useCreateEvent() {
   return useMutation({
      mutationKey: ["CREATE_EVENT"],
      mutationFn: async (data) => {
         const response = await Ax.post("/event/create", data);
         return response.data;
      },
   });
}

function useGetEvents() {
   return useQuery({
      queryKey: ["GET_EVENTS"],
      queryFn: async () => {
         const response = await Ax.get("/event/all");
         return response.data;
      },
   });
}

export { useCreateEvent, useGetEvents };
