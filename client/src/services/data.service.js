import { useMutation, useQuery } from "@tanstack/react-query";
import Ax from "../helpers/axios";

const useUpdateSiteData = () => {
   return useMutation({
      mutationKey: ["UPDATE_SITE_DATA"],
      mutationFn: async (field, data) => {
         const update = (await Ax.patch(`/data/upsert/${field}`, data)).data;
         return update;
      },
   });
};

const useGetSiteData = () => {
   return useQuery({
      queryKey: ["GET_SITE_DATA"],
      queryFn: async () => {
         const siteData = (await Ax.get("/data/look")).data;
         return siteData;
      },
   });
};

export { useGetSiteData, useUpdateSiteData };
