// This file is automatically generated

import { HttpError } from '../HttpError';

/** HTTP 408 Request Timeout error */
export class RequestTimeoutError extends HttpError {
  constructor(message?: string) {
    super(408, message);
  }
}
