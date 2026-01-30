import { Server } from "socket.io";
import amqp from "amqplib";

const io = new Server(3001, { cors: { origin: "*" } }); // Socket.IO server on port 3001

// RabbitMQ setup
const RABBIT_URL = process.env.RABBIT_URL || "amqp://localhost";
let channel;
(async () => {
   const conn = await amqp.connect(RABBIT_URL);
   channel = await conn.createChannel();
   await channel.assertQueue("chat-messages");
})();

io.on("connection", (socket) => {
   // TODO: Authenticate user here if needed

   socket.on("join", (room) => {
      socket.join(room);
   });

   socket.on("chat:message", async (msg) => {
      // Broadcast to room
      io.to(msg.room).emit("chat:message", msg);

      // Enqueue message for persistence
      if (channel) {
         channel.sendToQueue("chat-messages", Buffer.from(JSON.stringify(msg)));
      }
      // Optionally, send ack to sender
      socket.emit("chat:ack", { tempId: msg.tempId });
   });
});

console.log("Socket.IO server running on port 3001");
