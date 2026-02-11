import { sign } from "hono/jwt";
import { getUserByID } from "../helpers/getUserInfo";
import checkPassword from "../helpers/checkPassword";
import hashP from "../helpers/hashPassword";
import client from "../helpers/prismaClient";
import { deleteCookie, setCookie } from "hono/cookie";

export async function login(c) {
   const token = await sign(c.get("userInfo"), process.env.JWT_SECRET, "HS384");

   setCookie(c, "auth", token, {
      httpOnly: true,
      secure: true,
      sameSite: "None",
      path: "/",
      maxAge: 86400,
   });
   return c.json(
      {
         message: "successful login",
      },
      201,
   );
}

export async function checkLogin(c) {
   const { userID } = c.get("jwtPayload");
   // Fetch fresh user data from database instead of using stale JWT data
   const user = await client.user.findUnique({
      where: { userID },
      select: {
         userID: true,
         userName: true,
         email: true,
         phoneNumber: true,
         role: true,
         imageURL: true,
         // memberSince: true,
         // department: true,
      },
   });
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
   const { userName, email, phoneNumber, imageURL } = await c.req.json();
   const { userID } = c.get("jwtPayload");
   try {
      // Build update data object (only include fields that are provided)
      const updateData = {};
      if (userName !== undefined) updateData.userName = userName;
      if (email !== undefined) updateData.email = email;
      if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
      if (imageURL !== undefined) updateData.imageURL = imageURL;

      const updatedUser = await client.user.update({
         where: { userID },
         data: updateData,
         select: {
            userID: true,
            userName: true,
            email: true,
            phoneNumber: true,
            role: true,
            imageURL: true,
         },
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
