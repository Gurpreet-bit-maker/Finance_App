import userSchema from "../../../models/userSchema.js";
export const logout = async (req, res) => {
  try {
    let user = await userSchema.findById(req.user.userId);
    user.isVerify = false;
    await user.save();

    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      path: "/",
    });

    return res.status(200).json({
      message: "Logout successfully",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
