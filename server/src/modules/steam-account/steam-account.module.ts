import { DynamicModule, Module } from '@nestjs/common';
import { AuthCodeModule } from '../auth-code/auth-code.module';
import { STEAM_ACCOUNTS_TOKEN } from './decorators/inject-steam-accounts.decorator';
import { SteamAccount } from './entity/steam-account.entity';
import { SteamAccountGateway } from './steam-account.gateway';
import { SteamAccountService } from './steam-account.service';

@Module({})
export class SteamAccountModule {
  static register(steamAccounts: SteamAccount[]): DynamicModule {
    return {
      module: SteamAccountModule,
      imports: [AuthCodeModule],
      providers: [SteamAccountGateway, SteamAccountService, { provide: STEAM_ACCOUNTS_TOKEN, useValue: steamAccounts }],
    };
  }
}
