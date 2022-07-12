const Student = require("../models/student.model");
const Marks = require("../models/marks.model");
const Subject = require("../models/subject.model");
fs = require("fs");

// --------- Create New Student-----------//
const addStudent = async (req, res) => {
  var fileData = req.files;

  var fils = [];
  try {
    let subInfo = [];
    var sublen = req.body.subject.length;
    let mark;

    for (var i = 0; i < sublen; i++) {
      let { name, marks } = req.body.subject[i];

      const findMarkId = await Marks.findOne({ marks });

      if (!findMarkId) {
        mark = await Marks.create({ marks });
        await mark.save();
      }

      const subject = await Subject.create({
        name: name,
        marks: findMarkId ? findMarkId._id : mark._id,
      });
      await subject.save();

      subInfo.push(subject);
    }
    fils = fileData.map((file) => {
      return "http://localhost:3000/files/" + file.filename;
    });

    const student = await new Student({
      name: req.body.name,
      roll: req.body.roll,
      address: req.body.address,
      file: fils,
      country: req.body.country,
      state: req.body.state,
      city: req.body.city,
      subject: subInfo.map((e) => e._id),
    });
    await student.save();

    res.status(200).send({ success: true, data: student });
  } catch (e) {
    res.status(500).send({ success: false, error: e });
  }
};

// --------- Get All Student-----------//
const getAllStudent = async (req, res) => {
  try {
    const student = await Student.find({}).populate({
      path: "subject",
      populate: {
        path: "marks",
      },
    });
    res.status(200).send({ success: true, data: student });
  } catch (e) {
    res.status(500).send({ success: false, error: e });
  }
};

// --------- Get Student By Id-----------//
const getStudentById = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id).populate({
      path: "subject",
      populate: {
        path: "marks",
      },
    });
    res.status(200).send(student);
  } catch (e) {
    res.status(500).send({ success: false, error: e });
  }
};

// --------- Delete Student By Id-----------//
const deleteStudent = async (req, res) => {
  try {
    const Deletstudent = await Student.findById(req.params.id);

    if (Deletstudent.file) {
      for (let file of Deletstudent.file) {
        fs.unlinkSync(`uploads/${file.split("/")[4]}`);
      }
    }
    const student = await Student.findByIdAndDelete(req.params.id);

    res.status(200).send({ success: true, data: student });
  } catch (e) {
    res.status(500).send({ success: false, error: e });
  }
};

//--------------Update Student----------------//
const updateStudent = async (req, res) => {
  var fileData = req.files;
  var fils = [];
  try {
    const body = req.body;

    var subData = [];
    const student = await Student.findById({ _id: req.params.id });
    const subject = await Subject.find({ _id: { $in: student.subject } });

    //*** Delete Old file ***//

    if (student.file) {
      for (let file of student.file) {
        fs.unlinkSync(`uploads/${file.split("/")[4]}`);
      }
    }

    for (let i = 0; i < body.subject.length; i++) {
      if (subject[i] != undefined) {
        let { name, marks, _id } = subject[i];

        let mark = await Marks.findByIdAndUpdate(
          marks,
          { marks: body.subject[i].marks },
          {
            new: true,
          }
        );

        let sub = await Subject.findOneAndUpdate(
          { _id },
          {
            name: body.subject[i].name,
            marks: mark._id,
          },
          { new: true }
        );
        subData.push(sub);
      } else {
        //*** New Subject if not avelible ***//
        let mark;

        const { name, marks } = body.subject[i];

        const findMarkId = await Marks.findOne({ marks });

        if (!findMarkId) {
          mark = await Marks.create({ marks });
          await mark.save();
        }

        const subject = await Subject.create({
          name: name,
          marks: findMarkId ? findMarkId._id : mark._id,
        });
        await subject.save();
        subData.push(subject);
      }
    }
    //student.subject = subData.map((e) => e._id);
    fils = fileData.map((file) => {
      return "http://localhost:3000/files/" + file.filename;
    });

    const updateStudent = await Student.findByIdAndUpdate(
      { _id: req.params.id },
      {
        name: body.name,
        roll: body.roll,
        address: body.address,
        country: body.country,
        state: body.state,
        city: body.city,
        file: fils,
        subject: subData.map((e) => e._id),
      },
      { new: true }
    );

    res.status(200).send({ success: true, Data: updateStudent });
  } catch (e) {
    res.status(500).send({ success: false, error: e });
  }
};

module.exports = {
  addStudent,
  getStudentById,
  getAllStudent,
  deleteStudent,
  updateStudent,
};
