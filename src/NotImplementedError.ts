import { HttpError } from './HttpError';

export class NotImplementedError extends HttpError {
  constructor(message = 'Not Implemented') {
    super(501, message);
  }
}
