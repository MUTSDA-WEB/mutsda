export default async (c, next) => {
   const { password: hashedPass } = c.get("userInfo");
   const { password } = c.req.json();
   if (!secure.verifySync(password, hashedPass, "bcrypt")) {
      return c.json(
         {
            error: "Invalid Login credential",
         },
         400,
      );
   }
   await next();
};
