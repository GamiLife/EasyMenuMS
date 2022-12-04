import { ServerError } from './ServerError';

export const CatchControl = (error) => {
  const { message } = error;
  const { message: customMessage, statusCode } = JSON.parse(message);
  throw new ServerError(customMessage, statusCode);
};
