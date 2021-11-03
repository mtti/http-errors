import { HttpError } from './HttpError';

export class UnauthorizedError extends HttpError {
  private _authScheme: string;

  private _parameters: Record<string, string>;

  constructor(
    authScheme: string,
    parameters?: Record<string, string>,
    message?: string,
  ) {
    super(401, message);
    this._authScheme = authScheme;
    this._parameters = parameters || {};
  }

  toHeaderString(): string {
    const params = Object
      .entries(this._parameters)
      .map(([key, value]) => `${key}="${value}"`)
      .join(',');
    return `${this._authScheme} ${params}`;
  }
}
