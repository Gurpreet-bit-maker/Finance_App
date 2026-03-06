import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContextVarible } from "../../Context/auth/AuthContext";
import { useContext } from "react";
function useValidation() {
  const navigate = useNavigate();
  let { setUser } = useContext(AuthContextVarible);

  let {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  let [loader, setLoader] = useState(false);
  let [otherErrors, setOtherErrors] = useState("");
  let [passwordErr, setPasswordErr] = useState(null);

  // formhook & loader
  const signup_SubmitForm = async (userSignData) => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      reset();
    }, 2000);

    try {
      await axios.post("http://localhost:3000/user/sign", userSignData, {
        withCredentials: true,
      });
      navigate("/");
      // if (res.status === 200) {
      // }
    } catch (error) {
      if (error.response.data.message == "already exist") {
        setOtherErrors("already exist");
      }
    }
  };

  const login_SubmitForm = async (userLogindata) => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
      reset();
    }, 3000);
    try {
      let res = await axios.post(
        "http://localhost:3000/user/login",
        userLogindata,
        { withCredentials: true },
      );
      setUser(res.data);
      navigate("/");
      setPasswordErr(null);
    } catch (error) {
      console.log(error);
      setPasswordErr(error.response.data.message);
    }
  };

  return {
    register,
    handleSubmit,
    errors,
    signup_SubmitForm,
    login_SubmitForm,
    loader,
    otherErrors,
    passwordErr,
  };
}

export default useValidation;
