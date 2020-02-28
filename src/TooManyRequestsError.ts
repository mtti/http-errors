import { HttpError } from './HttpError';

export class TooManyRequestsError extends HttpError {
  constructor(message = 'Too Many Requests') {
    super(429, message);
  }
}
