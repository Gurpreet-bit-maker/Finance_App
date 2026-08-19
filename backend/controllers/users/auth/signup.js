import bcryptFunction from "../../../utils/bcryptPassword.js";
import userSchema from "../../../models/userSchema.js";
import sendingOtp from "../../../utils/nodemailer.js";

export const signup = async (req, res) => {
  let { name, email, phone, password } = req.body;
  console.log(req.body);
  let encryptPassword = await bcryptFunction(password);
  if (!encryptPassword) return res.status(500).json("not encrypted password");
  console.log(req.body);

  //* otp genrate and send to email
  let randomNum = Math.floor(Math.random() * 900000) + 100000;
  console.log(randomNum);
  await sendingOtp(email, randomNum);

  try {
    let signupStore = await userSchema.create({
      name,
      email,
      phone,
      password: encryptPassword,
      otp: randomNum,
      otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
    });

    res.status(200).json({
      message: "working signup api",
      data: { signupStore },
    });
  } catch (error) {
    console.log(error, "please check");
    if (error.errorResponse.code == 11000) {
      res.status(404).json({ message: "already exist" });
    }
  }
};
