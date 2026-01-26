import checkPassword from "../helpers/checkPassword";

export default async (c, next) => {
   const { password: hashedPass } = c.get("userInfo");
   const { password } = await c.req.json();
   if (!(await checkPassword(password, hashedPass))) {
      return c.json(
         {
            error: "Invalid Login credentials",
         },
         400,
      );
   }
   await next();
};
