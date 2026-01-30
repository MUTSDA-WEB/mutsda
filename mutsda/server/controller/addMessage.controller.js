// TODO: Create controllers for sending/saving messages to the  db

import client from "../helpers/prismaClient";

// ? Add register users messages
export async function saveLeaderMessage(c) {
   const { message, senderId, receiverId, messageType, messageStatus, ...d } =
      await c.req.json();
   try {
      const savedMessage = await client.conversation.create({
         data: {
            content: message,
            messageType,
            msgStatus: messageStatus,
            userId: senderId,
            receiverId,
            groupId: d?.groupId,
         },
      });
      if (savedMessage) {
         return c.text("saved Leader message");
      }
   } catch (error) {
      console.log(error);
      return c.json(
         { error: `Failed to save leaderMessage of type ${messageType} to DB` },
         500,
      );
   }
}

// ? Add normal members message
export async function saveMemberMessage(c) {
   // * all Visitor message will register with the "USER" role
   const userID = "ce15934d-0de4-47a4-a38c-c901c65d7087";

   const { name, phoneNumber, email, message, ...m } = await c.req.json();
   const msg = `name_${name}_phonenumber_${phoneNumber}_email_${email}_topic_${m.topic ? m.topic : ""}_message_${message}`;
   try {
      const savedMessage = await client.conversation.create({
         data: {
            content: msg,
            messageType: "visitor",
            userId: userID,
            msgStatus: "delivered",
            receiverId: c?.receiverId,
         },
      });
      if (savedMessage)
         return c.json({ message: "Member message sent and saved" }, 201);
   } catch (error) {
      console.log(error);
      return c.json(
         { error: `Failed to save MemberMessage of type ${messageType} to DB` },
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
