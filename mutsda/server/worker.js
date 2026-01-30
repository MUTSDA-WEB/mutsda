import amqp from "amqplib";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const RABBIT_URL = process.env.RABBIT_URL || "amqp://localhost";

(async () => {
   const conn = await amqp.connect(RABBIT_URL);
   const channel = await conn.createChannel();
   await channel.assertQueue("chat-messages");

   channel.consume("chat-messages", async (msg) => {
      if (msg !== null) {
         const chatMsg = JSON.parse(msg.content.toString());
         try {
            await prisma.conversation.create({
               data: {
                  messageType: chatMsg.type,
                  content: chatMsg.content,
                  userId: chatMsg.userId,
                  receiverId: chatMsg.receiverId,
                  groupId: chatMsg.groupId,
                  msgStatus: "sent",
               },
            });
            channel.ack(msg);
         } catch (err) {
            console.error("DB save failed", err);
            // Optionally: channel.nack(msg, false, true); // requeue
         }
      }
   });
})();
