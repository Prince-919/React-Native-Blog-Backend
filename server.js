const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { PORT } = require("./config");
const dbConnect = require("./config/db/database");

const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// routes
app.use("/api/v1", require("./routes"));

// get all
app.get("/", (req, res) => {
  res.status(200).send({
    success: true,
    message: "Fetched all posts successfully",
  });
});

const serverStart = async () => {
  try {
    await dbConnect();
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

serverStart();
