import { Hono } from "hono";
import { messageRateLimit } from "../middleware/rateLimit.middleware";
import verifyToken from "../middleware/verifyToken.middleware";
import {
   saveLeaderMessage,
   saveVisitorMessage,
   updateMessageStatus,
} from "../controller/addMessage.controller";
import {
   deleteMessage,
   deleteMessageForMe,
   getCommunityMessages,
   getDirectMessages,
   getGroupMessages,
   getVisitorMessages,
} from "../controller/getMessage";

const MessageRouter = new Hono();

// ? MESSAGE ROUTES
//save Leader Message route
MessageRouter.post(
   "/save/leader",
   messageRateLimit,
   verifyToken,
   saveLeaderMessage,
);

// save visitor Message route
MessageRouter.post("/save/visitor", messageRateLimit, saveVisitorMessage);

// get Leader DMs route
MessageRouter.get("/look/DMs", verifyToken, getDirectMessages);

// get Leader group messages route
MessageRouter.get("/look/group/:id", verifyToken, getGroupMessages);

// get community messages route
MessageRouter.get("/look/community", verifyToken, getCommunityMessages);

// get Visitor messages
MessageRouter.get("/look/visitor", verifyToken, getVisitorMessages);

// update message status route
MessageRouter.patch("/edit/:id", verifyToken, updateMessageStatus);

// delete message route (for everyone - sender only)
MessageRouter.delete("/delete/:id", verifyToken, deleteMessage);

// delete message for me only (soft delete)
MessageRouter.patch("/delete-for-me/:id", verifyToken, deleteMessageForMe);

export default MessageRouter;
