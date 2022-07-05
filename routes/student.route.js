const router = require("express").Router();
const studentController = require("../controllers/student.controller");

// Add a student
router.post("/student", studentController.addStudent);
// Get all student
router.get("/student", studentController.getAllStudent);
// Get one student
router.get("/student/:id", studentController.getStudentById);
// Update a student
router.patch("/student/:id", studentController.updateStudent);
// Delete student
router.delete("/student/:id", studentController.deleteStudent);

module.exports = router;
