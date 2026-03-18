import React, { useContext, useEffect, useReducer } from "react";
import { UserRecentTran_Varible } from "../../Context/Transections/Transections";
import useToggle from "../../Hooks/toggle/Toggle";

function Filter({ filterFunc }) {
  let { recentTransactions } = useContext(UserRecentTran_Varible);
  let { isToggle, setToggle } = useToggle();
  //   console.log(recentTransactions);

  function reducer(state, action) {
    switch (action.type) {
      case "Foods":
        return recentTransactions.filter(
          (element) =>
            element.category == "Foods" && element.typeSource !== "income",
        );
      case "Stationary":
        return recentTransactions.filter(
          (element) =>
            element.category == "Stationary" && element.typeSource !== "income",
        );
        case "Clothes":
          return recentTransactions.filter(
          (element) =>
            element.category == "Clothes" && element.typeSource !== "income",
        );
      case "All":
        return recentTransactions;

      default:
        return state;
    }
  }
  let [state, dispatch] = useReducer(reducer, recentTransactions);
  useEffect(() => {
    setTimeout(() => {
      filterFunc(state);
    }, 500);
  }, [state]);

  return (
    <>
      <button
        onClick={() => setToggle(!isToggle)}
        className="flex items-center relative gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl shadow-md hover:bg-indigo-700 active:scale-95 transition"
      >
        <span>🔽</span>
        Filter{" "}
        {isToggle ? (
          <div className="absolute top-10 right-5 p-2 bg-black text-white rounded-md">
            <p
              onClick={() => dispatch({ type: "Foods" })}
              className=" p-1 active:bg-red-400 text-[12px] tracking-wider"
            >
              Foods
            </p>
            <p
              onClick={() => dispatch({ type: "Stationary" })}
              className=" p-1 active:bg-red-400 text-[12px] tracking-wider"
            >
              Stationary
            </p>
            <p
              onClick={() => dispatch({ type: "Clothes" })}
              className=" p-1 active:bg-red-400 text-[12px] tracking-wider"
            >
              Clothes
            </p>
            <p
              onClick={() => dispatch({ type: "All" })}
              className=" p-1 active:bg-red-400 text-[12px] tracking-wider"
            >
              All
            </p>
          </div>
        ) : (
          ""
        )}
      </button>
    </>
  );
}

export default Filter;

//   let foodTransections = recentTransactions.filter(
//     (element) => element.category == "Foods" && element.typeSource !== "income",
//   );
