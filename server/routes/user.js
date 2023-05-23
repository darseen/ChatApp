import express from "express";
import { register, login, showUser, fetchUsers } from "../controllers/user.js";
import isAuthorized from "../middleware/isAuthorized.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/:userId", showUser);
router.get("/users", isAuthorized, fetchUsers);

export default router;
