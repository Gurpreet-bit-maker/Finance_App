// import userSchema from "../../../models/userSchema.js";
// import tokenFunction from "../../../utils/jwtToken.js";
// export const verifyOtp = async (req, res) => {
//   try {
//     let { email, otp } = req.body;
//     if (!email || !otp)
//       return res.status(400).json({ message: "please enter email and OTP " });

//     let user = await userSchema.findOne({
//       email: email,
//     });

//     if (!user) return res.status(404).json({ message: "user not found" });

//     if (Date.now() > user.otpExpiry)
//       return res.status(401).json({ message: "otp is expired" });

//     if (user.otp !== otp)
//       return res.status(400).json({ message: "please enter a valid otp" });
//     // *token generate
//     let token = await tokenFunction(email);
//     if (!token) return res.json({ message: "token not genrated" });

//     user.otp = null;
//     user.isVerify = true;
//     user.otpExpiry = null;
//     await user.save();

//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: true,
//       sameSite: "none",
//       path: "/",
//     });
//     return res
//       .status(201)
//       .json({ message: "sussfully login / signup", token: token });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ message: "server error" }, error);
//   }
// };
