import AuthCode from './auth-code';

export default interface SteamAccount {
  username: string;
  authCode: AuthCode;
}
