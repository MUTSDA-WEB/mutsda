// Todo: write controllers to get, various message types

import client from "../helpers/prismaClient";

export async function getVisitorMessages(c) {
   try {
      const visitorMsg = await client.conversation.findMany({
         where: { messageType: { equals: "visitor" } },
      });
      return c.json(
         { message: "successfully fetched visitors messages", visitorMsg },
         200,
      );
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to fetch visitor messages" }, 500);
   }
}

export async function getCommunityMessages(c) {
   const { userId } = await c.req.json();
   try {
      const DMs = await client.conversation.findMany({
         where: {
            OR: [{ receiverId: userId }, { userId }],
            messageType: { equals: "direct" },
         },
      });
      return c.json(
         { message: "Successfully fetched community messages", DMs },
         200,
      );
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to fetch community messages" });
   }
}

export async function getGroupMessages(c) {
   const { userId } = await c.req.json();
   try {
      const DMs = await client.conversation.findMany({
         where: {
            messageType: { equals: "group" },
         },
      });
      return c.json({ message: "Successfully group messages", DMs }, 200);
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to fetch group messages" });
   }
}

export async function getDirectMessages(c) {
   const { userId } = await c.req.json();
   try {
      const DMs = await client.conversation.findMany({
         where: {
            OR: [{ receiverId: userId }, { userId }],
            messageType: { equals: "direct" },
         },
      });
      return c.json({ message: "Successfully fetched User DMs", DMs }, 200);
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to fetch User's direct messages" });
   }
}
