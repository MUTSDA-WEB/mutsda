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
   const { userID } = c.get("jwtPayload");
   try {
      const com = await client.conversation.findMany({
         where: {
            messageType: { equals: "community" },
            NOT: { deletedFor: { has: userID } },
         },
         include: {
            convoUser: { select: { userName: true } },
            replyTo: {
               select: {
                  messageId: true,
                  content: true,
                  convoUser: { select: { userName: true } },
               },
            },
         },
         orderBy: { createdAt: "asc" },
      });
      return c.json(
         { message: "Successfully fetched community messages", com },
         200,
      );
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to fetch community messages" });
   }
}

export async function getGroupMessages(c) {
   const groupId = c.req.param("id");
   const { userID } = c.get("jwtPayload");
   console.log(groupId);
   try {
      const groupMessages = await client.conversation.findMany({
         where: {
            groupId,
            messageType: { equals: "group" },
            NOT: { deletedFor: { has: userID } },
         },
         include: {
            convoUser: {
               select: { userName: true },
            },
            replyTo: {
               select: {
                  messageId: true,
                  content: true,
                  convoUser: { select: { userName: true } },
               },
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

export async function deleteMessage(c) {
   const messageId = c.req.param("id");
   const { userID } = c.get("jwtPayload");

   try {
      // Verify the user owns this message
      const message = await client.conversation.findUnique({
         where: { messageId },
      });

      if (!message) {
         return c.json({ error: "Message not found" }, 404);
      }

      if (message.userId !== userID && message.messageType !== "visitor") {
         return c.json({ error: "You can only delete your own messages" }, 403);
      }

      await client.conversation.delete({
         where: { messageId },
      });
      return c.json({ message: "Message deleted for everyone" }, 200);
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to delete message" }, 500);
   }
}

// Delete message for current user only (soft delete)
export async function deleteMessageForMe(c) {
   const messageId = c.req.param("id");
   const { userID } = c.get("jwtPayload");

   try {
      await client.conversation.update({
         where: { messageId },
         data: {
            deletedFor: { push: userID },
         },
      });
      return c.json({ message: "Message deleted for you" }, 200);
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to delete message" }, 500);
   }
}
