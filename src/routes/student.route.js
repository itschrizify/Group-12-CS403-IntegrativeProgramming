const express = require("express");
const router = express.Router();
const studentController = require("../controllers/student.controller");
const authenticate = require("../middleware/auth.middleware");

/**
 * @swagger
 * /students:
 *   get:
 *     tags: [Students]
 *     summary: Get all students
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of students
 *       401:
 *         description: No access token was provided
 *       403:
 *         description: Access token is invalid or expired
 *   post:
 *     tags: [Students]
 *     summary: Create a student
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentInput'
 *     responses:
 *       200:
 *         description: Student created
 *       401:
 *         description: No access token was provided
 *       403:
 *         description: Access token is invalid or expired
 */
router.get("/", authenticate, studentController.getAllStudents);
router.post("/", authenticate, studentController.createStudent);

/**
 * @swagger
 * /students/{id}:
 *   get:
 *     tags: [Students]
 *     summary: Get one student by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student found
 *       404:
 *         description: Student not found
 *   put:
 *     tags: [Students]
 *     summary: Update a student by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/StudentInput'
 *     responses:
 *       200:
 *         description: Student updated
 *       404:
 *         description: Student not found
 *   delete:
 *     tags: [Students]
 *     summary: Delete a student by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Student deleted
 *       404:
 *         description: Student not found
 */
router.get("/:id", authenticate, studentController.getStudentById);
router.put("/:id", authenticate, studentController.updateStudent);
router.delete("/:id", authenticate, studentController.deleteStudent);

module.exports = router;    
