import express from "express";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import connectDB from "./config/db.js";
import router from "./routes/noteRoutes.js";

connectDB();

const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
