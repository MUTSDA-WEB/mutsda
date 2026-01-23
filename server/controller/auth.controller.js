import { sign } from "hono/jwt";
import { getUserByID, getUserDetails } from "../helpers/getUserInfo";
import checkPassword from "../helpers/checkPassword";
import hashP from "../helpers/hashPassword";
import client from "../helpers/prismaClient";

export function login(c) {
   const token = sign(c.get("userInfo"), process.env.JWT_SECRET);
   c.header(
      "Set-Cookie",
      `auth=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`,
   );
   return c.json(
      {
         message: "successful login",
      },
      201,
   );
}

export async function updatePassword(c) {
   const { oldPassword, newPassword } = c.req.json();
   const id = c.req.param("id");

   try {
      let userDetails = c.get("userInfo") || (await getUserByID(id));
      if (!(await checkPassword(oldPassword, userDetails?.password))) {
         return c.json({ error: "Incorrect old password" }, 400);
      }

      // update db with new hashed password
      const newHashedPass = await hashP(newPassword);
      const updatedUser = client.user.update({
         where: { userName },
         data: { password: newHashedPass },
      });

      return c.json({
         message: "Password update successfully",
         user: updatedUser,
      });
   } catch (error) {
      console.log(error);
      return c.json({ error: "Server error: Failed to update password!" }, 500);
   }
}

export async function updateProfileInfo(c) {
   const { username, email, phoneNumber } = c.req.json();
   const id = c.req.param("id");
   try {
      const updatedUser = await client.user.update({
         where: { userID: id },
         data: { email, userName: username, phoneNumber },
      });
      return c.json(
         { message: "User profile updated successfully", user: updatedUser },
         201,
      );
   } catch (error) {
      console.log(error);
      return c.json(
         { error: "Server error: Failed to update user Profile" },
         500,
      );
   }
}
