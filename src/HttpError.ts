export class HttpError extends Error {
  private _status: number;

  public get status(): number {
    return this._status;
  }

  constructor(status: number, message: string) {
    super(message);
    this._status = status;
  }
}
