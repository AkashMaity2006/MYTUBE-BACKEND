import mongoose from "mongoose";
const connectDB = async () => {
  try {
    const connectionIntence = await mongoose.connect(
      `${process.env.DATABASE_URI}/${process.env.DB_NAME}`,
    );
    if (connectionIntence) {
      console.log("DATABASE is connected !");
    } else if (!connectionIntence) {
      console.log("DATABASE is not connected ! - 1");
    }
  } catch (err) {
    console.log("DATABASE is not connected ! - 2", err);
  }
};
export { connectDB };
