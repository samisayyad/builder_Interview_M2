export class HttpError extends Error {
  statusCode: number;
  details?: unknown;

  constructor(statusCode: number, message: string, details?: unknown) {
    super(message);
    this.statusCode = statusCode;
    this.details = details;
  }
}

export const badRequest = (message: string, details?: unknown) =>
  new HttpError(400, message, details);

export const unauthorized = (message: string, details?: unknown) =>
  new HttpError(401, message, details);

export const forbidden = (message: string, details?: unknown) =>
  new HttpError(403, message, details);

export const notFound = (message: string, details?: unknown) =>
  new HttpError(404, message, details);

export const conflict = (message: string, details?: unknown) =>
  new HttpError(409, message, details);

export const tooManyRequests = (message: string, details?: unknown) =>
  new HttpError(429, message, details);
