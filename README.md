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
