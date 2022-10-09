import cors from "cors";
import express from "express";
import posts from "./routes/posts/posts.js";
import users from "./routes/users/users.js";
import packages from "./routes/packages/packages.js";

const app = express();

const PORT = process.env.PORT || 5000;

//Middleware

app.use(express.json()); // enable json

app.use(cors());

//routes

app.use("/posts", posts);

app.use("/users", users);

app.use("/packages", packages);


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});