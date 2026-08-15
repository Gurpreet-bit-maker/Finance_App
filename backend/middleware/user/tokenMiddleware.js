import jwt from "jsonwebtoken";
export const isValidToken = (req, res, next) => {
  try {
    let token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token not found",
      });
    }
    let decode = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODE:", decode);
    req.user = decode;
    console.log("REQ.USER:", req.user);
    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
