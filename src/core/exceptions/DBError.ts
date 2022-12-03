export class DBError extends Error {
    constructor(message = '', statusCode?: number) {
      super(JSON.stringify({ message, statusCode }));
    }
  }
  