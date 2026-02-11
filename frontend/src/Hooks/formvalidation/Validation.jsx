import React, { useState } from "react";
import { useForm } from "react-hook-form";

function useValidation() {
  let {
    register,
    handleSubmit,
    reset,

    formState: { errors },
  } = useForm();

  let [loader, setLoader] = useState(false);

  // formhook & loader
  const submitForm = (e) => {
    setLoader(true);
    console.log(e);
    reset();
    setTimeout(() => {
      setLoader(false);
    }, 2000);
  };

  return { register, handleSubmit, errors, submitForm, loader };
}

export default useValidation;
