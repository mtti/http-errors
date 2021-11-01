[![Written in TypeScript](https://flat.badgen.net/badge/icon/TypeScript?icon=typescript&label)](http://www.typescriptlang.org/) <!-- [![npm](https://flat.badgen.net/npm/v/@mtti/http-errors?icon=npm)](https://www.npmjs.com/package/@mtti/http-errors) --> [![License](https://flat.badgen.net/github/license/mtti/http-errors)](https://github.com/mtti/http-errors/blob/master/LICENSE)

Throwable error classes corresponding to standard HTTP error codes for use with async request handlers.

The classes are generated based on the [http-status-codes](https://www.npmjs.com/package/http-status-codes) library, for each HTTP status in the 400-599 range. The classes are named the PascalCase representation of each error's reason phrase: 404 becomes `NotFoundError`, 416 becomes the slightly less concise `RequestedRangeNotSatisfiableError` and so on.

All the error classes share a common base class, `HttpError` which provides access to the error's status code and reason phrase, the latter courtesy of the http-status-codes library:

```typescript
export declare class HttpError extends Error {
    private _status;
    get status(): number;
    get reasonPhrase(): string;
    constructor(status: number, message?: string);
}
```

## Example

```typescript
import { HttpError, NotImplementedError } from '@mtti/http-errors';
import express from 'express';

/*
Wrap your request handling code to catch any thrown exceptions and forward them
to Express' error handling.
*/

export type AsyncRequestHandler = (
  req: express.Request,
) => Promise<string>;

export const wrapHandler = (
    handler: AsyncRequestHandler,
): express.RequestHandler => async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
): Promise<void> => {
    try {
        const response = await handler(req);
        res.send(response);
    } catch (err: unknown) {
        next(err);
    }
};

/*
Use a custom error handler to set response status when an error is thrown.
*/

export const errorHandler: express.ErrorRequestHandler = (
  err,
  req,
  res,
  next,
): void => {
  let status: number = 500;
  const message = err.message || 'Unknown error';

  if (err instanceof HttpError) {
    status = err.status;
  }

  res
    .status(status)
    .send(message);
};

/*
Set up your Express app normally, the custom error handler after your routes.
*/

const app = express();
app.get('/hello-world', wrapHandler(async (req) => {
    throw new NotImplementedError();
}));
app.use(errorHandler);
app.listen(8080);
```
