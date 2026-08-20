import axios from "axios";
import React, { useEffect, useState } from "react";
import { Sparkles, IndianRupee, ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import QuickFilter from "../Components/SearchPage/QuickFilter";
import NoFoundExpense from "../Components/SearchPage/NoFoundExpense";
import Navbar from "../Components/BottomNav/Navbar"
import { useNavigate } from "react-router-dom";


function SearchPage() {
  // STATES
  const navigate = useNavigate();

  const apiUrl = import.meta.env.VITE_SERVER
  const [promptValue, setPromptValue] = useState("");
  const [aiResponse, setAiResponse] = useState("");

  const [food, setFoodValue] = useState(
    () => sessionStorage.getItem("searchCategory") || "",
  );

  const [thisMonth, setThisMonth] = useState(
    () => sessionStorage.getItem("searchMonth") || "",
  );

  const [thisWeek, setThisWeek] = useState(
    () => sessionStorage.getItem("searchWeek") || "",
  );

  const [over2k, setOver2k] = useState(
    () => sessionStorage.getItem("searchAmount") || "",
  );

  const [filtereData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [msgByApi, setMsgByApi] = useState("");

  // =========================
  // AI SEARCH
  // =========================

  const typeAIResponse = (text) => {
    setAiResponse("");

    let index = 0;

    const interval = setInterval(() => {
      setAiResponse(text.slice(0, index));

      index++;

      if (index > text.length) {
        clearInterval(interval);
      }
    }, 20);
  };

  const sendPromptToGemini = async () => {
    try {
      setLoading(true);

      const res = await axios.post(
        `${apiUrl}/api/user/ai`,
        {
          userPrompt: promptValue,
        },
        {
          withCredentials: true,
        },
      );

      console.log(res.data.message);
      typeAIResponse(res.data.message);
      setPromptValue("");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // QUICK FILTER SEARCH
  // =========================

  const sendQuickFilter = async () => {
    try {
      const res = await axios.get(
        `${apiUrl}/api/user/search?category=${food}&thisMonth=${thisMonth}&thisWeek=${thisWeek}&overAmount=${over2k}`,
        {
          withCredentials: true,
        },
      );

      console.log(res.data);

      if (res.data.expenses?.length > 0) {
        setFilterData(res.data.expenses);
        setMsgByApi(res.data.message);
        setErrorMsg("");
      } else {
        setFilterData([]);
      }
    } catch (error) {
      setFilterData([]);

      setErrorMsg(
        error.response?.data?.message ||
        "Something went wrong while searching.",
      );
    }
  };

  // =========================
  // RUN SEARCH WHEN FILTER CHANGES
  // =========================

  useEffect(() => {
    sendQuickFilter();
  }, [food, thisMonth, thisWeek, over2k]);

  useEffect(() => {
    console.log(aiResponse);
  }, []);
  //* total amount
  const totalExpense = filtereData.reduce((acc, current) => {
    return current.finalAmount > 0 ? acc + current.finalAmount : 0;
  }, 0);
  // console.log(totalExpense);

  // =========================
  // UI
  // =========================
  console.log(msgByApi);
  return (
    <div className=" px-4 lg:mx-auto lg:max-w-6xl xl:max-w-7xl" style={{ paddingBottom: "100px" }}>
      {/* =========================
          AI SEARCH
      ========================= */}
      <br />
      <div className="flex gap-x-5 items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full border border-gray-300 bg-white hover:bg-gray-100 transition"
        >
          <ArrowLeft size={24} />
        </button>{" "}
        <h1>Search</h1>
      </div>
      <br />
      <div className="w-full lg:max-w-5xl lg:mx-auto">
        {/* Search Box */}

        <div className="flex items-center rounded-2xl border-2 border-blue-500 p-3">
          <input
            type="text"
            value={promptValue}
            onChange={(e) => setPromptValue(e.target.value)}
            placeholder="Show coffee expenses this month"
            className="mx-3 flex-1 border-none bg-transparent text-lg font-medium outline-none placeholder:text-gray-500"
          />

          <button onClick={sendPromptToGemini}>
            <Sparkles size={30} className="text-blue-600" />
          </button>
        </div>

        {/* Suggestions */}

        <div className="mt-6">
          <div className="mb-4 flex items-center gap-2">
            <Sparkles className="text-blue-600" size={20} />

            <h2 className="text-xl font-semibold text-gray-700">
              Try natural language:
            </h2>
          </div>

          {/* Suggestion Buttons */}

          <div className="flex flex-wrap gap-3">
            {[
              "Transport costs over 1000",
              "All food purchases last week",
              "Phone pay expenses today",
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => setPromptValue(item)}
                className="rounded-2xl border border-blue-300 bg-blue-50 px-5 py-3 text-sm font-medium text-blue-700 transition hover:bg-blue-100 sm:text-base"
              >
                {item}
              </button>
            ))}
            {/* ai ui with markDown */}
            <div className="w-full max-w-full overflow-hidden rounded-xl bg-black/60 text-white p-4 text-sm leading-6 sm:p-5 sm:text-base">
              <div className="prose prose-sm sm:prose-base max-w-none wrap-break-word">
                <ReactMarkdown
                  components={{
                    p: ({ children }) => (
                      <p className="mb-3 last:mb-0">{children}</p>
                    ),

                    ul: ({ children }) => (
                      <ul className="mb-3 ml-5 list-disc space-y-1">
                        {children}
                      </ul>
                    ),

                    ol: ({ children }) => (
                      <ol className="mb-3 ml-5 list-decimal space-y-1">
                        {children}
                      </ol>
                    ),

                    li: ({ children }) => (
                      <li className="wrap-break-word">{children}</li>
                    ),

                    strong: ({ children }) => (
                      <strong className="font-semibold">{children}</strong>
                    ),

                    h1: ({ children }) => (
                      <h1 className="mb-3 text-lg font-bold sm:text-xl">
                        {children}
                      </h1>
                    ),

                    h2: ({ children }) => (
                      <h2 className="mb-2 text-base font-bold sm:text-lg">
                        {children}
                      </h2>
                    ),

                    h3: ({ children }) => (
                      <h3 className="mb-2 font-semibold">{children}</h3>
                    ),
                  }}
                >
                  {aiResponse}
                </ReactMarkdown>
              </div>
            </div>
          </div>

          {/* Ask AI Button */}

          <button
            onClick={sendPromptToGemini}
            disabled={loading}
            className="mt-6 flex items-center gap-2 rounded-xl border border-blue-400 px-5 py-2 text-lg font-semibold text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Sparkles size={20} />

            {loading ? "AI Processing..." : "Ask AI"}
          </button>
        </div>
      </div>

      <br />

      {/* =========================
          QUICK FILTER
      ========================= */}

      <div className="w-full lg:max-w-5xl lg:mx-auto rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <QuickFilter
          setFoodValue={setFoodValue}
          setThisMonth={setThisMonth}
          setThisWeek={setThisWeek}
          setOver2k={setOver2k}
        />
      </div>

      <br />

      {/* =========================
          RESULTS HEADER
      ========================= */}

      <div className="mb-6 flex w-full lg:mx-auto lg:max-w-5xl gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="pl-2 text-2xl font-bold text-gray-900 sm:text-3xl">
          {errorMsg ? 0 : filtereData.length} Results
        </h2>

        <span className="w-fit rounded-full bg-indigo-100 px-4 py-2 text-sm font-semibold text-indigo-700">
          Filtered
        </span>
      </div>

      {/* =========================
          ERROR MESSAGE
      ========================= */}

      {errorMsg ? (
        <div className="mt-5 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4">
          <div className="mt-0.5 text-xl">⚠️</div>

          <div>
            <h3 className="font-semibold text-red-700">
              Invalid Filter Selection
            </h3>

            <p className="mt-1 text-sm text-red-600">{errorMsg}</p>
          </div>
        </div>
      ) : (
        /* =========================
           EXPENSE LIST
        ========================= */

        <div className="mt-8 space-y-5  lg:max-w-5xl lg:mx-auto">
          {filtereData.map((item, index) => {
            const date = new Date(item.date).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            });

            return (
              <div
                key={index}
                className="flex flex-col gap-5 rounded-3xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row sm:items-center sm:justify-between"
              >
                {/* Left Side */}

                <div className="flex items-center gap-4">

                  {/* Expense Details */}

                  <div className="min-w-0">
                    <h2 className="truncate text-xl font-bold text-gray-900 sm:text-3xl">
                      {item.subCategory}
                    </h2>

                    <div className="mt-3 flex flex-wrap items-center gap-2 text-sm text-gray-500 sm:text-lg">
                      <span className="rounded-full border border-gray-300 px-3 py-1 text-xs font-semibold text-black sm:text-sm">
                        {item.category}
                      </span>

                      <span>•</span>

                      <span>{item.paymentMode}</span>

                      <span>•</span>

                      <span>{date}</span>
                    </div>
                  </div>
                </div>

                {/* Amount */}

                <div className="self-end sm:self-auto">
                  <h2 className="text-2xl font-bold text-gray-900 sm:text-4xl">
                    -₹{item.finalAmount}
                  </h2>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* =========================
          NO EXPENSE FOUND
      ========================= */}
      <br />
      <div className="w-full lg:max-w-5xl lg:mx-auto rounded-2xl border border-gray-700 bg-gray-800 p-5 shadow-md sm:p-6">
        <div className="flex min-w-0 items-start justify-between gap-4">
          {/* Left Content */}
          <div className="min-w-0">
            <h2 className="truncate text-lg font-semibold text-white sm:text-xl">
              Total {msgByApi}
            </h2>

            <p className="mt-3 text-base text-gray-300 sm:text-lg">
              <span>{filtereData.length}</span> transactions
            </p>
          </div>

          {/* Right Amount */}
          <div className="flex shrink-0 items-center gap-1 text-xl font-bold text-white sm:text-2xl md:text-3xl">
            <IndianRupee className="h-5 w-5 shrink-0 sm:h-6 sm:w-6" />
            <span className="truncate">{totalExpense}</span>
          </div>
        </div>
      </div>
      {filtereData.length === 0 && !errorMsg && <NoFoundExpense />}
      <Navbar />

    </div>
  );
}

export default SearchPage;
