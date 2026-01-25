import { PrismaClient } from "../../prisma/generated/client.js";
import { PrismaPg } from "@prisma/adapter-pg";

const adapter = new PrismaPg({
   connectionString: process.env.DATABASE_URL,
});

const client = new PrismaClient({ adapter });

export default client;
