// setup a simple express server
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import { uploadRateLimit } from "./middleware/rateLimit.middleware";
import verifyToken from "./middleware/verifyToken.middleware";
import uploadToCloud from "./controller/uploadToCloud";
import addBoardMember from "./controller/addBoardMember.controller";
import AuthRouter from "./routes/auth.router";
import UserRouter from "./routes/user.router";
import GroupRouter from "./routes/group.router";
import MessageRouter from "./routes/message.router";
import DataRouter from "./routes/data.router";
import EventRouter from "./routes/event.router";

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
      allowMethods: ["POST", "PATCH", "GET", "DELETE", "OPTIONS"],
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

// Site Routers
App.route("/auth", AuthRouter);
App.route("/user", UserRouter);
App.route("/group", GroupRouter);
App.route("/message", MessageRouter);
App.route("/data", DataRouter);
App.route("/event", EventRouter);

// add board member route (with email)
App.post("/user/add/board-member", verifyToken, addBoardMember);

// ? image upload route (Hono handles file parsing natively via c.req.parseBody())
App.post("/image/upload", uploadRateLimit, verifyToken, uploadToCloud);

export default App;
