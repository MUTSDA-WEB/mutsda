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
export async function getUserByID(id) {
   try {
      const user = await client.user.findUnique({
         where: {
            userID: id,
         },
      });
      return user;
   } catch (error) {
      console.log(error);
      return;
   }
}
