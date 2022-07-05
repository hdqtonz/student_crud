const mongoose = require("mongoose");

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  marks: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Marks",
    required: true,
  },
});

const Subject = new mongoose.model("Subject", subjectSchema);
module.exports = Subject;
