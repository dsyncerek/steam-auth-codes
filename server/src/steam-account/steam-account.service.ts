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

    this.timerSubscription = timer(
      this.authCodeService.codeCurrentValidityTime,
      this.authCodeService.codeValidityTime,
    ).subscribe(() => this.subject.next(this.updateSteamAccounts(this.steamAccounts)));
  }

  public stopTimer(): void {
    if (this.subject && this.timerSubscription) {
      this.subject.complete();
      this.timerSubscription.unsubscribe();
    }
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
