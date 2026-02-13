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
    origin: "http://localhost:5173",
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

// models require
let sign = require("./models/signupSchema");

//! Routes
// signup Route
app.post("/user/sign", async (req, res) => {
  let { userName, userEmail, userPhone, userPassword } = req.body;
  let encryptPassword = await bcrypt.hash(userPassword, 10);
  if (!encryptPassword) return res.status(500).json("not encrypted password");
  try {
    let signupStore = await sign.create({
      name: userName,
      email: userEmail,
      phone: userPhone,
      password: encryptPassword,
    });

    let token = jwt.sign({ userToken: userEmail }, process.env.JWT_SECRET, {
      expiresIn: "2h",
    });
    if (!token) return res.status(500).json("token not genrated");

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      path: "/",
    });
    res.status(200).json(signupStore, { tokenhai: token });
  } catch (error) {
    console.log(error, "please check");
    if (error.errorResponse.code == 11000) {
      res.status(404).json({ message: "already exist" });
    }
  }
});
// login Route
app.post("/user/login", async (req, res) => {
  try {
    let { userEmail, userPassword } = req.body;
    let userProfile = await sign.findOne({ email: userEmail });
    let dcrypt_password = await bcrypt.compare(
      userPassword,
      userProfile.password,
    );
    if (!dcrypt_password)
      return res.status(404).json({ message: "wrong password" });

    let token = jwt.sign({ userToken: userEmail }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    if (!token) return res.status(500).json({ message: "token not genrated" });
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none",
      path: "/",
    });
    console.log(userProfile);
    console.log(dcrypt_password);
    console.log(token);

    res.status(200).json({ message: "validation successfull" });
  } catch (error) {
    console.log(error);
  }
});
//? auth middleware

let authMiddle = (req, res, next) => {
  try {
    let tokenReceive = req.cookies.token;
    let tokenPayload = jwt.verify(tokenReceive, process.env.JWT_SECRET);

    if (!tokenPayload) return res.json("token found it");
    req.user = tokenPayload;
    next();
  } catch (error) {
    console.log("not correct middlware");
    return res.status(401).json({ message: "invalid token" });
  }
};
// homepage data Route
app.get("/", authMiddle, async (req, res) => {
  try {
    let userProfile = await sign.findOne({ email: req.user.userToken });
    console.log(userProfile);
    res.json(userProfile);
  } catch (error) {
    console.log(error);
  }
});

// server
let PORT = 3000;
app.listen(PORT, () => {
  console.log(`listning server on ${PORT}`);
});
