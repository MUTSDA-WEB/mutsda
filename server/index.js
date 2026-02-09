// setup a simple express server
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import checkSignupInfo from "./middleware/checkSignupInfo.middleware";
import verifyUsernameMiddleware from "./middleware/verifyUsername.middleware";
import verifyPasswordMiddleware from "./middleware/verifyPassword.middleware";
import registerUser from "./controller/registerUser.controller";
import getUnoccupiedRoles from "./helpers/getAvailableRoles";
import createEvent from "./controller/addEvent.controller";
import {
   getAllEvents,
   getAnnouncements,
   getPastEvents,
   getUpcomingEvents,
} from "./controller/getEvents.controller";
import {
   checkLogin,
   login,
   logout,
   updatePassword,
   updateProfileInfo,
} from "./controller/auth.controller";
import verifyToken from "./middleware/verifyToken.middleware";
import {
   saveLeaderMessage,
   saveVisitorMessage,
   updateMessageStatus,
} from "./controller/addMessage.controller";
import {
   getCommunityMessages,
   getDirectMessages,
   getGroupMessages,
   getVisitorMessages,
   deleteMessage,
   deleteMessageForMe,
} from "./controller/getMessage";
import {
   createGroup,
   getUserGroups,
   getGroupMembers,
   addGroupMember,
   removeGroupMember,
   updateMemberRole,
} from "./controller/group.contoller";
import getLeaders from "./controller/getMembers";

const App = new Hono();

App.use("*", logger());
App.use(
   "*",
   cors({
      origin: [
         "http://localhost:5173",
         "http://localhost:5174",
         "https://mutsda.vercel.app",
      ],
      allowMethods: ["POST", "PATCH", "GET", "DELETE"],
      credentials: true,
      allowHeaders: ["Content-Type", "Authorization", "X-Custom-Header"],
   }),
);

const handleDefaultRoute = (c) =>
   c.html(`
    <html>
        <body>
        MUTSDA SERVER
        </body>
    </html>    
`);

App.get("/", handleDefaultRoute);

// ? EVENT ROUTES
// fetch upcoming events
App.get("/event/upcoming", getUpcomingEvents);

// fetch past events
App.get("/event/past", getPastEvents);

// fetch all events
App.get("/event/all", getAllEvents);

// fetch all valid announcements
App.get("/event/announcement", getAnnouncements);

// Create event route
App.post("/event/create", verifyToken, createEvent);

// ? AUTH ROUTES
// get available roles
App.get("/auth/roles", getUnoccupiedRoles);

// register new User
App.post("/auth/register", checkSignupInfo, registerUser);

// login user route
App.post(
   "/auth/login",
   verifyUsernameMiddleware,
   verifyPasswordMiddleware,
   login,
);

// user logout route
App.post("/auth/logout", verifyToken, logout);

// user logged in check
App.get("/auth/check/login", verifyToken, checkLogin);

// update user info route
App.patch("/auth/update/profile", verifyToken, updateProfileInfo);

// update password route
App.patch("/auth/update/password", verifyToken, updatePassword);

// ? MESSAGE ROUTES
//save Leader Message route
App.post("/message/save/leader", verifyToken, saveLeaderMessage);

// save visitor Message route
App.post("/message/save/visitor", saveVisitorMessage);

// get Leader DMs route
App.get("/message/look/DMs", verifyToken, getDirectMessages);

// get Leader group messages route
App.get("/message/look/group/:id", verifyToken, getGroupMessages);

// get community messages route
App.get("/message/look/community", verifyToken, getCommunityMessages);

// get Visitor messages
App.get("/message/look/visitor", verifyToken, getVisitorMessages);

// update message status route
App.patch("/message/edit/:id", verifyToken, updateMessageStatus);

// delete message route (for everyone - sender only)
App.delete("/message/delete/:id", verifyToken, deleteMessage);

// delete message for me only (soft delete)
App.patch("/message/delete-for-me/:id", verifyToken, deleteMessageForMe);

// ? Group routes
// get user Groups route
App.get("/group/look", verifyToken, getUserGroups);

// create group route
App.post("/group/create", verifyToken, createGroup);

// get group members
App.get("/group/:id/members", verifyToken, getGroupMembers);

// add member to group
App.post("/group/:id/members", verifyToken, addGroupMember);

// remove member from group
App.delete("/group/:id/members/:memberId", verifyToken, removeGroupMember);

// update member role (promote/demote)
App.patch("/group/:id/members/:memberId", verifyToken, updateMemberRole);

// ? user routes
// get all users
App.get("/user/look", verifyToken, getLeaders);
App.get("/user/look/common", getLeaders);

export default App;
