import { HttpError } from './HttpError';

export class NotAcceptableError extends HttpError {
  private _validMediaTypes: string[];

  get validMediaTypes(): string[] {
    return [...this._validMediaTypes];
  }

  constructor(
    message = 'Not Acceptable',
    validMediaTypes: readonly string[] = [],
  ) {
    super(406, message);
    this._validMediaTypes = [...validMediaTypes];
  }
}
