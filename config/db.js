const mongoose = require("mongoose");

mongoose
  .connect(process.env.DB_URI)
  .then(() => {
    console.log(`Successfully connected`);
  })
  .catch((e) => {
    console.log(e);
  });
