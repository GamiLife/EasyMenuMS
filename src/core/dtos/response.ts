export interface Response<T> {
  data: T;
  message: string;
  statusCode: string;
  token?: string;
  refreshToken?: string;
  exp?: number;
}
