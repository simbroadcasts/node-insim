export class InSimError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InSimError';
  }
}
