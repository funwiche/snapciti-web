import mongoose from "mongoose";
// MongoDB Connection
export default defineNitroPlugin(() => {
  mongoose.set("strictQuery", true);
  mongoose.connect(process.env.DB_URL as string);
  const db = mongoose.connection;
  db.on("error", console.error);
  db.once("open", () => console.log("Connected to Database..."));
});
