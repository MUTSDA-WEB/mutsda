import { getUserDetails } from "../helpers/getUserInfo";

export default async (c, next) => {
   const { username } = c.req.json();
   const userDetails = await getUserDetails(username.toLowerCase());
   if (!userDetails) {
      return c.json(
         {
            error: "Invalid login credentials",
         },
         400,
      );
   }
   c.set("userInfo", userDetails);
   await next();
};
