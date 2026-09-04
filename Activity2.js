const express = require("express");
const port = 3000;

let nextId = 1;
const students = [
  { id: nextId++, name: "Alice", course: "BSCS" },
  { id: nextId++, name: "Bob", course: "BSIT" },
  { id: nextId++, name: "Cara", course: "BSCS" },
];

const app = express();

app.use(express.json());

// GET all students
app.get("/students", (request, response) => {
  response.send(students);
});

// GET a single student by id
app.get("/students/:id", (request, response) => {
  const studentId = parseInt(request.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return response.status(404).send({ message: "Student not found" });
  }

  response.send(student);
});

// POST a new student
app.post("/students", (request, response) => {
  const newName = request.body.name;
  const newCourse = request.body.course;

  const newStudent = { id: nextId++, name: newName, course: newCourse };

  students.push(newStudent);

  response.send(newStudent);
});

// PUT (update) an existing student
app.put("/students/:id", (request, response) => {
  const studentId = parseInt(request.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return response.status(404).send({ message: "Student not found" });
  }

  student.name = request.body.name ?? student.name;
  student.course = request.body.course ?? student.course;

  response.send(student);
});

// DELETE a student
app.delete("/students/:id", (request, response) => {
  const studentId = parseInt(request.params.id);
  const index = students.findIndex((s) => s.id === studentId);

  if (index === -1) {
    return response.status(404).send({ message: "Student not found" });
  }

  const deletedStudent = students.splice(index, 1);

  response.send(deletedStudent[0]);
});

app.listen(port, () => {
  console.log(`App is listening to port ${port}`);
});