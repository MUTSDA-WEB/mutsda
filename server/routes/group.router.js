import { Hono } from "hono";

const Group = new Hono();

// ? Group routes
Group.use("/group/*", verifyToken);
// get user Groups route
Group.get("/group/look", getUserGroups);

// create group route
Group.post("/group/create", createGroup);

// get group members
Group.get("/group/:id/members", getGroupMembers);

// add member to group
Group.post("/group/:id/members", addGroupMember);

// remove member from group
Group.delete("/group/:id/members/:memberId", removeGroupMember);

// update member role (promote/demote)
Group.patch("/group/:id/members/:memberId", updateMemberRole);
