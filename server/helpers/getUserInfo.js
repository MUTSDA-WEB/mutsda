import client from "./prismaClient";

export async function getUserDetails(username) {
   try {
      const user = await client.user.findUnique({
         where: {
            userName: username,
         },
      });
      return user;
   } catch (error) {
      console.log(error);
      return;
   }
}
