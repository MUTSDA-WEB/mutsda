# MUTSDA Chat & Notifications System

## Overview

The MUTSDA chat system provides real-time messaging capabilities for the church community. It supports:

- **Direct Messages (DMs)** - Private 1-on-1 conversations
- **Group Chats** - Multi-user group conversations
- **Community Chat** - A shared space for all church leaders
- **Visitor Messages** - Messages from website visitors

## Architecture

```
┌─────────────────┐     WebSocket      ┌──────────────────┐
│                 │◄──────────────────►│                  │
│  React Client   │                    │  Socket.IO       │
│  (useChatSocket)│                    │  Server          │
│                 │                    │  (realtime.js)   │
└─────────────────┘                    └────────┬─────────┘
                                                │
                                                │ LPUSH
                                                ▼
                                       ┌──────────────────┐
                                       │                  │
                                       │     Redis        │
                                       │  (Message Queue) │
                                       │                  │
                                       └────────┬─────────┘
                                                │
                                                │ BRPOP
                                                ▼
                                       ┌──────────────────┐
                                       │                  │
                                       │    Worker.js     │
                                       │  (Persistence)   │
                                       │                  │
                                       └────────┬─────────┘
                                                │
                                                │ Prisma
                                                ▼
                                       ┌──────────────────┐
                                       │                  │
                                       │   PostgreSQL     │
                                       │   Database       │
                                       │                  │
                                       └──────────────────┘
```

## Technology Stack

| Component        | Technology          | Purpose                                        |
| ---------------- | ------------------- | ---------------------------------------------- |
| Real-time Server | Socket.IO           | WebSocket connections & message broadcasting   |
| Message Queue    | Redis               | Temporary message storage for async processing |
| Worker           | Node.js/Bun         | Consumes queue & persists messages to DB       |
| Database         | PostgreSQL + Prisma | Permanent message storage                      |
| Client           | React + Zustand     | UI state management & socket handling          |

---

## Server Components

### 1. realtime.js - Socket.IO Server

The Socket.IO server handles all real-time WebSocket connections and message broadcasting.

**Location:** `server/realtime.js`

**Key Features:**

- Manages WebSocket connections
- Handles room-based messaging (DM, Group, Community)
- Pushes messages to Redis for async persistence
- Tracks online users

**Code Overview:**

```javascript
import { Server } from "socket.io";
import Redis from "ioredis";

const PORT = process.env.SOCKET_PORT || 3001;
const io = new Server(PORT, {
   cors: {
      origin: process.env.CLIENT_URL || "http://localhost:5173",
      methods: ["GET", "POST"],
      credentials: true,
   },
});

// Redis connection for message queuing
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const redis = new Redis(REDIS_URL);

// Track online users
const onlineUsers = new Map();

io.on("connection", (socket) => {
   const userId = socket.handshake.query.userId;

   // Auto-join user's personal room for DMs
   if (userId) {
      onlineUsers.set(userId, socket.id);
      socket.join(`user:${userId}`);
   }

   // Handle room joining
   socket.on("join", (room) => {
      socket.join(room);
   });

   // Handle chat messages
   socket.on("chat:message", async (msg) => {
      // Broadcast to the room
      io.to(msg.room).emit("chat:message", msg);

      // Push to Redis for persistence
      if (redis) {
         await redis.lpush("chat:messages", JSON.stringify(msg));
      }

      // Acknowledge receipt
      socket.emit("chat:ack", { tempId: msg.tempId, status: "sent" });
   });
});
```

**Room Naming Convention:**

- Direct Messages: `dm:{recipientUserId}`
- Groups: `group:{groupId}`
- Community: `community`
- User Personal: `user:{userId}`

---

### 2. worker.js - Message Persistence Worker

The worker runs as a separate process, consuming messages from Redis and saving them to the database.

**Location:** `server/worker.js`

**Why a separate worker?**

- Decouples real-time delivery from database writes
- Improves Socket.IO server performance
- Provides fault tolerance (messages queued if DB is temporarily down)
- Enables horizontal scaling

**Code Overview:**

