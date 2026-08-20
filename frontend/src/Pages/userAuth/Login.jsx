import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";



export default function Login() {
  const apiUrl = import.meta.env.VITE_SERVER
  // todo pending setErrorByApip
  const [errorByApi, setErrorByApi] = useState("")
  let navigate = useNavigate();

  let {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const loginFunc = async (data) => {
    console.log("FORM DATA:", data);

    try {
      console.log("API CALL START");

      const res = await axios.post(
        `${apiUrl}/api/auth/login`,
        data,
        { withCredentials: true }
      );
      console.log("LOGIN SUCCESS:", res.data);
      reset();
      navigate("/");
    } catch (error) {
      console.log(
        "LOGIN ERROR:",
        error.response?.data || error.message
      );

      setErrorByApi(
        error.response?.data?.message || "Something went wrong"
      );
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-200 ">
        <div className="bg-white p-8 m-2 rounded-xl shadow-lg w-full max-w-md">
          <h2 className="text-xl font-bold mb-6 text-center text-gray-800">
            Finance App Login
          </h2>

          <form onSubmit={handleSubmit(loginFunc)} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              {...register("email", { required: "Email Required" })}
              className="w-full p-2 border text-md border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.email && (
              <p className="text-center text-red-500 text-sm font-medium">
                {errors.email.message}
              </p>
            )}

            <input
              type="password"
              placeholder="Password"
              {...register("password", { required: "Password Required" })}
              className="w-full p-2 border text-md border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            {errors.password && (
              <p className="text-center text-red-500 text-sm font-medium">
                {errors.password.message}
              </p>
            )}

            {errorByApi && (
              <p className="text-center text-red-600 text-sm font-medium">
                {errorByApi}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors flex justify-center items-center"
            >
              Submit
            </button>
          </form>

          <p className="mt-5 text-center text-gray-600  text-sm">
            Don't have an account?{" "}
            <span
              onClick={() => navigate("/signup")}
              className="text-blue-600 font-medium cursor-pointer hover:underline text-sm"
            >
              Sign Up
            </span>
          </p>
        </div>
      </div>
    </>
  );
}
