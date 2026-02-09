# MUTSDA WEB

### TECH STACK

#### Backend

    BUN +  Hono

#### Frontend

    - React
    - FontAwesome Icons
    - Vite
    - Tailwind css

#### Database

    - Prisma ORM
    - Postgres DB

#### Real-time Chat

    - Socket.IO (WebSocket server)
    - Redis (Message queue)
    - Zustand (Client state management)

## REAL-TIME CHAT SYSTEM

The application includes a real-time chat system supporting:

- **Direct Messages (DMs)** - Private 1-on-1 conversations
- **Group Chats** - Multi-user group conversations
- **Community Chat** - Shared space for church leaders
- **Visitor Messages** - Messages from website visitors

### Architecture

```
React Client ◄──► Socket.IO Server ──► Redis Queue ──► Worker (Batch) ──► PostgreSQL
```

### Message Batching

Messages are buffered and saved to the database in batches every **2 minutes** using `createMany` for improved performance. This reduces database load while maintaining instant message delivery via Socket.IO.

### Running the Chat System

You need to run **3 separate processes**:

1. **Main API Server** (Hono)

```bash
cd server && bun run index.js
```

2. **Socket.IO Server** (Real-time)

```bash
cd server && bun run realtime.js
```

3. **Message Worker** (Persistence)

```bash
cd server && bun run worker.js
```

### Prerequisites

- **Redis** must be running locally or provide `REDIS_URL` environment variable
- Add these to your `.env`:

```env
REDIS_URL=redis://localhost:6379
SOCKET_PORT=3001
CLIENT_URL=http://localhost:5173
```

> 📖 For detailed documentation, see [chat.md](./chat.md)

---

## RATE LIMITING

The API includes Redis-based rate limiting to prevent abuse and protect against DDoS attacks.

### Rate Limit Configurations

| Route Type     | Limit             | Window     | Purpose                  |
| -------------- | ----------------- | ---------- | ------------------------ |
| Auth routes    | 10 requests       | 15 minutes | Prevent brute force      |
| Message routes | 60 requests       | 1 minute   | Prevent spam             |
| File uploads   | 10 requests       | 1 minute   | Prevent storage abuse    |
| API (default)  | 100 requests      | 1 minute   | General protection       |

### Response Headers

All responses include rate limit headers:
- `X-RateLimit-Limit` - Maximum requests allowed
- `X-RateLimit-Remaining` - Requests remaining in window
- `X-RateLimit-Reset` - Timestamp when limit resets

When rate limited, returns HTTP 429 with `Retry-After` header.

---

## DATABASE SETUP

- install prisma

```bash
bun add prisma --save-dev
```

- setup prisma client

```bash
bun add @prisma/client @prisma/adapter-pg pg
```

- initialize prisma

```bash
bunx prisma init --datasource-provider postgresql --output ./src/generated/prisma
```

- Add your database connection string
- then to run postgres locally run:

```bash
bunx prisma migrate dev
```

to generate client run:

```bash
bun prisma generate
```

## Code Formatting and Linting

- **Prettier code formatter** - used prettier for code formatting
- **Husky** - for setting up pre commit
- **lint-staged** - for linting changes only

While in the root folder run:

```bash
 bunx husky init
```

**CHECK THE "./server/package.json" scripts for all the short commands**

To install dependencies:

```bash
bun install
```

To run:
while at the root directory run

```bash
bun all
```

Or if you want to run client and server separately:
run at the client directory:

```bash
bun run dev
```

then on a separate terminal on the server directory run:

```bash
bun spin
```

This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
