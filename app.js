const express = require("express");
const path = require("path");
const cors = require("cors");
const morgan = require("morgan");
const bodyparser = require("body-parser");
require("dotenv").config();
require("./config/db");

const studentRoutes = require("./routes/student.route");
const CSCRoutes = require("./routes/country-state-city.route");
const fileRoutes = require("./routes/file.route");

const app = express();

const Port = process.env.PORT || 3000;

// middlewares
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.use(cors());
app.use("/files", express.static(path.join("uploads")));
app.use(morgan("dev"));

// routes
app.use("/", studentRoutes);
app.use("/", CSCRoutes);
app.use("/", fileRoutes);

// Creating server
app.listen(Port, () => {
  console.log(`Server runing on port ${Port}`);
});
