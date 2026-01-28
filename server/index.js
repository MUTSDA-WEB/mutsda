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
   saveMemberMessage,
   updateMessageStatus,
} from "./controller/addMessage.controller";
import {
   getCommunityMessages,
   getDirectMessages,
   getGroupMessages,
} from "./controller/getMessage";
import { createGroup, getUserGroups } from "./controller/group.contoller";

const App = new Hono();

App.use("*", logger());
App.use(
   "*",
   cors({
      origin: ["http://localhost:5173", "https://mutsda.vercel.app"],
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
App.patch("/auth/updateProfile/:id", verifyToken, updateProfileInfo);

// update password route
App.patch("/auth/updatePass/:id", verifyToken, updatePassword);

// ? MESSAGE ROUTES
//save Leader Message route
App.post("/message/save/leader", verifyToken, saveLeaderMessage);

// save visitor Message route
App.post("/message/save/visitor/:id", saveMemberMessage);

// get Leader DMs route
App.get("/message/look/DMs/:id", verifyToken, getDirectMessages);

// get Leader group messages route
App.get("/messages/look/group/:id", verifyToken, getGroupMessages);

// get community messages route
App.get("/message/look/community", verifyToken, getCommunityMessages);

// update message status route
App.patch("/message/edit/:id", verifyToken, updateMessageStatus);

// ? Group routes
// get user Groups route
App.get("/group/look/:id", verifyToken, getUserGroups);

// create group route
App.post("/group/create", verifyToken, createGroup);

export default App;
