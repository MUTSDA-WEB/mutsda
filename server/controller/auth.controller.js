import { sign } from "hono/jwt";

export default function login(c) {
  const token = sign(c.get("userInfo"), process.env.JWT_SECRET);
  c.header(
    "Set-Cookie",
    `auth=${token}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`,
  );
  return c.json(
    {
      message: "successful login",
    },
    200,
  );
}
