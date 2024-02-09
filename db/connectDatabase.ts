import mongoose from "mongoose";

const connectDatabase = async () => {
  try {
    const MONGODB_URI = process.env.MONGODB_ATLAS_URI || "";
    const connection = await mongoose.connect(MONGODB_URI, {
      dbName: "internHub",
      bufferCommands: false,
    });

    console.log("Database Connected: ", connection.connection.host);
  } catch (err) {
    console.log("something went wrong while connecting to database");
    console.log(err);
  }
};

export default connectDatabase;
