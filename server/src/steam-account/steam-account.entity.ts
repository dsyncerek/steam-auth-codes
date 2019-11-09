import { AuthCode } from '../auth-code/auth-code.entity';

export class SteamAccount {
  username: string;
  sharedSecret: string;
  authCode?: AuthCode;
}
