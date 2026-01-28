import client from "../helpers/prismaClient";

export default async function (c) {
   const {
      title,
      description,
      imageURL,
      eventStartDate,
      category,
      startTime,
      endTime,
      ...other
   } = await c.req.json();

   const { userID } = c.get("jwtPayload");

   // saving data to db
   try {
      const newEvent = await client.event.create({
         data: {
            title,
            description,
            imageURL,
            startTime,
            eventStartDate,
            category,
            eventEndDate: other.eventEndDate,
            userId: userID,
            eventEndTime: other?.eventEndTime,
            eventLocation: other?.eventLocation,
         },
      });

      if (newEvent) {
         return c.json(
            { message: "Event created Successfully", event: newEvent },
            201,
         );
      }
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to Create new event!!" }, 500);
   }
}
