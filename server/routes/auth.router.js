import { Hono } from "hono";
import getUnoccupiedRoles from "../helpers/getAvailableRoles";
import { authRateLimit } from "../middleware/rateLimit.middleware";
import checkSignupInfo from "../middleware/checkSignupInfo.middleware";
import registerUser from "../controller/registerUser.controller";
import verifyUsernameMiddleware from "../middleware/verifyUsername.middleware";
import verifyPasswordMiddleware from "../middleware/verifyPassword.middleware";
import {
   checkLogin,
   login,
   logout,
   updatePassword,
   updateProfileInfo,
} from "../controller/auth.controller";
import verifyToken from "../middleware/verifyToken.middleware";

const AuthRouter = new Hono();

// ? AUTH ROUTES
// get available roles
AuthRouter.get("/roles", getUnoccupiedRoles);

// register new User
AuthRouter.post("/register", authRateLimit, checkSignupInfo, registerUser);

// login user route
AuthRouter.post(
   "/login",
   authRateLimit,
   verifyUsernameMiddleware,
   verifyPasswordMiddleware,
   login,
);

// user logout route
AuthRouter.post("/logout", verifyToken, logout);

// user logged in check
AuthRouter.get("/check/login", verifyToken, checkLogin);

// update user info route
AuthRouter.patch("/update/profile", verifyToken, updateProfileInfo);

// update password route
AuthRouter.patch("/update/password", verifyToken, updatePassword);

export default AuthRouter;
