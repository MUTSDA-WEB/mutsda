// setup a simple express server
import { Hono } from "hono";
import { logger } from "hono/logger";
import { cors } from "hono/cors";
import checkSignupInfo from "./middleware/checkSignupInfo.middleware";
import verifyUsernameMiddleware from "./middleware/verifyUsername.middleware";
import verifyPasswordMiddleware from "./middleware/verifyPassword.middleware";
import registerUser from "./controller/registerUser.controller";
import {
   getAllEvents,
   getPastEvents,
   getUpcomingEvents,
} from "./controller/getEvents.controller";
import login from "./controller/auth.controller";

const App = new Hono();
App.use("*", async (c, next) => {
   c.header("Access-Control-Allow-Credentials", "true");
   c.header("Access-Control-Allow-Origin", "http://localhost:5173");
   await next();
});

App.use("*", logger());
App.use("*", cors());

const handleDefaultRoute = (c) =>
   c.html(`
    <html>
        <body>
        MUTSDA SERVER
        </body>
        <input type=file name=file/>
    </html>    
`);

App.get("/", handleDefaultRoute);

// fetch upcoming events
App.get("/event/upcoming", getUpcomingEvents);

// fetch past events
App.get("/event/past", getAllEvents);

// fetch all events
App.get("/event/all", getPastEvents);

// register new User
App.post("/auth/register", checkSignupInfo, registerUser);

// login user route
App.post(
   "/auth/login",
   verifyUsernameMiddleware,
   verifyPasswordMiddleware,
   login,
);

export default App;
