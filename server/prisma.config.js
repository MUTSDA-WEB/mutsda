import { defineConfig } from "prisma/config";

export default defineConfig({
   // Path to your schema file or a folder for multi-file schemas
   schema: "prisma/schema.prisma",

   // Database connection details for migrations
   datasource: {
      provider: "postgresql",
      url: process.env.DATABASE_URL,
   },

   // Migration and seeding configuration
   migrations: {
      path: "prisma/migrations",
      // seed: 'tsx prisma/seed.ts', // Command to run your seed script
   },

   // Required for Prisma v7 architecture
   engine: "classic",
});
