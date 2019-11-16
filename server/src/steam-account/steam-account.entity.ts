import { Exclude } from 'class-transformer';
import { AuthCode } from '../auth-code/auth-code.entity';

export class SteamAccount {
  username: string;
  authCode?: AuthCode;

  @Exclude()
  sharedSecret: string;
}
