import express from "express";
import mongoose from "mongoose";
import { postsRoutes } from "./routes/postsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";

// Initializing Express app
const app = express();

// Middleware to receive JSON
app.use(express.json());

// Adding the API end-points and the route handlers
app.use("/api/posts", postsRoutes);
app.use("/api/users", usersRoutes);

// Connecting to MongoDB using Mongoose
mongoose
  .connect(process.env.MONGO_URI, { dbName: "demo_db" })
  .then(() => {
    console.log("connected to DB successfully");

    // Listening to requests if DB connection is successful
    app.listen(process.env.PORT, process.env.HOST, () => console.log(`Listening to port ${process.env.PORT}`));
  })
  .catch((err) => console.log(err));
