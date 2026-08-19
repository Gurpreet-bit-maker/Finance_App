// imports
import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectionDb from "./config/lib.js";

const app = express();
connectionDb();

// dotenv & middlewares
app.use(
  cors({
    origin: "https://finance-app-five-snowy.vercel.app",
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// USER ROUTES
import signupRoute from "./routes/users/auth/signupRoute.js";
import loginRoute from "./routes/users/auth/loginRoute.js";
import transections from "./routes/users/transections/transectionRoute.js";
import search from "./routes/users/transections/search.js";

//! Routes
// signup Route
app.use("/", signupRoute);
app.use("/", loginRoute);
app.use("/", transections);
app.use("/", search);

// login Route
// app.post("/user/login", async (req, res) => {
//   try {
//     let { userEmail, userPassword } = req.body;
//     let userProfile = await sign.findOne({ email: userEmail });
//     let dcrypt_password = await bcrypt.compare(
//       userPassword,
//       userProfile.password,
//     );
//     if (!dcrypt_password)
//       return res.status(404).json({ message: "wrong password" });

//     let token = jwt.sign({ userToken: userEmail }, process.env.JWT_SECRET, {
//       expiresIn: "2h",
//     });
//     if (!token) return res.status(500).json({ message: "token not genrated" });
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       path: "/",
//     });
//     console.log(userProfile);
//     console.log(dcrypt_password);
//     console.log(token);

//     res.status(200).json({ message: "validation successfull" });
//   } catch (error) {
//     console.log(error);
//   }
// });
// // logout Route
// app.get("/user/logout", async (req, res) => {
//   console.log(req.cookies.token);
//   res.clearCookie("token", { path: "/", sameSite: "lax", httpOnly: true });
//   res.json("removed cookie");
// });

// //? auth middleware
// let authMiddle = (req, res, next) => {
//   try {
//     let tokenReceive = req.cookies.token;
//     let tokenPayload = jwt.verify(tokenReceive, process.env.JWT_SECRET);

//     if (!tokenPayload) return res.json("token found it");
//     req.user = tokenPayload;
//     next();
//   } catch (error) {
//     console.log("not correct middlware");
//     return res.status(401).json({ message: "invalid token" });
//   }
// };

// //* user Profile
// app.get("/user/profile", authMiddle, async (req, res) => {
//   try {
//     let userProfile = await sign.findOne({ email: req.user.userToken });
//     res.json(userProfile);
//   } catch (error) {
//     console.log(error);
//   }
// });
// // get all transections✅
// app.get("/transections", authMiddle, async (req, res) => {
//   try {
//     let userData = await incomeModel.find({ usertoken: req.user.userToken });
//     res.json(userData);
//   } catch (error) {
//     console.log(error);
//   }
// });
// // post transection✅
// app.post("/transections", authMiddle, async (req, res) => {
//   let data = await incomeModel.find();

//   if (data.length == 0 && req.body.typeSource == "expense")
//     return res.status(403).json("Store income");
//   try {
//     let storeIncome = await incomeModel.create({
//       ...req.body,
//       usertoken: req.user.userToken,
//     });
//     // console.log(storeIncome); //! yaha data store ho rha h
//     res.json(storeIncome);
//   } catch (error) {
//     console.log(error);
//   }
// });
// // get by quary transection
// app.get("/transectionsQuery", authMiddle, async (req, res) => {
//   console.log(req.query.typeSource);
//   try {
//     let userData = await incomeModel.find({
//       typeSource: req.query.typeSource,
//       usertoken: req.user.userToken,
//     });
//     let totalAmount = userData.reduce((acc, current) => {
//       return acc + current.amount;
//     }, 0);
//     console.log(totalAmount);

//     res.status(200).json(totalAmount);
//   } catch (error) {
//     console.log(error);
//   }
// });
// // delete transection
// app.delete("/transections/:id", async (req, res) => {
//   let id = req.params.id;
//   try {
//     let deletedTrans = await incomeModel.findByIdAndDelete({ _id: id });
//     console.log(deletedTrans);
//     res.json(deletedTrans);
//   } catch (error) {
//     console.log(error);
//     res.json("error");
//   }
// });
// //! edit transection pending
// app.patch("/user/transection/:id", (req, res) => {
//   console.log("working edit api");
//   res.send("working edit");
// });
// // delete all transections
// app.get("/transections/del/", authMiddle, async (req, res) => {
//   try {
//     let deleteAllTransections = await incomeModel.deleteMany({
//       usertoken: req.user.userToken,
//     });

//     res.json(deleteAllTransections);
//   } catch (error) {
//     console.log(error);
//   }
// });

// USER ROUTES

// server
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Listening server on ${PORT}`);
});
