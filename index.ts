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
      name: "Realtime",
      command: "bun realtime",
      cwd: "./server",
      prefixColor: "yellow",
      env: {
         SOCKET_URL: process.env.SOCKET,
         REDIS_URL: process.env.REDIS_URL,
         CLIENT_URL: process.env.CLIENT_URL,
      },
   },
   // worker js to save the messages
   {
      name: "Worker",
      command: "bun worker",
      cwd: "./server",
      prefixColor: "yellowBright",
      env: {
         REDIS_URL: process.env.REDIS_URL,
      },
   },
]);
