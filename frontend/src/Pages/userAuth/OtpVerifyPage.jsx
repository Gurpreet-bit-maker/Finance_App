import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthCreateVarible } from "../../Context/auth/AuthContext";

const OtpVerification = () => {
  const apiUrl = import.meta.env.VITE_SERVER

  let { isUserLogin } = useContext(AuthCreateVarible);
  let navigate = useNavigate();
  let location = useLocation();
  let email = location.state?.email;
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Next input par focus
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const finalOtp = otp.join("");

    if (finalOtp.length !== 6) {
      alert("Please enter 6 digit OTP");
      return;
    }

    console.log("OTP:", finalOtp);

    try {
      const otpVerify = await axios.post(
        `${apiUrl}/api/auth/verify-otp`,
        { otp: finalOtp, email: email },
        { withCredentials: true },
      );
      console.log(otpVerify.data);
      console.log("before");
      const result = await isUserLogin();
      console.log("after", result);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
    // Yahan API call karna
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Verify Your Email
          </h1>

          <p className="text-gray-500 mt-2">
            Enter the 6-digit OTP sent to your email
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8">
          <div className="flex justify-center gap-3">
            {otp.map((digit, index) => (
              <input
                key={index}
                id={`otp-${index}`}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                className="w-12 h-14 text-center text-xl font-semibold border border-gray-300 rounded-lg outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-full mt-8 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Verify OTP
          </button>

          <p className="text-center text-sm text-gray-500 mt-5">
            Didn't receive the OTP?{" "}
            <button
              type="button"
              className="text-blue-600 font-medium hover:underline"
            >
              Resend OTP
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default OtpVerification;
