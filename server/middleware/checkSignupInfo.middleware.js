import client from "../helpers/prismaClient";

export default async function checkSignupInfo(c, next) {
   const signUpBody = await c.req.json();
   c.set("info", signUpBody);

   // Check username first
   const usernameError = await checkUsername(c);
   if (usernameError) {
      return usernameError;
   }

   // Check email
   const emailError = await checkEmail(c);
   if (emailError) {
      return emailError;
   }

   // Only call next() once if all checks pass
   await next();
}

async function checkEmail(c) {
   const { email } = c.get("info");
   const em = await client.user.findFirst({
      where: { email },
   });
   if (em) {
      return c.json(
         {
            error: "Email already exists",
         },
         400,
      );
   }
   return null;
}

async function checkUsername(c) {
   const { username } = c.get("info");
   const un = await client.user.findFirst({
      where: { userName: username },
   });
   if (un) {
      return c.json(
         {
            error: "username already exists",
         },
         400,
      );
   }
   return null;
}
