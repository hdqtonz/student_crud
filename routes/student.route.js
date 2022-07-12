const router = require("express").Router();
const studentController = require("../controllers/student.controller");
const storage = require("../_helpers/storage");

// Add a student
router.post("/student", storage, studentController.addStudent);
// Get all student
router.get("/student", studentController.getAllStudent);
// Get one student
router.get("/student/:id", studentController.getStudentById);
// Update a student
router.patch("/student/:id", storage, studentController.updateStudent);
// Delete student
router.delete("/student/:id", studentController.deleteStudent);

module.exports = router;
