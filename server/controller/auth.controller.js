import { sign } from "hono/jwt";
import { getUserByID } from "../helpers/getUserInfo";
import checkPassword from "../helpers/checkPassword";
import hashP from "../helpers/hashPassword";
import client from "../helpers/prismaClient";
import { deleteCookie } from "hono/cookie";

export async function login(c) {
   const token = await sign(c.get("userInfo"), process.env.JWT_SECRET, "HS384");

   // * Remove 'Secure' flag for localhost development (no HTTPS)
   // TODO: Add it back for production
   c.header(
      "Set-Cookie",
      `auth=${token}; HttpOnly; SameSite=Lax; Path=/; Max-Age=86400`,
   );
   return c.json(
      {
         message: "successful login",
      },
      201,
   );
}

export async function checkLogin(c) {
   const user = c.get("jwtPayload");
   return c.json({ message: "user is logged in", user }, 200);
}

export function logout(c) {
   deleteCookie(c, "auth", {
      path: "/",
      sameSite: "Lax",
      httpOnly: true,
   });

   return c.json({ message: "Successfully logged out" });
}

export async function updatePassword(c) {
   const { oldPassword, newPassword } = await c.req.json();
   const { userID } = c.get("jwtPayload");

   try {
      let userDetails = c.get("userInfo") || (await getUserByID(id));
      if (!(await checkPassword(oldPassword, userDetails?.password))) {
         return c.json({ error: "Incorrect old password" }, 400);
      }

      // update db with new hashed password
      const newHashedPass = await hashP(newPassword);
      const updatedUser = client.user.update({
         where: { userID },
         data: { password: newHashedPass },
      });

      return c.json(
         {
            message: "Password update successfully",
            user: updatedUser,
         },
         201,
      );
   } catch (error) {
      console.log(error);
      return c.json({ error: "Server error: Failed to update password!" }, 500);
   }
}

export async function updateProfileInfo(c) {
   const { username, email, phoneNumber } = await c.req.json();
   const { userID } = c.get("jwtPayload");
   try {
      const updatedUser = await client.user.update({
         where: { userID },
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
