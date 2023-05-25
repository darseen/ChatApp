import express from "express";
import isAuthorized from "../middleware/isAuthorized.js";
import { fetchMessages } from "../controllers/messages.js";

const router = express.Router();

router.get("/fetchMessages", isAuthorized, fetchMessages);

export default router;
