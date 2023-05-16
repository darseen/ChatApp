import express from "express";
import cors from "cors";
import { Server } from "socket.io";
import http from "node:http";
import helmet from "helmet";
import mongoose from "mongoose";
import dotenv from "dotenv";

/* CONFIGURATION */
const app = express();
app.use(cors());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
dotenv.config();
const server = http.createServer(app);
const io = new Server(server, {
  cors: "*",
  methods: ["GET", "POST"],
});

/* CONNECTION SETUP */
const PORT = process.env.PORT || 3001;
const MONGODB_URL = process.env.MONGODB_URL;
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
