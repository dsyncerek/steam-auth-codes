import { DynamicModule, Module } from '@nestjs/common';
import { AuthCodeModule } from '../auth-code/auth-code.module';
import { ACCOUNTS_TOKEN } from './decorators/inject-accounts.decorator';
import { SteamAccount } from './steam-account.entity';
import { SteamAccountGateway } from './steam-account.gateway';
import { SteamAccountService } from './steam-account.service';

@Module({})
export class SteamAccountModule {
  static register(accounts: SteamAccount[]): DynamicModule {
    return {
      module: SteamAccountModule,
      imports: [AuthCodeModule],
      providers: [SteamAccountGateway, SteamAccountService, { provide: ACCOUNTS_TOKEN, useValue: accounts }],
    };
  }
}
