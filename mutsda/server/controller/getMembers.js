import client from "../helpers/prismaClient";

// get a list of all registered users/members/leaders
export default async function getLeaders(c) {
   try {
      const leaders = await client.user.findMany({
         where: { role: { not: "user" } },
         omit: { password: true, email: true },
      });
      return c.json({ message: "Fetch leaders successful", leaders }, 200);
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to fetch List of Leaders" }, 500);
   }
}
