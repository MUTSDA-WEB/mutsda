// TODO: Create controllers for sending/saving messages to the  db

import client from "../helpers/prismaClient";

// ? Add register users messages
export async function saveLeaderMessage(c) {
   const {
      message,
      senderId,
      receiverId,
      messageType,
      messageStatus,
      replyToId,
      ...d
   } = await c.req.json();
   try {
      const savedMessage = await client.conversation.create({
         data: {
            content: message,
            messageType,
            msgStatus: messageStatus,
            userId: senderId,
            receiverId,
            groupId: d?.groupId,
            replyToId: replyToId || null,
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
      });
      if (savedMessage) {
         return c.json({ message: "Message saved", savedMessage }, 201);
      }
   } catch (error) {
      console.log(error);
      return c.json(
         { error: `Failed to save leaderMessage of type ${messageType} to DB` },
         500,
      );
   }
}

// ? Add normal members/visitor message
export async function saveVisitorMessage(c) {

   const { name, phoneNumber, email, message, ...m } = await c.req.json();
   const msg = `name_${name} phonenumber_${phoneNumber} email_${email} topic_${m.topic ? m.topic : "Visitor Message"} message_${message}`;
   try {
      // * all Visitor message will register with the "USER" role
      const user = await client.user.findUnique({
         where : { role: "user"}, 
         select : {userID: true}
      })
      const savedMessage = await client.conversation.create({
         data: {
            content: msg,
            messageType: "visitor",
            userId: user.userID,
            msgStatus: "delivered",
            receiverId: m?.receiverId,
         },
      });
      if (savedMessage)
         return c.json({ message: "Member message sent and saved" }, 201);
   } catch (error) {
      console.log(error);
      return c.json(
         { error: `Failed to save MemberMessage of type 'visitor' to DB` },
         500,
      );
   }
}

export async function updateMessageStatus(c) {
   const { status } = await c.req.json();
   const { messageId } = c.req.param("id");
   try {
      await client.conversation.update({
         data: { msgStatus: status },
         where: { messageId },
      });
      return c.json(
         { message: `Status updated for message ${messageId}` },
         201,
      );
   } catch (error) {
      console.log(error);
      return c.json({ error: "Failed to update Message status" }, 500);
   }
}
