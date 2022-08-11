const express = require("express");
const morgan = require("morgan");
require("express-async-errors");

const dotenv = require("dotenv");
dotenv.config();
// console.log(process.env.MAILTRAP_USER);

require("./db");
const userRouter = require("./routes/user");

const app = express();
app.use(express.json());
app.use(morgan("dev"));
// Splitting Modal and controllers
app.use("/api/user", userRouter);

app.use((err, req, res, next) => {
  console.log("err: ", err.message);
  res.status(500).json({ errpr: err.message });
});

app.listen(8000, () => {
  console.log("Your server is running on PORT localhost:8000");
});
