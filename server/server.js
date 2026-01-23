import App from ".";
import client from "./helpers/prismaClient";

async function RunDBandServer() {
   // spin up the DB
   await client.$connect();
   console.log("✅ Database connected");

   // start server
   const server = Bun.serve({
      port: process.env.PORT,
      fetch: App.fetch,
   });

   // Graceful shutdown
   process.on("SIGTERM", async () => {
      console.log("Shutting down...");
      await client.$disconnect();
      server.stop();
   });
}

RunDBandServer();
