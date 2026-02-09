import Redis from "ioredis";
import prisma from "./helpers/prismaClient.js";

const REDIS_URL = process.env.REDIS_URL;

// Configuration
const BATCH_INTERVAL_MS = 10 * 1000; // 10 seconds
const REDIS_POLL_TIMEOUT = 5; // 5 seconds timeout for BRPOP (non-blocking to allow batch saves)

// Message buffer for batch processing
let messageBuffer = [];
let batchTimer = null;

// Map frontend message type to enum
const messageTypeMap = {
   direct: "direct",
   group: "group",
   community: "community",
   visitor: "visitor",
};

/**
 * Transform a raw chat message to Prisma-compatible format
 */
function transformMessage(chatMsg) {
   return {
      messageId: chatMsg?.id,
      messageType: messageTypeMap[chatMsg.type] || "direct",
      content: chatMsg.text || chatMsg.content || "",
      userId: chatMsg.userId || chatMsg.senderId,
      receiverId: chatMsg.receiverId || null,
      groupId: chatMsg.groupId || null,
      msgStatus: "sent",
   };
}

/**
 * Batch save all buffered messages to database
 */
async function flushMessageBuffer() {
   if (messageBuffer.length === 0) {
      return;
   }

   const messagesToSave = [...messageBuffer];

   try {
      const result = await prisma.conversation.createMany({
         data: messagesToSave,
         skipDuplicates: true, // Skip if messageId already exists
      });

      // Only clear buffer on successful save
      messageBuffer = messageBuffer.slice(messagesToSave.length);

      console.log(
         `[Batch Save] ${result.count} messages saved to database at ${new Date().toISOString()}`,
      );
   } catch (err) {
      console.error("[Batch Save] Error saving messages:", err.message);
      // Messages stay in buffer for next attempt
   }
}

/**
 * Start the batch save interval timer
 */
function startBatchSaveTimer() {
   // Clear existing timer to prevent memory leaks
   if (batchTimer) {
      clearInterval(batchTimer);
   }

   console.log(
      `[Worker] Batch save interval set to ${BATCH_INTERVAL_MS / 1000} seconds`,
   );

   batchTimer = setInterval(async () => {
      console.log(
         `[Worker] Running batch save... (${messageBuffer.length} messages in buffer)`,
      );
      await flushMessageBuffer();
   }, BATCH_INTERVAL_MS);
}

/**
 * Main worker function
 */
async function startWorker() {
   try {
      if (!REDIS_URL) {
         console.warn("[Worker] No Redis URL configured, worker disabled");
         return;
      }

      const redis = new Redis(REDIS_URL, {
         maxRetriesPerRequest: 3,
         lazyConnect: true,
         retryStrategy: (times) => {
            if (times > 3) {
               console.warn("[Worker] Max retries reached, stopping");
               return null;
            }
            return Math.min(times * 100, 3000);
         },
      });

      redis.on("connect", () => {
         console.log("[Worker] Connected to Redis");
      });

      redis.on("error", (err) => {
         console.error("[Worker] Redis error:", err.message);
      });

      // Try to connect
      try {
         await redis.connect();
      } catch (err) {
         console.warn("[Worker] Could not connect to Redis, worker disabled");
         return;
      }

      console.log("[Worker] Started, waiting for messages...");

      // Start the batch save timer
      startBatchSaveTimer();

      // Continuously poll messages from Redis list
      while (true) {
         try {
            // BRPOP with timeout to allow periodic batch saves
            // Returns null if timeout expires with no messages
            const result = await redis.brpop(
               "chat:messages",
               REDIS_POLL_TIMEOUT,
            );

            if (result) {
               const [, messageStr] = result;
               const chatMsg = JSON.parse(messageStr);

               console.log(
                  `[Worker] Message received: ${chatMsg.id} (${chatMsg.type}) at ${chatMsg.time}`,
               );

               // Add transformed message to buffer
               const transformedMsg = transformMessage(chatMsg);
               messageBuffer.push(transformedMsg);

               console.log(
                  `[Worker] ✓ Message added to buffer | From: ${chatMsg.userId || chatMsg.senderId} | ID: ${chatMsg.id} | Buffer size: ${messageBuffer.length}`,
               );
            }
         } catch (err) {
            console.error("[Worker] Error processing message:", err.message);
            // Small delay before retrying on error
            await new Promise((resolve) => setTimeout(resolve, 1000));
         }
      }
   } catch (err) {
      console.error("[Worker] Failed to start:", err.message);
      // Retry connection after 5 seconds
      setTimeout(startWorker, 5000);
   }
}

/**
 * Graceful shutdown handler - save remaining messages before exit
 */
async function gracefulShutdown(signal) {
   console.log(`\n[Worker] Received ${signal}. Shutting down gracefully...`);

   // Clear the batch timer
   if (batchTimer) {
      clearInterval(batchTimer);
      console.log("[Worker] Batch timer cleared");
   }

   if (messageBuffer.length > 0) {
      console.log(
         `[Worker] Flushing ${messageBuffer.length} remaining messages...`,
      );
      await flushMessageBuffer();
   }

   await prisma.$disconnect();
   console.log("[Worker] Database disconnected. Goodbye!");
   process.exit(0);
}

// Register shutdown handlers
process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
process.on("SIGINT", () => gracefulShutdown("SIGINT"));

startWorker();
