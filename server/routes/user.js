import express from "express";
import {
  register,
  login,
  logout,
  showUser,
  fetchUsers,
} from "../controllers/user.js";
import isAuthorized from "../middleware/isAuthorized.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/:userId", showUser);
router.get("/users", isAuthorized, fetchUsers);
router.delete("/logout/:userId", isAuthorized, logout);

export default router;
