import { HttpException, HttpStatus } from '@nestjs/common';

export class ServerError extends HttpException {
  constructor(message: string, statusCode = HttpStatus.INTERNAL_SERVER_ERROR) {
    super(message, statusCode);
  }
}
