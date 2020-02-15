import { Test, TestingModule } from '@nestjs/testing';
import { AuthCodeService } from '../auth-code/auth-code.service';
import { STEAM_ACCOUNTS_TOKEN } from './decorators/inject-steam-accounts.decorator';
import { SteamAccountService } from './steam-account.service';

describe('SteamAccountService', () => {
  let service: SteamAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SteamAccountService,
        { provide: AuthCodeService, useValue: {} },
        { provide: STEAM_ACCOUNTS_TOKEN, useValue: [] },
      ],
    }).compile();

    service = module.get<SteamAccountService>(SteamAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
