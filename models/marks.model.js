const mongoose = require("mongoose");

const markShema = new mongoose.Schema({
  marks: {
    type: Number,
    required: true,
  },
});

const Marks = mongoose.model("Marks", markShema);
module.exports = Marks;
