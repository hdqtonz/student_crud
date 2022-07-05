const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
require("./config/db");

const studentRoutes = require("./routes/student.route");

const app = express();

const Port = process.env.PORT || 3000;

// middlewares
app.use(cors());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// routes
app.use("/", studentRoutes);

// Creating server
app.listen(Port, () => {
  console.log(`Server runing on port ${Port}`);
});
