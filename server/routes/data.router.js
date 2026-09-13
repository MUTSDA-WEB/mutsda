import { Hono } from "hono";
import {
   getAllChurchData,
   upsertData,
} from "../controller/churchData.controller";
import verifyToken from "../middleware/verifyToken.middleware";

const DataRouter = new Hono();

// get all dynamic site data
DataRouter.get("/look", getAllChurchData);

// update site dynamic data
DataRouter.patch("/upsert/:field", verifyToken, upsertData);

export default DataRouter;
