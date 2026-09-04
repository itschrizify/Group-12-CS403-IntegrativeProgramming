const { students, getNextId } = require("../models/student.model");

// GET all students
exports.getAllStudents = (req, res) => {
  res.send(students);
};

// GET a single student by id
exports.getStudentById = (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).send({ message: "Student not found" });
  }

  res.send(student);
};

// POST a new student
exports.createStudent = (req, res) => {
  const newName = req.body.name;
  const newCourse = req.body.course;

  const newStudent = { id: getNextId(), name: newName, course: newCourse };
  students.push(newStudent);

  res.send(newStudent);
};

// PUT (update) an existing student
exports.updateStudent = (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).send({ message: "Student not found" });
  }

  student.name = req.body.name ?? student.name;
  student.course = req.body.course ?? student.course;

  res.send(student);
};

// DELETE a student
exports.deleteStudent = (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === studentId);

  if (index === -1) {
    return res.status(404).send({ message: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1);
  res.send(deletedStudent[0]);
};