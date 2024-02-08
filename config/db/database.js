const mongoose = require("mongoose");
const { MONGODB_URI } = require("..");

const dbConnect = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
module.exports = dbConnect;
