import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import studentRoutes from './routes/studentRoutes.js';
import errorMiddleware from './middleware/errorMiddleware.js';

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();

// ============ MIDDLEWARE ============

// Body parsing middleware - parse incoming JSON requests
app.use(express.json());

// CORS middleware - enable cross-origin requests
app.use(cors());

// ============ DATABASE CONNECTION ============

// Connect to MongoDB
connectDB();

// ============ ROUTES ============

/**
 * Health check route - Test API availability
 * GET /
 */
app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: '🎓 College Student Management API is running',
    version: '1.0.0',
    endpoints: {
      health: 'GET /',
      createStudent: 'POST /api/students',
      getAllStudents: 'GET /api/students',
      getStudentById: 'GET /api/students/:id',
      updateStudent: 'PUT /api/students/:id',
      deleteStudent: 'DELETE /api/students/:id',
    },
  });
});

/**
 * Student API Routes
 * All routes are prefixed with /api/students
 */
app.use('/api/students', studentRoutes);

// ============ ERROR HANDLING ============

/**
 * 404 Handler - Route not found
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    statusCode: 404,
    message: 'Route not found',
    path: req.originalUrl,
  });
});

/**
 * Global Error Handling Middleware
 * Catches all errors and sends consistent error responses
 */
app.use(errorMiddleware);

// ============ SERVER STARTUP ============

const PORT = process.env.PORT || 5001;

const server = app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║   🎓 COLLEGE STUDENT API SERVER        ║
╚════════════════════════════════════════╝
✅ Server is running on http://localhost:${PORT}
📚 API Base URL: http://localhost:${PORT}/api
🔌 MongoDB URI: ${process.env.MONGO_URI}
🌍 Environment: ${process.env.NODE_ENV || 'development'}
  `);
});

/**
 * Handle unhandled promise rejections
 * Prevents server from crashing
 */
process.on('unhandledRejection', (reason) => {
  console.error('❌ Unhandled Rejection:', reason);
  server.close(() => process.exit(1));
});

/**
 * Handle uncaught exceptions
 * Ensures graceful shutdown
 */
process.on('uncaughtException', (error) => {
  console.error('❌ Uncaught Exception:', error);
  process.exit(1);
});

export default app;
