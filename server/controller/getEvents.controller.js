import client from "../helpers/prismaClient";

const now = new Date();
export async function getUpcomingEvents(c) {
   try {
      const upcomingEvents = await client.event.findMany({
         where: { eventStartDate: { gt: now } },
         orderBy: {
            eventStartDate: "asc",
         },
         include: { user: true },
         omit: { updatedAt: true },
      });
      return (
         upcomingEvents &&
         c.json(
            {
               message: "Upcoming Events Fetch Successful",
               events: upcomingEvents,
            },
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
         omit: { updatedAt: true },
      });
      return (
         pastEvents &&
         c.json(
            { message: "Past events fetched successfully", events: pastEvents },
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
         where: { NOT: { category: { equals: "Announcement" } } },
         omit: { updatedAt: true },
      });
      return (
         allEvents &&
         c.json(
            { message: "All events fetched successfully", events: allEvents },
            200,
         )
      );
   } catch (error) {
      console.log(error);
      return c.json(
         { error: "Server error: failed to fetch All events!" },
         500,
      );
   }
}

export async function getAnnouncements(c) {
   try {
      const oneWeekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
      const announcements = await client.event.findMany({
         where: {
            AND: [
               { category: "Announcement" },
               { createdAt: { gte: oneWeekAgo } },
            ],
         },
         orderBy: { createdAt: "desc" },
      });
      return c.json(
         { message: "Announcements fetched successfully", announcements },
         200,
      );
   } catch (error) {
      console.log(error);
      return c.json({ error: "failed to fetch announcements" }, 500);
   }
}
