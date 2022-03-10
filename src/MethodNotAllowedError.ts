import { HttpError } from './HttpError';

/** HTTP 405 Method Not Allowed error */
export class MethodNotAllowedError extends HttpError {
  readonly allowedMethods: string[];

  constructor(allowedMethods: readonly string[], message?: string) {
    super(405, message);

    this.allowedMethods = [...allowedMethods];
  }
}
