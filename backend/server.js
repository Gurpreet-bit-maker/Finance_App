// imports
let express = require("express");
let app = express();
let mongoose = require("mongoose");
let cors = require("cors");
let cookieParser = require("cookie-parser");
let bcrypt = require("bcrypt");
let jwt = require("jsonwebtoken");

// dotenv & middlewares
require("dotenv").config();
app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// atlas connecting
let main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected with mongoDb Atlas 👍 ");
  } catch (error) {
    console.log(error);
  }
};
main();
//! Routes
// signup Route
app.post("/user/sign", (req, res) => {
  console.log(req.body);
});

// server
let PORT = 3000;
app.listen(PORT, () => {
  console.log(`listning server on ${PORT}`);
});
