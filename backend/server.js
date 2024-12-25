import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import connectDB from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import cors from "cors";
dotenv.config();
console.log(dotenv.config());
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get("/", (req, res) => {
  res.send(req.body);
});
app.use("/api/auth", authRoutes);
// app.listen(5000, () => {
//   console.log(`Server running on port 5000`);
// });

const PORT = process.env.PORT || 5000;
app
  .listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  })
  .on("error", (err) => {
    console.log(err);
  });
