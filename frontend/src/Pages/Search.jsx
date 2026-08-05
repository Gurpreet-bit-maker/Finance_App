import axios from "axios";
import React, { useEffect, useState } from "react";
import QuickFilter from "../Components/SearchPage/QuickFilter";
import { Search, Sparkles } from "lucide-react";

function SearchPage() {
  const [promptValue, setPrompvalue] = useState("");
  const [food, setFoodValue] = useState("");
  const [thisMonth, setThisMonth] = useState("");
  const [filtereData, setFilterData] = useState([]);
  const [loading, setLoading] = useState(false);

  const sendPromptToGemini = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/api/user/ai",
        {
          promptValue,
        },
        { withCredentials: true },
      );
      setLoading(false);
      setPrompvalue("");
      console.log(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  //* food and this-month btn query api
  const sendQuickFilter = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3000/api/user/search?category=${food}&date=${thisMonth}`,
        { withCredentials: true },
      );

      console.log(res.data);

      if (res.data.expenses !== undefined) {
        setFilterData(res.data?.expenses);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    sendQuickFilter();
    console.log(filtereData);
  }, [food, thisMonth]);

  return (
    <div className="px-4" style={{ paddingBottom: "100px" }}>
      {/* ai search */}
      <br />
      <div className="w-full rounded-3xl border border-gray-200 bg-white p-5 shadow-sm">
        {/* Search Box */}
        <div className="flex items-center rounded-2xl border-4 border-blue-500 px-4 py-3">
          <Search className="text-gray-400" size={30} />

          <input
            type="text"
            value={promptValue}
            onChange={(e) => setPrompvalue(e.target.value)}
            placeholder="Show coffee expenses this month"
            className="mx-3 flex-1 bg-transparent text-lg font-medium outline-none placeholder:text-gray-500 border-none  "
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

          <div className="flex flex-wrap gap-3">
            {[
              '"Transport costs over $50"',
              '"All food purchases last week"',
              '"Credit card expenses today"',
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => setPrompvalue(item)}
                className="rounded-2xl border border-blue-300 bg-blue-50 px-5 py-3 text-sm font-medium text-blue-700 transition hover:bg-blue-100 sm:text-base"
              >
                {item}
              </button>
            ))}
          </div>

          {/* AI Button */}
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
      {/* quick filter */}
      <div>
        <QuickFilter setFoodValue={setFoodValue} setThisMonth={setThisMonth} />
      </div>
      {/* filter results ui */}
      <div className="mt-8 space-y-5">
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
                {/* Icon */}
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-3xl sm:h-20 sm:w-20 sm:text-4xl">
                  ☕
                </div>

                {/* Details */}
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
    </div>
  );
}

export default SearchPage;
