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

// generic getter
function useGet(getKey, path) {
   return useQuery({
      queryKey: [getKey],
      queryFn: async () => {
         const data = (await Ax.get(path)).data;
         return data;
      },
   });
}

const useGetEvents = () => useGet("GET_EVENTS", "/event/all");
const useGetUpcomingEvents = () => useGet("UPCOMING_EVENTS", "/event/upcoming");
const useGetAnnouncements = () =>
   useGet("GET_ANNOUNCEMENTS", "/event/announcement");

export {
   useCreateEvent,
   useGetEvents,
   useGetUpcomingEvents,
   useGetAnnouncements,
};
