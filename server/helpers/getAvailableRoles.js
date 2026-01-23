import client from "./prismaClient";
import { $Enums } from "../../prisma/generated/index.js";

export default async function getUnoccupiedRoles() {
   // 1. Get all roles currently assigned in the database
   const occupiedLeaders = await client.user.findMany({
      select: { role: true },
   });

   const occupiedRoles = occupiedLeaders.map((leader) => leader.role);

   // 2. Get all possible roles from the Prisma enum
   // Object.values(Role) converts the enum object into an array of strings
   const allRoles = Object.values($Enums.Role);

   // 3. Filter out the roles that are already taken
   const remainingRoles = allRoles.filter(
      (role) => !occupiedRoles.includes(role),
   );

   return remainingRoles;
}
