import express from "express";
import isAuthorized from "../middleware/isAuthorized.js";
import { fetchMessages, createMessage } from "../controllers/messages.js";

const router = express.Router();

router.get("/fetchMessages", isAuthorized, fetchMessages);
router.post("/message", isAuthorized, createMessage);

export default router;
