import mongoose from 'mongoose';

/**
 * Student Schema Definition
 * Defines the structure and validation rules for student documents
 */
const studentSchema = new mongoose.Schema(
  {
    // Student's full name - required field
    name: {
      type: String,
      required: [true, 'Please provide a student name'],
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [100, 'Name cannot exceed 100 characters'],
    },

    // Student's email - required and unique
    email: {
      type: String,
      required: [true, 'Please provide an email address'],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        'Please provide a valid email address',
      ],
    },

    // Course name - required field
    course: {
      type: String,
      required: [true, 'Please provide a course name'],
      trim: true,
      minlength: [2, 'Course name must be at least 2 characters long'],
      maxlength: [100, 'Course name cannot exceed 100 characters'],
    },
  },
  {
    // Enable timestamps - createdAt and updatedAt
    timestamps: true,
  }
);

/**
 * Create Student Model from schema
 * Model is used for database operations (CRUD)
 */
const Student = mongoose.model('Student', studentSchema);

export default Student;
