import { Hono } from "hono";

const Event = new Hono();

// ? EVENT ROUTES
// fetch upcoming events
Event.get("/event/upcoming", getUpcomingEvents);

// fetch past events
Event.get("/event/past", getPastEvents);

// fetch all events
Event.get("/event/all", getAllEvents);

// fetch all valid announcements
Event.get("/event/announcement", getAnnouncements);

// Create event route
Event.post("/event/create", verifyToken, createEvent);
