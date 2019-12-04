import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable, Subscription, timer } from 'rxjs';
import { AuthCodeService } from '../auth-code/auth-code.service';
import { InjectSteamAccounts } from './decorators/inject-steam-accounts.decorator';
import { SteamAccount } from './entity/steam-account.entity';

@Injectable()
export class SteamAccountService {
  private subject: BehaviorSubject<SteamAccount[]>;
  public steamAccounts$: Observable<SteamAccount[]>;
  private timerSubscription: Subscription;

  constructor(
    private readonly authCodeService: AuthCodeService,
    @InjectSteamAccounts() private readonly steamAccounts: SteamAccount[],
  ) {
    this.startTimer();
  }

  public startTimer(): void {
    this.stopTimer();

    this.subject = new BehaviorSubject<SteamAccount[]>([]);
    this.steamAccounts$ = this.subject.asObservable();

    this.updateSubject();

    this.timerSubscription = timer(
      this.authCodeService.codeCurrentValidityTime,
      this.authCodeService.codeValidityTime,
    ).subscribe(() => this.updateSubject());
  }

  public stopTimer(): void {
    if (this.subject && this.timerSubscription) {
      this.subject.complete();
      this.timerSubscription.unsubscribe();
    }
  }

  private updateSubject(): void {
    const updated = this.updateSteamAccounts(this.steamAccounts);
    this.subject.next(updated);
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
