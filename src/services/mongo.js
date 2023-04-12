// MONGO CONNECT

const mongoose = require("mongoose");

require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL;

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (error) => {
  console.error(error, "ERROR");
});

async function mongoConnect() {
  await mongoose.connect(MONGO_URL);
}

async function mongoDisconect() {
  await mongoose.disconnect();
}

module.exports = {
  mongoConnect,
  mongoDisconect,
};
