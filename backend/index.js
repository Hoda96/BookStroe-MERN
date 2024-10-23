import express from "express";
import { mongoDBURL, PORT } from "./config.js";
import mongoose from "mongoose";
import booksRouter from "./routes/booksRoute.js";


const app = express();
// const cors= cors();

// Middleware for parsing body request
app.use(express.json());

app.get("/", (request, response) => {
  console.log(request);
  return response
    .status(200)
    .send("Well Done. You've created your first HTTP route");
});

app.use("/books", booksRouter);

// Middleware for handling CORS  Policy
// 1) Allow all origins with default CORS(*)
// app.use(cors());
// 2) Allow custom origins
// app.use(
//   cors({
//     origin: "http://localhost:3000",
//     methods: ['GET','POST','PUT','DELETE'],
//     allowedHeaders: ['Content-Type'],
//   })
// );

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("connected to mongoDB");
    app.listen(PORT, () => {
      console.log(`Listen to port ${PORT}`);
    });
  })
  .catch((error) => console.error(`error ${error}`));