```javascript
import Redis from "ioredis";
import prisma from "./helpers/prismaClient.js";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

async function startWorker() {
   const redis = new Redis(REDIS_URL);
   console.log("Worker started, waiting for messages...");

   // Continuously process messages
   while (true) {
      // BRPOP blocks until a message is available
      const result = await redis.brpop("chat:messages", 0);

      if (result) {
         const [, messageStr] = result;
         const chatMsg = JSON.parse(messageStr);

         // Save to database
         await prisma.conversation.create({
            data: {
               messageType: chatMsg.type,
               content: chatMsg.text,
               userId: chatMsg.userId || chatMsg.senderId,
               receiverId: chatMsg.receiverId || null,
               groupId: chatMsg.groupId || null,
               msgStatus: "sent",
            },
         });

         console.log(`Message saved: ${chatMsg.type}`);
      }
   }
}

startWorker();
```

**Redis Commands Used:**

- `LPUSH chat:messages <message>` - Add message to queue (realtime.js)
- `BRPOP chat:messages 0` - Block and pop message from queue (worker.js)

---

### 3. Redis - Message Queue

Redis acts as a lightweight message broker between the Socket.IO server and the persistence worker.

**Why Redis over RabbitMQ?**

- Simpler setup and configuration
- Lower memory footprint
- Already commonly used for caching
- Sufficient for moderate message volumes

**Queue Structure:**

```
Key: "chat:messages"
Type: List
Data: JSON stringified message objects
```

**Message Object Structure:**

```json
{
   "id": 1738425600000,
   "tempId": 1738425600000,
   "type": "community",
   "text": "Hello everyone!",
   "sender": "John Doe",
   "senderId": "uuid-123",
   "userId": "uuid-123",
   "room": "community",
   "time": "10:30 AM",
   "timestamp": "2026-02-01T07:30:00.000Z"
}
```

---

## Client Components

### useChatSocket Hook

**Location:** `client/src/hooks/useChatSocket.js`

This custom React hook manages the WebSocket connection and message handling.

**Key Features:**

- Maintains a single persistent socket connection
- Handles room joining based on active tab/chat
- Prevents duplicate messages from optimistic updates
- Supports offline message queuing via localforage

**Code Overview:**

```javascript
import { useEffect, useRef, useCallback } from "react";
import { io } from "socket.io-client";
import localforage from "localforage";
import userStore from "./useStore";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || "http://localhost:3001";

export default function useChatSocket({ activeTab, selectedChat }) {
   const socketRef = useRef(null);
   const user = userStore((state) => state.user);

   useEffect(() => {
      // Connect socket on mount
      socketRef.current = io(SOCKET_URL, {
         query: { userId: user?.userID },
         transports: ["websocket", "polling"],
      });

      // Listen for incoming messages
      socketRef.current.on("chat:message", (msg) => {
         // Skip own messages (already added optimistically)
         if (msg.senderId === user?.userID) return;

         // Update appropriate store based on message type
         const state = userStore.getState();
         if (msg.type === "community") {
            state.setComMsg([...state.communityMessages, msg]);
         }
         // ... handle other types
      });

      return () => socketRef.current?.disconnect();
   }, [user?.userID]);

   // Send message function
   const sendMessage = useCallback(
      (msg) => {
         socketRef.current?.emit("chat:message", {
            ...msg,
            tempId: Date.now(),
            senderId: user?.userID,
         });
      },
      [user?.userID],
   );

   return { sendMessage };
}
```

---

### Notifications.jsx

**Location:** `client/src/pages/admin/Notifications.jsx`

The main chat UI component that:

- Displays different chat tabs (Messages, Groups, Community, Visitors)
- Handles sending messages with optimistic updates
- Manages chat selection and message display

**Message Flow:**

```
User types message
       │
       ▼
handleSendMessage()
       │
       ├──► Optimistic UI Update (instant feedback)
       │
       └──► sendMessage() via socket
                  │
                  ▼
           Socket.IO Server
                  │
                  ├──► Broadcast to room (other users receive it)
                  │
                  └──► Push to Redis queue
                              │
                              ▼
                         Worker.js
                              │
                              ▼
                      Save to PostgreSQL
```

