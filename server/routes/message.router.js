import { Hono } from "hono";

const Message = new Hono();

// ? MESSAGE ROUTES
//save Leader Message route
Message.post(
   "/message/save/leader",
   messageRateLimit,
   verifyToken,
   saveLeaderMessage,
);

// save visitor Message route
Message.post("/message/save/visitor", messageRateLimit, saveVisitorMessage);

// get Leader DMs route
Message.get("/message/look/DMs", verifyToken, getDirectMessages);

// get Leader group messages route
Message.get("/message/look/group/:id", verifyToken, getGroupMessages);

// get community messages route
Message.get("/message/look/community", verifyToken, getCommunityMessages);

// get Visitor messages
Message.get("/message/look/visitor", verifyToken, getVisitorMessages);

// update message status route
Message.patch("/message/edit/:id", verifyToken, updateMessageStatus);

// delete message route (for everyone - sender only)
Message.delete("/message/delete/:id", verifyToken, deleteMessage);

// delete message for me only (soft delete)
Message.patch("/message/delete-for-me/:id", verifyToken, deleteMessageForMe);
