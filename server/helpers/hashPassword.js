import { password } from "bun";

export default function hashP(pass) {
   return password.hash(pass, "bcrypt");
}
