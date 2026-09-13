import { Server } from "socket.io";
import Redis from "ioredis";

const PORT = process.env.SOCKET_PORT;
const io = new Server(PORT, {
   cors: {
      origin: process.env.CLIENT_URL.split(","),
      methods: ["GET", "POST"],
      credentials: true,
   },
});

// Redis setup for message queuing
const REDIS_URL = process.env.REDIS_URL.split(",");
let redis = null;

try {
   if (REDIS_URL) {
      redis = new Redis(REDIS_URL, {
         maxRetriesPerRequest: 3,
         lazyConnect: true,
         retryStrategy: (times) => {
            if (times > 3) {
               console.warn("[Realtime] Redis max retries reached, disabling");
               return null;
            }
            return Math.min(times * 100, 3000);
         },
      });
      redis.on("connect", () => console.log("[Realtime] Redis connected"));
      redis.on("error", (err) => {
         console.warn("[Realtime] Redis error:", err.message);
      });
      // Attempt connection
      redis.connect().catch((err) => {
         console.error("[Realtime] Redis connection failed:", err.message);
         redis = null;
      });
   } else {
      console.warn("[Realtime] No REDIS_URL - messages will NOT be persisted");
   }
} catch (err) {
   console.warn(
      "[Realtime] Redis not available, messages will not be persisted:",
      err.message,
   );
}

// Track online users
const onlineUsers = new Map();

io.on("connection", (socket) => {
   const userId = socket.handshake.query.userId;
   console.log(`User connected: ${userId}, Socket: ${socket.id}`);

   // Track user
   if (userId) {
      onlineUsers.set(userId, socket.id);
      // Auto-join user's personal room
      socket.join(`user:${userId}`);
   }

   // Handle room joining
   socket.on("join", (room) => {
      socket.join(room);
      console.log(`Socket ${socket.id} joined room: ${room}`);
   });

   // Handle room leaving
   socket.on("leave", (room) => {
      socket.leave(room);
      console.log(`Socket ${socket.id} left room: ${room}`);
   });

   // Handle chat messages
   socket.on("chat:message", async (msg) => {
      try {
         console.log("Message received:", msg.type, msg.room);

         // Broadcast to the appropriate room
         if (msg.room) {
            io.to(msg.room).emit("chat:message", msg);
         }

         // For direct messages, also send to sender's room (so sender sees it in other tabs/devices)
         if (
            msg.type === "direct" &&
            msg.senderId &&
            msg.room !== `user:${msg.senderId}`
         ) {
            io.to(`user:${msg.senderId}`).emit("chat:message", msg);
         }

         // Push message to Redis list for persistence (worker will process it)
         if (redis) {
            try {
               await redis.lpush("chat:messages", JSON.stringify(msg));
               console.log(
                  `[Redis] Message queued for persistence: ${msg.id || msg.tempId}`,
               );
            } catch (pushErr) {
               console.error(
                  "[Redis] Failed to queue message:",
                  pushErr.message,
               );
            }
         } else {
            console.warn(
               "[Redis] Not connected - message will NOT be persisted:",
               msg.id || msg.tempId,
            );
         }

         // Send ack to sender
         socket.emit("chat:ack", { tempId: msg.tempId, status: "sent" });
      } catch (err) {
         console.error("Error handling message:", err);
         socket.emit("chat:error", { tempId: msg.tempId, error: err.message });
      }
   });

   // Handle typing indicators
   socket.on("typing:start", ({ room, user }) => {
      socket.to(room).emit("typing:start", { user });
   });

   socket.on("typing:stop", ({ room, user }) => {
      socket.to(room).emit("typing:stop", { user });
   });

   // Handle disconnect
   socket.on("disconnect", () => {
      if (userId) {
         onlineUsers.delete(userId);
      }
      console.log(`User disconnected: ${userId}`);
   });
});

console.log(`Socket.IO server running on port ${PORT}`);
