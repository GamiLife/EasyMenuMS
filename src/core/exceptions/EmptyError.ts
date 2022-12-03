export class EmptyError extends Error {
  constructor(message = '', statusCode?: number) {
    super(JSON.stringify({ message, statusCode }));
  }
}
