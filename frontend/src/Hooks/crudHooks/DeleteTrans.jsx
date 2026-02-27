import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { UserTransectionsVarible } from "../../Context/Transections/SummeryContext";
import { useContext } from "react";

function useDeleteTrans() {
  let { setToggle } = useContext(UserTransectionsVarible);
  let [del_id, setdel_id] = useState("");

  useEffect(() => {
    let deleteItemFunc = async () => {
      if (del_id == "") return false;
      try {
        await axios.delete(`http://localhost:3000/transections/${del_id}`);
        setToggle((prev) => !prev);
      } catch (error) {
        console.log(error);
      }
    };
    deleteItemFunc();
  }, [del_id]);

 
  return { del_id, setdel_id };
}

export default useDeleteTrans;
