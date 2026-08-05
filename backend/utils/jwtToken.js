import jwt from "jsonwebtoken";
import userSchema from "../models/userSchema.js";
const createJwtToken = async (email) => {
  try {
    let user = await userSchema.findOne({ email: email });
    let token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "20h",
    });
   

    return token;
  } catch (error) {
    console.log(error);
  }
};

export default createJwtToken;
