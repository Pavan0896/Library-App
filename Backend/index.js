const express = require("express");
const connection = require("./Config/db");
const userRouter = require("./Routes/user.route");
const bookRouter = require("./Routes/books.route");
const reviewRouter = require("./Routes/review.route");
require("dotenv").config();
const port = process.env.PORT;

const app = express();
app.use(express.json());
app.use("/user", userRouter);
app.use("/library", bookRouter);
app.use("/bookReview", reviewRouter);

app.get("/", (req, res) => {
  res.send("Health check is fine");
});

app.listen(port, async () => {
  await connection;
  console.log(`Server is running in port ${port} and db is also conencted`);
});
