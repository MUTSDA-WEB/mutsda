import { password } from "bun";

export default async function hashP(pass) {
   return await password.hash(pass, "bcrypt");
}
