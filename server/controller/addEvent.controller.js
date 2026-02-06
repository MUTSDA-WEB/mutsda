import client from "../helpers/prismaClient";

export default async function (c) {
   try {
      const {
         title,
         description,
         startDateTime,
         endDateTime,
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
            imageURL: imageURL || "eventPlaceholder.png", // store the URL only (optional)
            startDateTime: new Date(startDateTime),
            endDateTime: endDateTime ? new Date(endDateTime) : null,
            category: category,
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
