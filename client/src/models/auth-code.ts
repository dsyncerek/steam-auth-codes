export default interface AuthCode {
  code: string;
  validity: number;
  generatedAt: number;
}
