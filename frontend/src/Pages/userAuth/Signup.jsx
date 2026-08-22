import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  ArrowRight,
  WalletCards,
} from "lucide-react";

function Signup() {
  const apiUrl = import.meta.env.VITE_SERVER;
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm();

  const signup = async (data) => {
    try {
      setLoading(true);

      const userSignup = await axios.post(
        `${apiUrl}/api/auth/signup`,
        data,
        { withCredentials: true },
      );

      console.log(userSignup);
      reset();
      navigate("/");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle =
    "w-full h-12 sm:h-13 bg-gray-50 border border-gray-200 rounded-xl pl-11 pr-4 text-sm sm:text-base outline-none transition-all duration-200 placeholder:text-gray-400 focus:bg-white focus:border-blue-500 focus:ring-4 focus:ring-blue-100";

  return (
    <div className="min-h-screen w-full bg-gray-100 p-3 sm:p-6 lg:p-10 flex items-center justify-center">
      <div className="w-full max-w-6xl min-h-[600px] bg-white rounded-2xl sm:rounded-3xl shadow-2xl overflow-hidden flex">
        
        {/* Left Side - Desktop */}
        <div className="hidden md:flex md:w-[45%] lg:w-1/2 relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-8 lg:p-12 flex-col justify-between">
          
          {/* Background circles */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/10 rounded-full" />
          <div className="absolute -bottom-32 -left-24 w-96 h-96 bg-white/10 rounded-full" />
          <div className="absolute top-1/2 right-10 w-20 h-20 border border-white/20 rounded-full" />

          <div className="relative z-10">
            <div className="flex items-center gap-3 text-white">
              <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md flex items-center justify-center">
                <WalletCards size={24} />
              </div>

              <h1 className="text-2xl font-bold tracking-wide">
                Finance App
              </h1>
            </div>
          </div>

          <div className="relative z-10 text-white">
            <p className="text-blue-200 font-medium mb-4">
              TAKE CONTROL OF YOUR MONEY
            </p>

            <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
              Start managing your finances smarter.
            </h2>

            <p className="mt-6 text-blue-100 text-base lg:text-lg leading-7 max-w-md">
              Track your income, manage expenses and understand your spending
              habits in one simple place.
            </p>
          </div>

          <div className="relative z-10 flex gap-2">
            <div className="w-8 h-1 rounded-full bg-white" />
            <div className="w-3 h-1 rounded-full bg-white/40" />
            <div className="w-3 h-1 rounded-full bg-white/40" />
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full md:w-[55%] lg:w-1/2 flex items-center justify-center p-5 sm:p-8 md:p-10 lg:p-14">
          <div className="w-full max-w-md">
            
            {/* Mobile Logo */}
            <div className="md:hidden flex items-center justify-center gap-2 mb-7">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center">
                <WalletCards size={21} />
              </div>

              <h1 className="text-xl font-bold text-gray-900">
                Finance App
              </h1>
            </div>

            <div className="mb-7 sm:mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">
                Create an account
              </h2>

              <p className="text-gray-500 mt-2 text-sm sm:text-base">
                Enter your details to start managing your finances.
              </p>
            </div>

            <form
              className="space-y-4"
              onSubmit={handleSubmit(signup)}
            >
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>

                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...register("name", {
                      required: "Name is required",
                    })}
                    className={inputStyle}
                  />
                </div>

                {errors.name && (
                  <p className="text-xs text-red-500 mt-1.5">
                    {errors.name.message}
                  </p>
                )}
              </div>

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
                  <p className="text-xs text-red-500 mt-1.5">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>

                <div className="relative">
                  <Phone
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="tel"
                    placeholder="Enter 10 digit phone number"
                    {...register("phone", {
                      required: "Phone number is required",
                      pattern: {
                        value: /^[0-9]{10}$/,
                        message: "Enter a valid 10 digit phone number",
                      },
                    })}
                    className={inputStyle}
                  />
                </div>

                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1.5">
                    {errors.phone.message}
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
                    placeholder="Create a strong password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                    className={`${inputStyle} pr-12`}
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
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
                  <p className="text-xs text-red-500 mt-1.5">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full h-12 sm:h-13 mt-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-white rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-200 shadow-lg shadow-blue-200"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight size={19} />
                  </>
                )}
              </button>
            </form>

            {/* Login */}
            <p className="mt-6 text-center text-sm sm:text-base text-gray-500">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="font-semibold text-blue-600 hover:text-blue-800 hover:underline transition"
              >
                Login
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;