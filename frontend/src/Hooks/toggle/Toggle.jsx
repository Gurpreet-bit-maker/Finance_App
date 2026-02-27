import React from "react";
import { useState } from "react";

function useToggle() {
  let [isToggle, setToggle] = useState(false);
  return { isToggle, setToggle };
}

export default useToggle;
