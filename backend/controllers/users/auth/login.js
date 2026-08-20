import userSchema from "../../../models/userSchema.js";
import bcrypt from "bcrypt";
import tokenFunction from "../../../utils/jwtToken.js";

export const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password required",
      });
    }

    const user = await userSchema.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User Not Found",
      });
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return res.status(400).json({
        message: "Password error",
      });
    }

    const token = await tokenFunction(email);

    if (!token) {
      return res.status(500).json({
        message: "Token not generated",
      });
    }

    user.isVerify = true;
    await user.save();

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      message: "Successfully Login",
      token,
    });
  } catch (error) {
    console.log("LOGIN ERROR:", error);

    return res.status(500).json({
      message: "Login server error",
    });
  }
};
