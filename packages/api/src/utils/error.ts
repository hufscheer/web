export class NotFoundError extends Error {
  code: string;

  constructor(message: string, code = '404') {
    super(message);

    this.name = 'NotFoundError';
    this.code = code;
  }
}
