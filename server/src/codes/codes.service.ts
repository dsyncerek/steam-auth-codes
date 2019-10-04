import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { generateAuthCode } from 'steam-totp';
import { InjectAccounts } from './decorators/inject-accounts.decorator';
import { SteamAccount } from './entities/steam-account.entity';

@Injectable()
export class CodesService {
  private readonly codeValidityTime = 30 * 1000;
  private readonly subject = new BehaviorSubject<SteamAccount[]>([]);
  public readonly authCodes$ = this.subject.asObservable();

  constructor(@InjectAccounts() accounts: SteamAccount[]) {
    this.subject.next(accounts);
    this.setupInterval();
  }

  private setupInterval(): void {
    this.refreshCodes();
    setTimeout(() => this.setupInterval(), this.getValidity());
  }

  private refreshCodes(): void {
    const accounts = this.subject.getValue();
    const updatedAccounts = accounts.map(account => this.updateAccount(account));
    this.subject.next(updatedAccounts);
  }

  private updateAccount(account: SteamAccount): SteamAccount {
    return {
      ...account,
      validity: this.getValidity(),
      authCode: this.generateAuthCode(account.sharedSecret),
    };
  }

  private getValidity(): number {
    return this.codeValidityTime - (Math.floor(Date.now()) % this.codeValidityTime);
  }

  private generateAuthCode(sharedSecret: string): string {
    return generateAuthCode(sharedSecret);
  }
}
