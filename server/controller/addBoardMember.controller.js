import hashP from "../helpers/hashPassword";
import client from "../helpers/prismaClient";
import { generateCredentials } from "../helpers/generateCredentials";
import { sendWelcomeEmail } from "../service/email.service";

export default async function addBoardMember(c) {
   const { name, email, phoneNumber, role = "elder1" } = await c.req.json();

   try {
      // Validate name
      if (!name || typeof name !== "string" || name.trim().length === 0) {
         return c.json({ error: "Full name is required" }, 400);
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
         return c.json({ error: "Invalid email format" }, 400);
      }

      // Check if email already exists
      const existingUser = await client.user.findUnique({
         where: { email },
      });

      if (existingUser) {
         return c.json(
            { error: "Email already registered in the system" },
            400,
         );
      }

      // Generate credentials
      const { username, password } = generateCredentials(email);

      // Hash password
      const hashedPassword = await hashP(password);

      // Parse phone number
      const phoneNum = parseInt(phoneNumber, 10);

      // Create user in database
      const newBoardMember = await client.user.create({
         data: {
            name,
            email,
            userName: username,
            password: hashedPassword,
            phoneNumber: phoneNum,
            role,
         },
      });

      console.log(
         "✅ Board member created:",
         newBoardMember.userID,
         newBoardMember.email,
      );

      // Send welcome email
      const emailResult = await sendWelcomeEmail(
         email,
         name,
         username,
         password,
      );

      if (!emailResult.success) {
         console.warn(
            "⚠️ Email sending failed for",
            email,
            ":",
            emailResult.error,
         );
         // Don't fail the request if email fails, just log it
      } else {
         console.log("✅ Email sent to", email);
      }

      return c.json(
         {
            message: "Board member added successfully",
            user: {
               userID: newBoardMember.userID,
               email: newBoardMember.email,
               userName: newBoardMember.userName,
               role: newBoardMember.role,
               phoneNumber: newBoardMember.phoneNumber,
            },
            emailSent: emailResult.success,
         },
         201,
      );
   } catch (error) {
      console.error("Error adding board member:", error);
      return c.json(
         { error: "Failed to add board member. Please try again." },
         500,
      );
   }
}
