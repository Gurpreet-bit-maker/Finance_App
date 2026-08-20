import userSchema from "../../../models/userSchema.js";
import bcrypt from "bcrypt";
import tokenFunction from ".././../../utils/jwtToken.js";
export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "emain and password required" });

    const user = await userSchema.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "User Not Found" });

    let verifyPassword = await bcrypt.compare(password, user.password);
    if (!verifyPassword)
      return res.status(400).json({ message: "Password error" });

    const token = await tokenFunction(email);
    if (!token) return res.json({ message: "token not genrated" });
    //* sending otp on email
    // let randomNum = Math.floor(Math.random() * 900000) + 100000;
    // console.log(randomNum);
    // await sendingOtp(email, randomNum);

    user.isVerify = true;
    await user.save();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return res.status(200).json({ message: "Successfully Login", token });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "otp server error" });
  }
};
