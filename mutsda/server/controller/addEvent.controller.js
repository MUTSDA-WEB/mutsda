import client from "../helpers/prismaClient";

export default async function (c) {
   try {
      const {
         title,
         description,
         eventStartTime,
         eventEndTime,
         eventStartDate,
         eventEndDate,
         category,
         eventLocation,
         imageURL,
         // maxAttendees,
      } = await c.req.json();

      const { userID } = c.get("jwtPayload");

      // Save event to database with imageURL
      const newEvent = await client.event.create({
         data: {
            title,
            description,
            imageURL, // store the URL only
            eventStartTime,
            eventEndTime,
            eventStartDate,
            eventEndDate,
            category,
            eventLocation,
            // maxAttendees: maxAttendees ? parseInt(maxAttendees) : null,
            userId: userID,
         },
      });

      if (newEvent) {
         return c.json(
            { message: "Event created successfully", event: newEvent },
            201,
         );
      }
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to create new event" }, 500);
   }
}
