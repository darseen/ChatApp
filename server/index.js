import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "node:http";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import { instrument } from "@socket.io/admin-ui";

/* ROUTES IMPORT */
import userRoutes from "./routes/user.js";
import messageRoutes from "./routes/messages.js";

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
  cors: {
    origin: "*",
  },
  methods: ["GET", "POST"],
});

/* ROUTES */
app.use("/", userRoutes);
app.use("/", messageRoutes);

/* CONNECTION SETUP */
const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;

let activeUsers = new Map();
// exporting active users map to be modified in other files
export const getActiveUsers = () => activeUsers;
export const setActiveUsers = (value) => (activeUsers = value);

io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);

  /* GLOBAL CHAT */
  socket.on("global_client", (data) => {
    socket.broadcast.emit("global_server", data);
  });

  // get username from global chat
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

  /* PRIVATE CHATS */
  socket.on("join_private_chat", (chatId) => {
    console.log("Joined Room: ", chatId);
    socket.join(chatId);
  });
  socket.on("send_private_message", ({ messageData: message, chatId }) => {
    console.log(message, chatId);
    socket.to(chatId).emit("receive_private_message", message);
  });
});
instrument(io, { auth: false });

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
