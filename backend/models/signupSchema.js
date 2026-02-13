let mongoose = require("mongoose");
let signupSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  password: String,
});

let Sign = mongoose.model("Sign", signupSchema);
module.exports = Sign;
