import { jwt } from "hono/jwt";

// 🔥 Hono will automatically:
// Read auth cookie
// Verify JWT
// Attach payload to c.get("jwtPayload")

export default async function verifyToken(c, next) {
   const TokenVerifier = jwt({
      secret: process.env.JWT_SECRET,
      cookie: "auth",
      alg: "HS384",
   });
   return await TokenVerifier(c, next);
}
