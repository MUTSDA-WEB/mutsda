// // Todo: write controllers to get, various message types

import client from "../helpers/prismaClient";

export async function getVisitorMessages(c) {
   const { userID: userId } = c.get("jwtPayload");
   try {
      const visitorMsg = await client.conversation.findMany({
         where: {
            messageType: { equals: "visitor" },
            OR: [{ receiverId: userId }, { receiverId: null }],
         },
         orderBy: { createdAt: "desc" },
         omit: { groupId: true, msgStatus: true, userId: true },
         take: 20,
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
   try {
      const DMs = await client.conversation.findMany({
         where: {
            messageType: { equals: "community" },
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
   const groupId = c.req.param("id");
   console.log(groupId);
   try {
      const groupMessages = await client.conversation.findMany({
         where: {
            groupId,
            messageType: { equals: "group" },
         },
         include: {
            user: {
               select: { userName: true },
            },
         },
         orderBy: { createdAt: "asc" },
      });
      return c.json(
         {
            message: "Successfully fetched group messages",
            messages: groupMessages,
         },
         200,
      );
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to fetch group messages" });
   }
}

export async function getDirectMessages(c) {
   const { userID } = c.get("jwtPayload");
   try {
      const DMs = await client.conversation.findMany({
         where: {
            messageType: { equals: "direct" },
            OR: [{ receiverId: userID }, { userId: userID }],
         },
      });
      return c.json({ message: "Successfully fetched User DMs", DMs }, 200);
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to fetch User's direct messages" });
   }
}
