import client from "../helpers/prismaClient";

// get a list of all registered users/members/leaders
export default async function getLeaders(c) {
   try {
      client.user.findMany({
         where: { role: { not: "user" } },
      });
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to fetch List of Leaders" }, 500);
   }
}
