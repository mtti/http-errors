import { HttpError } from './HttpError';

export class UnavailableForLegalReasonsError extends HttpError {
  constructor(message = 'Unavailable For Legal Reasons') {
    super(451, message);
  }
}
