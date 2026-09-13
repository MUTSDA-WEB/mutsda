import { Hono } from "hono";
import {
   getAllEvents,
   getAnnouncements,
   getPastEvents,
   getUpcomingEvents,
} from "../controller/getEvents.controller";
import createEvent from "../controller/addEvent.controller";
import verifyToken from "../middleware/verifyToken.middleware";

const EventRouter = new Hono();

// ? EVENT ROUTES
// fetch upcoming events
EventRouter.get("/upcoming", getUpcomingEvents);

// fetch past events
EventRouter.get("/past", getPastEvents);

// fetch all events
EventRouter.get("/all", getAllEvents);

// fetch all valid announcements
EventRouter.get("/announcement", getAnnouncements);

// Create event route
EventRouter.post("/create", verifyToken, createEvent);

export default EventRouter;
