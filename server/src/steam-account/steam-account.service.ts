import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthCodeService } from '../auth-code/auth-code.service';
import { InjectAccounts } from './decorators/inject-accounts.decorator';
import { SteamAccount } from './steam-account.entity';

@Injectable()
export class SteamAccountService {
  private readonly subject: BehaviorSubject<SteamAccount[]>;
  public readonly accounts$: Observable<SteamAccount[]>;

  constructor(private readonly authCodeService: AuthCodeService, @InjectAccounts() accounts: SteamAccount[]) {
    this.subject = new BehaviorSubject<SteamAccount[]>(accounts);
    this.accounts$ = this.subject.asObservable();

    this.refresh();
  }

  private refresh(): void {
    this.subject.next(this.updateAccounts(this.subject.value));
    setTimeout(() => this.refresh(), this.authCodeService.getValidity());
  }

  private updateAccounts(accounts: SteamAccount[]): SteamAccount[] {
    return accounts.map(account => ({
      ...account,
      authCode: this.authCodeService.generateAuthCode(account.sharedSecret),
    }));
  }
}
