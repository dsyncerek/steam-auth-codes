import { Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthCodeService } from '../auth-code/auth-code.service';
import { InjectAccounts } from './decorators/inject-accounts.decorator';
import { SteamAccount } from './steam-account.entity';

@Injectable()
export class SteamAccountService {
  private readonly subject = new BehaviorSubject<SteamAccount[]>([]);

  public readonly accounts$ = this.subject
    .asObservable()
    .pipe(map(accounts => this.authCodeService.updateAccounts(accounts)));

  constructor(private readonly authCodeService: AuthCodeService, @InjectAccounts() accounts: SteamAccount[]) {
    this.subject.next(accounts);
    this.setupInterval();
  }

  private setupInterval(): void {
    this.refreshCodes();
    setTimeout(() => this.setupInterval(), this.authCodeService.getValidity());
  }

  private refreshCodes(): void {
    const accounts = this.subject.getValue();
    const updatedAccounts = this.authCodeService.updateAccounts(accounts);
    this.subject.next(updatedAccounts);
  }
}
