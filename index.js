import cors from "cors";
import express from "express";
import tmp from "./routes/tmp.js";

const app = express();

const PORT = process.env.PORT || 5000;

//Middleware

app.use(express.json()); // enable json

app.use(cors());

//routes

app.use("/tmp", tmp);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});