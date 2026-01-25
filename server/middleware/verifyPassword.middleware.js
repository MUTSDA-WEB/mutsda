import checkPassword from "../helpers/checkPassword";

export default async (c, next) => {
   const { password: hashedPass } = c.get("userInfo");
   const { password } = c.req.json();
   if (checkPassword(password, hashedPass)) {
      return c.json(
         {
            error: "Invalid Login credential",
         },
         400,
      );
   }
   await next();
};
