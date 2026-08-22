import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  WalletCards,
  ShieldCheck,
} from "lucide-react";

import { AuthCreateVarible } from "../../Context/auth/AuthContext";

export default function Login() {
  const apiUrl = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();

  const { checkAuth } = useContext(AuthCreateVarible);

  const [errorByApi, setErrorByApi] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const loginFunc = async (data) => {
    try {
      setLoading(true);
      setErrorByApi("");

      const res = await axios.post(
        `${apiUrl}/api/auth/login`,
        data,
        {
          withCredentials: true,
        },
      );

      console.log("LOGIN SUCCESS:", res.data);

      reset();

      await checkAuth();

      navigate("/");
    } catch (error) {
      console.log(
        "LOGIN ERROR:",
        error.response?.data || error.message,
      );

      setErrorByApi(
        error.response?.data?.message ||
        "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full h-12 sm:h-13 bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 text-sm sm:text-base outline-none transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <div className="min-h-screen w-full bg-gray-100 p-3 sm:p-6 lg:p-10 flex items-center justify-center">
      <div className="w-full max-w-6xl min-h-[580px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex">

        {/* Left Section - Desktop */}
        <div className="hidden md:flex md:w-[45%] lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-8 lg:p-12 flex-col justify-between">

          {/* Background Design */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full" />

          <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-white/10 rounded-full" />

          <div className="absolute top-1/2 right-10 w-24 h-24 border border-white/10 rounded-full" />

          {/* Logo */}
          <div className="relative z-10 flex items-center gap-3 text-white">
            <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center">
              <WalletCards size={24} />
            </div>

            <h1 className="text-xl lg:text-2xl font-bold">
              Finance App
            </h1>
          </div>

          {/* Main Content */}
          <div className="relative z-10 text-white">
            <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center mb-6">
              <ShieldCheck size={26} />
            </div>

          

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Your finances, all in one place.
            </h2>

            <p className="mt-6 text-blue-100 text-base lg:text-lg leading-7 max-w-md">
              Log in to track your expenses, monitor your income and stay in
              control of your money.
            </p>
          </div>

          {/* Bottom Indicator */}
          <div className="relative z-10 flex gap-2">
            <div className="w-8 h-1 rounded-full bg-white" />
            <div className="w-3 h-1 rounded-full bg-white/40" />
            <div className="w-3 h-1 rounded-full bg-white/40" />
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full md:w-[55%] lg:w-1/2 flex items-center justify-center p-5 sm:p-8 md:p-10 lg:p-14">
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="md:hidden flex items-center justify-center gap-2 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <WalletCards size={21} />
              </div>

              <h1 className="text-xl font-bold text-gray-900">
                Finance App
              </h1>
            </div>

            {/* Heading */}
            <div className="mb-7 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Welcome back
              </h2>

              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                Enter your details to access your account.
              </p>
            </div>

            <form
              onSubmit={handleSubmit(loginFunc)}
              className="space-y-5"
            >
              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>

                <div className="relative">
                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    placeholder="Enter your email"
                    {...register("email", {
                      required: "Email is required",
                    })}
                    className={inputStyle}
                  />
                </div>

                {errors.email && (
                  <p className="text-sm text-red-500 mt-1.5">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                    className={`${inputStyle} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-blue-600 transition"
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>

                {errors.password && (
                  <p className="text-sm text-red-500 mt-1.5">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* API Error */}
              {errorByApi && (
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl text-sm">
                  <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
                  {errorByApi}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 sm:h-13 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-200"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Logging in...
                  </>
                ) : (
                  <>
                    Login
                    <ArrowRight size={19} />
                  </>
                )}
              </button>
            </form>

            {/* Signup */}
            <p className="mt-7 text-center text-sm sm:text-base text-gray-500">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/signup")}
                className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition"
              >
                Create account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}