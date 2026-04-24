import express from 'express';
import {
  createStudent,
  getStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
} from '../controllers/studentController.js';

/**
 * Student Routes
 * All routes are prefixed with /api/students in server.js
 */
const router = express.Router();

/**
 * POST /api/students
 * Create a new student
 */
router.post('/', createStudent);

/**
 * GET /api/students
 * Get all students with pagination and sorting
 */
router.get('/', getStudents);

/**
 * GET /api/students/:id
 * Get a single student by ID
 */
router.get('/:id', getStudentById);

/**
 * PUT /api/students/:id
 * Update a student by ID
 */
router.put('/:id', updateStudent);

/**
 * DELETE /api/students/:id
 * Delete a student by ID
 */
router.delete('/:id', deleteStudent);

export default router;
