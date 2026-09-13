import { Hono } from "hono";
import verifyToken from "../middleware/verifyToken.middleware";
import getLeaders from "../controller/getMembers";

const UserRouter = new Hono();

// ? user routes
// get all users
UserRouter.get("/look", verifyToken, getLeaders);
UserRouter.get("/look/common", getLeaders);

export default UserRouter;
