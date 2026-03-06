import React from "react";
import { AuthContextVarible } from "../../Context/auth/AuthContext";
import { useEffect, useState, useContext } from "react";
import SummuryCard from "./SummuryCard";
import Transections from "./TransUi";
import AddTran from "./TransInputs";
import axios from "axios";
import { UserTransectionsVarible } from "../../Context/Transections/SummeryContext";
import useLoading from "../../Hooks/loader/Loading";

function HomePage() {
  let { loader, setLoader } = useLoading();
  let { user } = useContext(AuthContextVarible);
  let { isToggle, setToggle } = useContext(UserTransectionsVarible);

  // Example props structure
  let [errorDisplay, setErrorDisplay] = useState("");
  let [type, setTypeSource] = useState("expense");
  let [category, setCategory] = useState("cloths");
  let [amount, setAmount] = useState("");
  console.log(errorDisplay);

  // add tran btn
  useEffect(() => {
    if (!isToggle & (amount !== "")) {
      let transectons = {
        typeSource: type,
        category: category,
        amount: amount,
      };
      let sentTransection = async () => {
        try {
          await axios.post("http://localhost:3000/transections", transectons, {
            withCredentials: true,
          });
          setToggle((prev) => !prev);
          setTypeSource("");
          setCategory("");
          setAmount("");
          setErrorDisplay("");
          console.log("sent api ");
        } catch (error) {
          if (error.response.data == "Store income") {
            setErrorDisplay(error.response.data);
          }
        }
      };
      sentTransection();
    }
  }, [isToggle]);

  setTimeout(() => {
    setLoader(true);
  }, 500);
  return loader ? (
    <>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 p-6 md:p-10">
        {/* Top Bar */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h1 className="text-lg font-bold text-slate-800">
            👋 Hello, {user.name}
          </h1>
        </div>

        {/* Summary Cards */}
        <SummuryCard />

        {/* Add Transaction Button */}
        <div className="flex justify-end mb-6">
          <button
            onClick={() => setToggle(!isToggle)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-6 py-2.5 rounded-xl font-semibold shadow-md hover:scale-105 hover:shadow-lg transition"
          >
            + Add Transaction
          </button>
        </div>
        <p className="text-red-500">
          {errorDisplay ? `❌ ${errorDisplay}` : ""}
        </p>
        {isToggle && (
          <AddTran
            typeSourceFunc={setTypeSource}
            categoryFunc={setCategory}
            amountFunc={setAmount}
            typeSourceState={type}
            categoryState={category}
            amountState={amount}
          />
        )}
        {/* Transactions Table */}
        <Transections />
      </div>{" "}
    </>
  ) : (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
    </div>
  );
}

export default HomePage;
