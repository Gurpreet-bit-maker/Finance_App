let mongoose = require("mongoose");

let transectionSchema = new mongoose.Schema({
  transection: {
    type: String,
    enum: ["income" | "expense"]
  },
});

let Tsection = mongoose.model("Tsection", transectionSchema);

module.exports = Tsection;
