import hashP from "../helpers/hashPassword";
import client from "../helpers/prismaClient";
import getUnoccupiedRoles from "../helpers/getAvailableRoles";

export default async function registerUser(c) {
   const { username, email, password, phoneNumber, role } = c.get("info");
   const hashedPassword = hashP(password);

   try {
      // Verify the role is still available before creating user
      const availableRoles = await getUnoccupiedRoles();
      if (!availableRoles.includes(role)) {
         return c.json({ error: "Selected role is no longer available" }, 400);
      }

      // accessing the db so as to save
      const newUser = await client.user.create({
         data: {
            email,
            userName: username,
            password: hashedPassword,
            phoneNumber: parseInt(phoneNumber, 10),
            role,
         },
      });
      // return the new User
      return c.json(
         { message: "User created successfully", user: newUser },
         201,
      );
   } catch (error) {
      return c.json({ error: "Failed to register user" }, 500);
   }
}
