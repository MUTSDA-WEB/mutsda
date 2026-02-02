import concurrently from "concurrently";
concurrently([
   // client start up
   {
      name: "client",
      command: "bun dev",
      cwd: "./client",
      prefixColor: "cyan",
   },
   // server start up
   {
      name: "server",
      command: "bun spin",
      cwd: "./server",
      prefixColor: "green",
      env: {
         PORT: process.env.PORT,
         DATABASE_URL: process.env.DATABASE_URL,
      },
   },
   // Realtime chat start up
   {
      name: "chat",
      command: "bun chat",
      cwd: "./server",
      prefixColor: "yellow",
      env: {
         SOCKET: process.env.SOCKET,
         REDIS_URL: process.env.REDIS_URL,
         CLIENT_URL: process.env.CLIENT_URL,
      },
   },
]);
