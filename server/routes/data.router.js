import { Hono } from "hono";
import {
   getAllChurchData,
   upsertData,
} from "../controller/churchData.controller";
import verifyToken from "../middleware/verifyToken.middleware";

const Data = new Hono();

// get all dynamic site data
Data.get("/data/look", getAllChurchData);

// update site dynamic data
Data.patch("data/upsert/:field", verifyToken, upsertData);
