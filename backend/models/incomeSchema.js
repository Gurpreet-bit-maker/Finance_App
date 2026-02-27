let mongoose = require("mongoose");

let schema = new mongoose.Schema({
  typeSource: {
    type: String,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  amount: {
    type: Number,
    require: true,
  },
  usertoken: String,
  date: {
    type: Date,
    default: Date.now,
  },
});

let Income = mongoose.model("Income", schema);
module.exports = Income;
