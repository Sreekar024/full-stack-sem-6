/**
 * Centralized Error Handling Middleware
 * Catches all errors from routes and controllers
 * Sends consistent error response format
 */
const errorMiddleware = (err, req, res, next) => {
  // Set default error status and message
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Handle Mongoose validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(', ');
  }

  // Handle Mongoose duplicate key error (email already exists)
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyPattern)[0];
    message = `A student with this ${field} already exists`;
  }

  // Handle invalid MongoDB ObjectId
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid student ID format';
  }

  // Log error details for debugging (in development)
  if (process.env.NODE_ENV === 'development') {
    console.error(`❌ Error: ${message}`);
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
    ...(process.env.NODE_ENV === 'development' && { error: err.stack }),
  });
};

export default errorMiddleware;
