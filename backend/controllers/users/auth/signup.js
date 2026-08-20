import bcryptFunction from "../../../utils/bcryptPassword.js";
import userSchema from "../../../models/userSchema.js";
import tokenFunction from ".././../../utils/jwtToken.js";

export const signup = async (req, res) => {
  let { name, email, phone, password } = req.body;

  let encryptPassword = await bcryptFunction(password);
  if (!encryptPassword) return res.status(500).json("not encrypted password");

  //* otp genrate and send to email
  // let randomNum = Math.floor(Math.random() * 900000) + 100000;
  // console.log(randomNum);
  // // await sendingOtp(email, randomNum);

  try {
    let signupStore = await userSchema.create({
      name,
      email,
      phone,
      password: encryptPassword,
    });

    let token = await tokenFunction(email);
    if (!token) return res.json({ message: "token not genrated" });
    const user = await userSchema.findOne({ email: email });
    
    user.isVerify = true;
    await user.save();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });
    res.status(200).json({
      message: "working signup api",
      signupStore,
    });
  } catch (error) {
    console.log(error, "please check");
    if (error.errorResponse.code == 11000) {
      res.status(404).json({ message: "already exist" });
    }
  }
};
