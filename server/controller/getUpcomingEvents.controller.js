import client from "../helpers/prismaClient";

export default async function getUpcomingEvents(c) {
   const now = new Date();

   try {
      const upcomingEvents = await client.event.findMany({
         where: { eventStartDate: { gt: now } },
         orderBy: {
            eventStartDate: "asc",
         },
      });
      return (
         upcomingEvents &&
         c.json(
            { message: "Fetch Events Successful", events: upcomingEvents },
            200,
         )
      );
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to get upcoming events from db" }, 500);
   }
}
