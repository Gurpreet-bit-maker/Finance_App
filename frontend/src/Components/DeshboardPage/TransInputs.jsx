import React from "react";

function AddTran({
  typeSourceFunc,
  categoryFunc,
  amountFunc,
  typeSourceState,
  categoryState,
  amountState,
}) {
  return (
    <div className="flex gap-1 w-full ">
      <div className="w-fit text-sm border">
        <select
          value={typeSourceState}
          name="typeSource"
          onChange={(event) => typeSourceFunc(event.target.value)}
        >
          <option value="none">choose</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>
      </div>
      <div className="w-fit text-sm border">
        <select
          className="w-30"
          value={categoryState}
          name="category"
          onChange={(event) => categoryFunc(event.target.value)}
        >
          <option value="none">choose</option>
          <option value="Cloths">Cloths</option>
          <option value="Foods">Foods</option>
          <option value="Stationary">Stationary</option>
        </select>
      </div>
      <div className="w-fit text-sm border">
        <input
          className="w-30"
          type="number"
          placeholder="enter amount"
          onChange={(event) => amountFunc(event.target.value)}
          value={amountState}
        />
      </div>
    </div>
  );
}

export default AddTran;
