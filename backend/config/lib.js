import mongoose from "mongoose";

let main = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("connected with mongoDb Atlas 👍 ");
  } catch (error) {
    console.log(error);
  }
};
export default main;
