import { Exclude } from 'class-transformer';
import { AuthCode } from '../../auth-code/entity/auth-code.entity';

export class SteamAccount {
  username: string;
  authCode?: AuthCode;

  @Exclude()
  sharedSecret: string;

  constructor(obj: SteamAccount | Omit<SteamAccount, 'authCode'>) {
    Object.assign(this, obj);
  }
}
