const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const authenticate = require("../middleware/auth.middleware");

router.get("/", authenticate, studentController.getAllStudents);
router.get("/:id", authenticate, studentController.getStudentById);
router.post("/", authenticate, studentController.createStudent);
router.put("/:id", authenticate, studentController.updateStudent);
router.delete("/:id", authenticate, studentController.deleteStudent);

module.exports = router;    