---

## Database Schema

**Conversation Model (Prisma):**

```prisma
model Conversation {
  messageId   String        @id @default(uuid())
  messageType ConvoType     @map("message_type")
  msgStatus   MessageStatus @map("message_status")
  content     String
  userId      String
  createdAt   DateTime      @default(now())
  receiverId  String?
  groupId     String?

  convoUser   User @relation("UserMessages", fields: [userId], references: [userID])
}

enum ConvoType {
  community
  group
  direct
  visitor
}

enum MessageStatus {
  sent
  delivered
  read
}
```

---

## Environment Variables

### Server (.env)

```env
# Server ports
PORT=3000
SOCKET_PORT=3001

# Client URL for CORS
CLIENT_URL=http://localhost:5173

# Database
DATABASE_URL=postgresql://user:password@localhost:5432/mutsda

# Redis
REDIS_URL=redis://localhost:6379
```

### Client (.env)

```env
VITE_API_URL=http://localhost:3000
VITE_SOCKET_URL=http://localhost:3001
```

---

## Running the System

### Prerequisites

1. **PostgreSQL** - Running and configured
2. **Redis** - Running on default port 6379
3. **Bun** - JavaScript runtime (or Node.js)

### Commands

**Terminal 1 - Main API Server:**

```bash
cd server
bun run index.js
# or: bun --watch index.js (for development)
```

**Terminal 2 - Socket.IO Server:**

```bash
cd server
bun run realtime.js
```

**Terminal 3 - Message Worker (for persistence):**

```bash
cd server
bun run worker.js
```

**Terminal 4 - Client Development Server:**

```bash
cd client
bun run dev
# or: npm run dev
```

### Quick Start Script

You can create a `start-chat.sh` (Linux/Mac) or `start-chat.ps1` (Windows) script:

**Windows PowerShell (start-chat.ps1):**

```powershell
# Start all services in separate windows
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; bun run index.js"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; bun run realtime.js"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; bun run worker.js"
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd client; bun run dev"
```

---

## Testing the Chat

1. **Open the app** in two different browsers (or incognito windows)
2. **Log in** with two different user accounts
3. **Navigate to Notifications** (Dashboard → Notifications)
4. **Select Community tab** and send a message
5. **Verify** the message appears in both browsers instantly

### Verifying Redis Queue

```bash
# Connect to Redis CLI
redis-cli

# Check queue length
LLEN chat:messages

# View messages in queue (without removing)
LRANGE chat:messages 0 -1
```

### Verifying Database Persistence

```sql
-- Check messages in database
SELECT * FROM conversation_table ORDER BY created_at DESC LIMIT 10;
```

---

## Troubleshooting

### Socket Connection Issues

**Symptom:** Messages not sending/receiving

**Check:**

1. Is realtime.js running? (`bun run realtime.js`)
2. Is the SOCKET_URL correct in client `.env`?
3. Check browser console for WebSocket errors
4. Verify CORS settings in realtime.js

### Messages Not Persisting

**Symptom:** Messages send in real-time but don't appear after refresh

**Check:**

1. Is Redis running? (`redis-cli ping` should return `PONG`)
2. Is worker.js running? (`bun run worker.js`)
3. Check worker console for errors
4. Verify DATABASE_URL is correct

### Duplicate Messages

**Symptom:** Same message appears twice

**Check:**

1. Verify `senderId` is being set correctly
2. Check if optimistic update is happening
3. Socket listener should skip messages where `senderId === user.userID`

---

## Future Improvements

- [ ] **Read receipts** - Track when messages are read
- [ ] **Typing indicators** - Show when someone is typing
- [ ] **File attachments** - Support image/file uploads
- [ ] **Message reactions** - Emoji reactions to messages
- [ ] **Push notifications** - Browser/mobile notifications
- [ ] **Message search** - Full-text search across conversations
- [ ] **Message encryption** - End-to-end encryption for DMs
