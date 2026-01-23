import client from "../helpers/prismaClient";

const now = new Date();
export async function getUpcomingEvents(c) {
   try {
      const upcomingEvents = await client.event.findMany({
         where: { eventStartDate: { gt: now } },
         orderBy: {
            eventStartDate: "asc",
         },
         omit: { updatedAt },
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

export async function getPastEvents(c) {
   try {
      const pastEvents = await client.event.findMany({
         where: { eventStartDate: { lte: now } },
         omit: updatedAt,
      });
      return (
         pastEvents &&
         c.json(
            { message: "Past events fetch successful", events: pastEvents },
            200,
         )
      );
   } catch (error) {
      console.log(error);
      return c.json(
         { error: "Server error: failed to fetch past events!" },
         500,
      );
   }
}

export async function getAllEvents(c) {
   try {
      const allEvents = await client.event.findMany({
         omit: { updatedAt },
      });
   } catch (error) {
      console.log(error);
      return c.json(
         { error: "Server error: failed to fetch All events!" },
         500,
      );
   }
}
