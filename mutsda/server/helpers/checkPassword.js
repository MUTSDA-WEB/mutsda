import { password as secure } from "bun";

export default async function checkPassword(password, hashedPass) {
   return await secure.verify(password, hashedPass, "bcrypt");
}
