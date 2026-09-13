import { Hono } from "hono";
import verifyToken from "../middleware/verifyToken.middleware";
import {
   addGroupMember,
   createGroup,
   getGroupMembers,
   getUserGroups,
   removeGroupMember,
   updateMemberRole,
} from "../controller/group.contoller";

const GroupRouter = new Hono();

// ? Group routes
GroupRouter.use("/*", verifyToken);
// get user Groups route
GroupRouter.get("/look", getUserGroups);

// create group route
GroupRouter.post("/create", createGroup);

// get group members
GroupRouter.get("/:id/members", getGroupMembers);

// add member to group
GroupRouter.post("/:id/members", addGroupMember);

// remove member from group
GroupRouter.delete("/:id/members/:memberId", removeGroupMember);

// update member role (promote/demote)
GroupRouter.patch("/:id/members/:memberId", updateMemberRole);

export default GroupRouter;
