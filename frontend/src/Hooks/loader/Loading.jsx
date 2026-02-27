import React from "react";
import { useState } from "react";

function useLoading() {
  let [loader, setLoader] = useState(false);
  return { loader, setLoader };
}

export default useLoading;
