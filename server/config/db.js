const mongoose = require("mongoose");

const connetDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("Mongo connection error", error.message);
    process.exit(1);
  }
};

module.exports = connetDB;
