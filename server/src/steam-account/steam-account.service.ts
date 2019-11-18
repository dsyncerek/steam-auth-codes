import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { AuthCodeService } from '../auth-code/auth-code.service';
import { InjectSteamAccounts } from './decorators/inject-steam-accounts.decorator';
import { SteamAccount } from './entity/steam-account.entity';

@Injectable()
export class SteamAccountService {
  private readonly subject = new BehaviorSubject<SteamAccount[]>([]);
  public readonly steamAccounts$ = this.subject.asObservable();

  constructor(private readonly authCodeService: AuthCodeService, @InjectSteamAccounts() steamAccounts: SteamAccount[]) {
    this.subject.next(this.updateSteamAccounts(steamAccounts));
    this.refresh();
  }

  private refresh(): void {
    this.subject.next(this.updateSteamAccounts(this.subject.value));
    setTimeout(() => this.refresh(), this.authCodeService.getValidity());
  }

  private updateSteamAccounts(steamAccounts: SteamAccount[]): SteamAccount[] {
    return steamAccounts.map(account => {
      return new SteamAccount({
        ...account,
        authCode: this.authCodeService.generateAuthCode(account.sharedSecret),
      });
    });
  }
}
