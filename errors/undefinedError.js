class UndefinedError extends Error {
    constructor(message) {
      super(message);
      this.name = 'Undefined Value';
    }
  }
  
  module.exports = { UndefinedError };