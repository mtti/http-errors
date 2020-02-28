import { HttpError } from './HttpError';

export class UnsupportedMediaTypeError extends HttpError {
  constructor(message = 'Unsupported Media Type') {
    super(415, message);
  }
}
