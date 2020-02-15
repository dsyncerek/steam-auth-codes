import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { BehaviorSubject } from 'rxjs';
import { AuthCodeService } from '../auth-code/auth-code.service';
import { InjectSteamAccounts } from './decorators/inject-steam-accounts.decorator';
import { SteamAccount } from './entity/steam-account.entity';

@Injectable()
export class SteamAccountService {
  private readonly subject = new BehaviorSubject<SteamAccount[]>([]);
  public readonly steamAccounts$ = this.subject.asObservable();

  constructor(
    private readonly authCodeService: AuthCodeService,
    @InjectSteamAccounts() private readonly steamAccounts: SteamAccount[],
  ) {
    this.subject.next(this.updateSteamAccounts(this.steamAccounts));
  }

  @Cron('0/30 * * * * *')
  private handleAuthCodesUpdate(): void {
    this.subject.next(this.updateSteamAccounts(this.steamAccounts));
  }

  private updateSteamAccounts(steamAccounts: SteamAccount[]): SteamAccount[] {
    return steamAccounts.map(steamAccount => this.updateSteamAccount(steamAccount));
  }

  private updateSteamAccount(steamAccount: SteamAccount): SteamAccount {
    return new SteamAccount({
      ...steamAccount,
      authCode: this.authCodeService.generateAuthCode(steamAccount.sharedSecret),
    });
  }
}
