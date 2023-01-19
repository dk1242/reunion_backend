const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

require("dotenv").config();

const userRoutes = require("./routes/userRoutes");
const followRoutes = require("./routes/followRoutes");
const postRoutes = require("./routes/postRoutes");

const app = express();

app.use(express.json());
app.use(cookieParser());

// db
mongoose.set("strictQuery", true);
mongoose.connect(process.env.DATABASE, (err, data) => {
  // console.log(process.env.DATABASE);
  if (err) {
    console.log(err);
  } else console.log("Database connected");
});

app.get("/", (req, res, next) => {
  res.send("Hello Reunion!");
});
app.use("/api", userRoutes);
app.use("/api", followRoutes);
app.use("/api", postRoutes);

const port = process.env.PORT;

// for sending error messages
app.use(function (err, req, res, next) {
  console.error(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});

const server = app.listen(port, function () {
  console.log(`server running on `, port);
});
