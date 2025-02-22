// Define a custom error class that extends the built-in Error class
class ApiError extends Error {
  // Constructor to initialize the error object
  constructor(
    statusCode, // HTTP status code
    message = "something went wrong", // Default error message
    errors = [], // Additional error details
    stack = "" // Optional stack trace
  ) {
    // Call the parent class constructor with the message
    super(message);
    
    // Set the status code property
    this.statusCode = statusCode;
    
    // Initialize data property to null
    this.data = null;
    
    // Set the error message
    this.message = message;
    
    // Indicate that the operation was not successful
    this.success = false;
    
    // Set the errors property with additional error details
    this.errors = errors;

    // If a stack trace is provided, use it; otherwise, capture the current stack trace
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

// Export the ApiError class for use in other modules
export { ApiError };