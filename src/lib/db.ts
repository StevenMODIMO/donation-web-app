import { connect } from "mongoose";

export async function dbConnect() {
  try {
    await connect(process.env.MONGO_URI as string);
    console.log("🚀 Database connected");
  } catch (error) {
    console.log(error);
  }
}
