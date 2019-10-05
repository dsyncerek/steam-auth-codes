import { Injectable } from '@nestjs/common';
import { generateAuthCode } from 'steam-totp';
import { SteamAccount } from '../steam-account/steam-account.entity';

@Injectable()
export class AuthCodeService {
  private readonly codeValidityTime = 30 * 1000;

  updateAccount(account: SteamAccount): SteamAccount {
    return {
      ...account,
      authCode: this.generateAuthCode(account.sharedSecret),
      validity: this.getValidity(),
      generatedAt: Date.now(),
    };
  }

  updateAccounts(accounts: SteamAccount[]): SteamAccount[] {
    return accounts.map(account => this.updateAccount(account));
  }

  getValidity(): number {
    return this.codeValidityTime - (Math.floor(Date.now()) % this.codeValidityTime);
  }

  generateAuthCode(sharedSecret: string): string {
    return generateAuthCode(sharedSecret);
  }
}
