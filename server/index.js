// setup a simple express server
import { Hono } from "hono";
import getUpcomingEvents from "./controller/getUpcomingEvents.controller";
import checkSignupInfo from "./middleware/checkSignupInfo.middleware";
import registerUser from "./controller/registerUser.controller";
import verifyUsernameMiddleware from "./middleware/verifyUsername.middleware";
import verifyPasswordMiddleware from "./middleware/verifyPassword.middleware";
import login from "./controller/auth.controller";

const App = new Hono();
App.use("*", async (c, next) => {
   c.header("Access-Control-Allow-Credentials", "true");
   c.header("Access-Control-Allow-Origin", "http://localhost:5173");
   await next();
});

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
App.get("/upcoming-events", getUpcomingEvents);

// register new User
App.post("/auth/register", checkSignupInfo, registerUser);

// login user route
App.post(
   "/auth/login",
   verifyUsernameMiddleware,
   verifyPasswordMiddleware,
   login,
);

// create new event route
App.post("/events", getAllEvents);

export default App;
