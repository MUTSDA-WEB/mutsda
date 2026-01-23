import { sign } from "hono/jwt";
import App from "..";
import { getUserDetails } from "../helpers/getUserInfo";
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

// export async function updatePassword
App.get("", async (c) => {
   const { oldPassword, newPassword } = c.req.json();
   const userName = c.req.param("username");

   try {
      let userDetails = c.get("userInfo") || (await getUserDetails(userName));
      if (!(await checkPassword(oldPassword, userDetails?.password))) {
         return c.json({ error: "Incorrect old password" }, 400);
      }

      // update db with new hashed password
      const newHashedPass = await hashP(newPassword);
      const updatedUser = client.user.update({
         where: { userName },
         data: { password: newHashedPass },
      });

      return c.json({ message: "Password " });
   } catch (error) {
      console.log(error);
      return c.json({ error: "Server error: Failed to update password!" }, 500);
   }
});

export async function updateProfileInfo(c) {}
