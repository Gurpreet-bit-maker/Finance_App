import dotenv from "dotenv";
dotenv.config();
import nodemailer from "nodemailer";
console.log(process.env.EMAIL_USER);
console.log(process.env.EMAIL_PASS);

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const msgSendingConnection = async () => {
  try {
    await transporter.verify();
    console.log("Server is ready to take our messages");
  } catch (err) {
    console.error("Verification failed:", err);
  }
};

const sendingOtp = async (email, otp) => {
  try {
    await msgSendingConnection();
    const created = await transporter.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: `Otp Verification `,
      text: `Your Otp Is ${otp}`,
    });
    console.log("sending otp to your email..");
    // console.log(created.messageId);
  } catch (error) {
    console.error("error while sending to email", error);
  }
};

export default sendingOtp;
