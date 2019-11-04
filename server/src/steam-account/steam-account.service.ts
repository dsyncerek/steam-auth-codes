import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthCodeService } from '../auth-code/auth-code.service';
import { InjectAccounts } from './decorators/inject-accounts.decorator';
import { SteamAccount } from './steam-account.entity';

@Injectable()
export class SteamAccountService {
  private readonly subject = new BehaviorSubject<SteamAccount[]>([]);

  public readonly accounts$ = this.subject.asObservable().pipe(
    map(accounts => this.updateAccounts(accounts)),
    map(accounts => this.excludeSharedSecret(accounts)),
  );

  constructor(private readonly authCodeService: AuthCodeService, @InjectAccounts() accounts: SteamAccount[]) {
    this.subject.next(accounts);
    this.refresh();
  }

  private refresh(): void {
    const accounts = this.subject.value;
    const updatedAccounts = this.updateAccounts(accounts);
    this.subject.next(updatedAccounts);

    setTimeout(() => this.refresh(), this.authCodeService.getValidity());
  }

  private updateAccounts(accounts: SteamAccount[]): SteamAccount[] {
    return accounts.map(account => ({
      ...account,
      authCode: this.authCodeService.generateAuthCode(account.sharedSecret),
      validity: this.authCodeService.getValidity(),
      generatedAt: Date.now(),
    }));
  }

  private excludeSharedSecret(accounts: SteamAccount[]): SteamAccount[] {
    return accounts.map(account => ({
      ...account,
      sharedSecret: undefined,
    }));
  }
}
