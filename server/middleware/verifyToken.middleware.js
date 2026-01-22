import { jwt } from "hono/jwt";

// 🔥 Hono will automatically:
// Read auth cookie
// Verify JWT
// Attach payload to c.get("jwtPayload")

export default async function verifyToken(c, next) {
  jwt({
    secret: process.env.JWT_SECRET,
    cookie: "auth",
  });
}
