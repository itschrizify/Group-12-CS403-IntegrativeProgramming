let nextId = 1;

const students = [
  { id: nextId++, name: "Alice", course: "BSCS" },
  { id: nextId++, name: "Bob", course: "BSIT" },
  { id: nextId++, name: "Cara", course: "BSCS" },
];

module.exports = {
  students,
  getNextId: () => nextId++,
};