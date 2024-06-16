import express from "express";
import mongoose from "mongoose";
import { postsRoutes } from "./routes/postsRoutes.js";
import { usersRoutes } from "./routes/usersRoutes.js";

// Initializing Express app
const app = express();

const allowCrossDomain = function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'https://youtube-videos-mern2024.onrender.com')
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, access_token'
  )

  // intercept OPTIONS method
  if ('OPTIONS' === req.method) {
    res.header('Access-Control-Allow-Origin', 'https://youtube-videos-mern202411.onrender.com')
    res.send(200)
  } else {
    next()
  }
}
app.use(allowCrossDomain)

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
