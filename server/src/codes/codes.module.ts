import { DynamicModule, Module } from '@nestjs/common';
import { CodesGateway } from './codes.gateway';
import { CodesService } from './codes.service';
import { ACCOUNTS_TOKEN } from './decorators/inject-accounts.decorator';
import { SteamAccount } from './entities/steam-account.entity';

@Module({})
export class CodesModule {
  static register(accounts: SteamAccount[]): DynamicModule {
    return {
      module: CodesModule,
      providers: [CodesGateway, CodesService, { provide: ACCOUNTS_TOKEN, useValue: accounts }],
    };
  }
}
