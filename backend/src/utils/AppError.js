class AppError extends Error {
  constructor(message, status = 400, safeMessage) {
    super(message);
    this.status = status;
    this.safeMessage = safeMessage || message;
  }
}

module.exports = AppError;
