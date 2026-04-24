import Student from '../models/Student.js';

/**
 * CREATE - Add a new student to the database
 * POST /api/students
 * Body: { name, email, course }
 */
export const createStudent = async (req, res, next) => {
  try {
    const { name, email, course } = req.body;

    // Validate required fields
    if (!name || !email || !course) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields: name, email, and course',
      });
    }

    // Check if student with this email already exists
    const existingStudent = await Student.findOne({ email: email.toLowerCase() });
    if (existingStudent) {
      return res.status(400).json({
        success: false,
        message: 'A student with this email already exists',
      });
    }

    // Create new student
    const student = new Student({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      course: course.trim(),
    });

    // Save to database
    await student.save();

    console.log(`✅ Student created successfully: ${student._id}`);

    // Send success response with 201 Created status
    res.status(201).json({
      success: true,
      statusCode: 201,
      message: 'Student created successfully',
      data: student,
    });
  } catch (error) {
    next(error); // Pass error to error middleware
  }
};

/**
 * READ - Get all students from the database
 * GET /api/students
 * Optional query: ?sort=name&limit=10&page=1
 */
export const getStudents = async (req, res, next) => {
  try {
    // Get pagination parameters from query
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Get sorting parameter from query
    const sort = req.query.sort || '-createdAt';

    // Fetch students with pagination and sorting
    const students = await Student.find()
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination metadata
    const totalCount = await Student.countDocuments();
    const totalPages = Math.ceil(totalCount / limit);

    // If no students found
    if (students.length === 0) {
      return res.status(200).json({
        success: true,
        statusCode: 200,
        message: 'No students found',
        data: [],
        pagination: {
          currentPage: page,
          totalPages,
          totalCount,
          limit,
        },
      });
    }

    console.log(`✅ Retrieved ${students.length} students`);

    // Send success response
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Students retrieved successfully',
      data: students,
      pagination: {
        currentPage: page,
        totalPages,
        totalCount,
        limit,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * READ - Get a single student by ID
 * GET /api/students/:id
 */
export const getStudentById = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid student ID format',
      });
    }

    // Find student by ID
    const student = await Student.findById(id);

    // Check if student exists
    if (!student) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Student not found',
      });
    }

    console.log(`✅ Retrieved student: ${id}`);

    // Send success response
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Student retrieved successfully',
      data: student,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * UPDATE - Update a student by ID
 * PUT /api/students/:id
 * Body: { name, email, course } (any or all fields)
 */
export const updateStudent = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, course } = req.body;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid student ID format',
      });
    }

    // Check if student exists
    const student = await Student.findById(id);
    if (!student) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Student not found',
      });
    }

    // Check if email is being updated and already exists
    if (email && email !== student.email) {
      const existingStudent = await Student.findOne({ 
        email: email.toLowerCase(),
        _id: { $ne: id } // Exclude current student
      });
      if (existingStudent) {
        return res.status(400).json({
          success: false,
          statusCode: 400,
          message: 'A student with this email already exists',
        });
      }
    }

    // Build update object with only provided fields
    const updateData = {};
    if (name) updateData.name = name.trim();
    if (email) updateData.email = email.toLowerCase().trim();
    if (course) updateData.course = course.trim();

    // Update student
    const updatedStudent = await Student.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true, // Return updated document
        runValidators: true, // Run schema validators
      }
    );

    console.log(`✅ Student updated successfully: ${id}`);

    // Send success response
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Student updated successfully',
      data: updatedStudent,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * DELETE - Delete a student by ID
 * DELETE /api/students/:id
 */
export const deleteStudent = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Validate MongoDB ObjectId format
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Invalid student ID format',
      });
    }

    // Find and delete student
    const student = await Student.findByIdAndDelete(id);

    // Check if student exists
    if (!student) {
      return res.status(404).json({
        success: false,
        statusCode: 404,
        message: 'Student not found',
      });
    }

    console.log(`✅ Student deleted successfully: ${id}`);

    // Send success response
    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'Student deleted successfully',
      data: student,
    });
  } catch (error) {
    next(error);
  }
};
