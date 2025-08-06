const mongoose = require("mongoose");
require("dotenv").config();

// const mongoURl = process.env.mongoURl_local;
const mongoURl = process.env.mongoURl;

mongoose.connect(mongoURl, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to MongoDB server");
});
db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.on("disconnected", () => {
  console.log("MongoDB disconnected");
});

module.exports = db;
