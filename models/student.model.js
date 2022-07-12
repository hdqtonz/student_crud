const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  roll: {
    type: Number,
    minlength: 3,
    required: true,
    unique: true,
  },
  address: {
    type: String,
    required: true,
  },
  file: [
    {
      type: String,
    },
  ],
  country: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  subject: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
});

const Student = new mongoose.model("Student", studentSchema);

module.exports = Student;
