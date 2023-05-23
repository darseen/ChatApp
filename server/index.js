import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "node:http";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";

/* ROUTES IMPORT */
import userRoutes from "./routes/user.js";

/* CONFIGURATION */
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
dotenv.config();
const server = http.createServer(app);
const io = new Server(server, {
  cors: "*",
  methods: ["GET", "POST"],
});

/* ROUTES */
app.use("/", userRoutes);

/* CONNECTION SETUP */
const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;

const activeUsers = new Map();
export const getActiveUsers = () => activeUsers;
export const setActiveUsers = (value) => (activeUsers = value);

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  /* GLOBAL CHAT */
  socket.on("global_client", (data) => {
    socket.broadcast.emit("global_server", data);
  });

  /* GET USERNAME */
  socket.on("users", (data) => {
    activeUsers.set(socket.id, data);
    io.emit("send_users", Array.from(activeUsers.values()));
  });
  // remove user from list on disconnect
  socket.on("disconnect", () => {
    activeUsers.delete(socket.id);
    io.emit("send_users", Array.from(activeUsers.values()));
  });
  // send users list when requested
  socket.on("get_active_users", () => {
    io.emit("send_users", Array.from(activeUsers.values()));
  });
});

mongoose
  .connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to database");
    server.listen(PORT, () => {
      console.log(`Listening on port ${PORT}`);
    });
  });
