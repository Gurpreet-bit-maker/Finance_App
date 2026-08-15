import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendingOtp = async (email, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Finance App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}`,
    });

    console.log("OTP sent:", info.messageId);
  } catch (error) {
    console.error("Error while sending email:", error);
    throw error;
  }
};

export default sendingOtp;
