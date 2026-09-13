import { sign } from "hono/jwt";
import { getUserByID } from "../helpers/getUserInfo";
import checkPassword from "../helpers/checkPassword";
import hashP from "../helpers/hashPassword";
import client from "../helpers/prismaClient";
import { deleteCookie, setCookie } from "hono/cookie";
import {
   sendPasswordChangeEmail,
   sendPasswordResetEmail,
} from "../service/email.service";
import { createHash, randomInt } from "node:crypto";

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000;

function hashResetToken(token) {
   return createHash("sha256").update(token).digest("hex");
}

export async function requestPasswordReset(c) {
   const { email } = await c.req.json();

   if (typeof email !== "string" || !email.trim()) {
      return c.json({ error: "A valid email is required" }, 400);
   }

   const user = await client.user.findFirst({
      where: { email: { equals: email.trim(), mode: "insensitive" } },
      select: { userID: true, email: true, name: true, userName: true },
   });

   if (user) {
      const pin = randomInt(100000, 1000000).toString();
      await client.user.update({
         where: { userID: user.userID },
         data: {
            resetTokenHash: hashResetToken(pin),
            resetTokenExpiresAt: new Date(Date.now() + RESET_TOKEN_TTL_MS),
         },
      });

      const emailResult = await sendPasswordResetEmail(
         user.email,
         user.name || user.userName,
         pin,
      );
      if (!emailResult.success) {
         console.error("Password reset email failed:", emailResult.error);
      }
   }

   return c.json({
      message:
         "If an account exists for that email, a password reset PIN has been sent.",
   });
}

export async function resetPassword(c) {
   const { email, pin, password } = await c.req.json();

   if (
      typeof email !== "string" ||
      !/^\d{6}$/.test(pin) ||
      typeof password !== "string" ||
      password.length < 8 ||
      password.length > 16
   ) {
      return c.json(
         { error: "Password must be between 8 and 16 characters" },
         400,
      );
   }

   const user = await client.user.findFirst({
      where: {
         email: { equals: email.trim(), mode: "insensitive" },
         resetTokenHash: hashResetToken(pin),
         resetTokenExpiresAt: { gt: new Date() },
      },
   });

   if (!user) {
      return c.json(
         { error: "This password reset link is invalid or has expired" },
         400,
      );
   }

   await client.user.update({
      where: { userID: user.userID },
      data: {
         password: await hashP(password),
         resetTokenHash: null,
         resetTokenExpiresAt: null,
      },
   });

   return c.json({ message: "Password reset successfully" });
}

export async function login(c) {
   const token = await sign(c.get("userInfo"), process.env.JWT_SECRET, "HS384");

   setCookie(c, "auth", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Only secure in production
      sameSite: "Lax",
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
   try {
      const jwtPayload = c.get("jwtPayload");
      if (!jwtPayload || !jwtPayload.userID) {
         return c.json({ error: "Invalid token" }, 401);
      }

      const { userID } = jwtPayload;

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
         },
      });

      if (!user) {
         return c.json({ error: "User not found" }, 404);
      }

      return c.json({ message: "user is logged in", user }, 200);
   } catch (error) {
      console.error("Error in checkLogin:", error);
      return c.json({ error: "Failed to verify login" }, 500);
   }
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
      // Get user details and verify old password
      const userDetails = await client.user.findUnique({
         where: { userID },
      });

      if (!userDetails) {
         return c.json({ error: "User not found" }, 404);
      }

      if (!(await checkPassword(oldPassword, userDetails.password))) {
         return c.json({ error: "Incorrect old password" }, 400);
      }

      // Hash new password and update database
      const newHashedPass = await hashP(newPassword);
      const updatedUser = await client.user.update({
         where: { userID },
         data: { password: newHashedPass },
         select: {
            userID: true,
            email: true,
            userName: true,
            role: true,
            name: true,
         },
      });

      // Send password change confirmation email
      const emailResult = await sendPasswordChangeEmail(
         updatedUser.email,
         updatedUser.name || updatedUser.userName,
      );

      if (!emailResult.success) {
         console.warn(
            "⚠️ Password change email failed for",
            updatedUser.email,
            ":",
            emailResult.error,
         );
         // Don't fail the request if email fails, just log it
      } else {
         console.log("✅ Password change email sent to", updatedUser.email);
      }

      return c.json(
         {
            message: "Password updated successfully",
            user: updatedUser,
            emailSent: emailResult.success,
         },
         201,
      );
   } catch (error) {
      console.error("Error updating password:", error);
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
