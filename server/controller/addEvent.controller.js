import App from "..";
import client from "../helpers/prismaClient";

export default async function (c) {
   const eventInfo = c.req.json();
   const { title, description, imageURL, eventStartDate, eventEndDate } =
      eventInfo;

   // saving data to db
   try {
      const newEvent = await client.event.create({
         data: {
            title,
            description,
            imageURL,
            eventEndDate,
            eventStartDate,
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
