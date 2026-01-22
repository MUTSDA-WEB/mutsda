import hashP from "../helpers/hashPassword";
import client from "../helpers/prismaClient";

export default async function registerUser(c) {
   const { username, email, password } = c.get("info");
   const hashedPassword = hashP(password);

   try {
      // accessing the db so as to save
      const newUser = await client.user.create({
         data: {
            email,
            userName: username,
            password: hashedPassword,
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
