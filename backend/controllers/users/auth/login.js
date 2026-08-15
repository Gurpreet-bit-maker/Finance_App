import userSchema from "../../../models/userSchema.js";
import sendingOtp from "../../../utils/nodemailer.js";
import bcrypt from "bcrypt";
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body.data;
    if (!email || !password)
      return res.status(400).json({ message: "emain and password required" });

    const user = await userSchema.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User Not Found" });

    console.log(user);
    let verifyPassword = await bcrypt.compare(password, user.password);
    console.log(verifyPassword);
    if (!verifyPassword)
      return res.status(400).json({ message: "Password error" });
    //* sending otp on email
    let randomNum = Math.floor(Math.random() * 900000) + 100000;
    console.log(randomNum);
    await sendingOtp(email, randomNum);

    user.otp = randomNum;
    user.isVerify = false;
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000);
    await user.save();

    return res.status(200).json({ message: "sent otp on mail" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "otp server error" });
  }
};
