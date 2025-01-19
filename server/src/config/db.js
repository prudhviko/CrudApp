import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("MongoDB connected...");
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

export default connectDB;
