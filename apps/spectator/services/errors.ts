export class APIError extends Error {
  private code: string;

  constructor(message: string, code: string) {
    super(message);

    this.name = 'APIError';
    this.code = code;
  }
}

export class NotFoundError extends Error {
  code: string;

  constructor(message: string, code = '404') {
    super(message);

    this.name = 'NotFoundError';
    this.code = code;
  }
}
