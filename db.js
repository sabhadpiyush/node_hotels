const mongoose = require("mongoose");

const mongoURl = "mongodb://127.0.0.1:27017/hotels";

mongoose.connect(mongoURl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to MongoDB server");
});

db.on("error", () => {
  console.error(" MongoDB connection error:", err);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = db;
