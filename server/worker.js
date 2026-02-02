import Redis from "ioredis";
import prisma from "./helpers/prismaClient.js";

const REDIS_URL = process.env.REDIS_URL;

async function startWorker() {
   try {
      const redis = new Redis(REDIS_URL);

      redis.on("connect", () => {
         console.log("Worker connected to Redis");
      });

      redis.on("error", (err) => {
         console.error("Redis error:", err.message);
      });

      console.log("Worker started, waiting for messages...");

      // Continuously process messages from Redis list
      while (true) {
         try {
            // BRPOP blocks until a message is available (timeout 0 = wait forever)
            const result = await redis.brpop("chat:messages", 0);

            if (result) {
               const [, messageStr] = result;
               const chatMsg = JSON.parse(messageStr);
               console.log(chatMsg);

               // Map frontend message type to enum
               const messageTypeMap = {
                  direct: "direct",
                  group: "group",
                  community: "community",
                  visitor: "visitor",
               };

               await prisma.conversation.create({
                  data: {
                     messageType: messageTypeMap[chatMsg.type] || "direct",
                     content: chatMsg.text || chatMsg.content || "",
                     userId: chatMsg.userId || chatMsg.senderId,
                     receiverId: chatMsg.receiverId || null,
                     groupId: chatMsg.groupId || null,
                     msgStatus: "sent",
                  },
               });

               console.log(
                  `Message saved: ${chatMsg.type} from ${chatMsg.userId || chatMsg.senderId}`,
               );
            }
         } catch (err) {
            console.error("Error processing message:", err.message);
            // Small delay before retrying on error
            await new Promise((resolve) => setTimeout(resolve, 1000));
         }
      }
   } catch (err) {
      console.error("Worker failed to start:", err.message);
      // Retry connection after 5 seconds
      setTimeout(startWorker, 5000);
   }
}

startWorker();
