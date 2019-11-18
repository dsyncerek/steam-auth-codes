export class AuthCode {
  code: string;
  validity: number;
  generatedAt: number;

  constructor(obj: AuthCode) {
    Object.assign(this, obj);
  }
}
