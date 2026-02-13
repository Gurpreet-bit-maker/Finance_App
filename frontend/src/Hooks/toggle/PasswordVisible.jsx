import React, { useState } from "react";

function usePasswordVisible(initial = false) {
  let [isToggle, setToggle] = useState(initial);
  let showHide_password = () => {
    setToggle((prev) => !prev);
  };

  return { isToggle, showHide_password };
}

export default usePasswordVisible;
