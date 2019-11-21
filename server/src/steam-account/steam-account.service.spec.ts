import { Test, TestingModule } from '@nestjs/testing';
import { AuthCodeService } from '../auth-code/auth-code.service';
import { STEAM_ACCOUNTS_TOKEN } from './decorators/inject-steam-accounts.decorator';
import { SteamAccount } from './entity/steam-account.entity';
import { SteamAccountService } from './steam-account.service';

describe('SteamAccountService', () => {
  let service: SteamAccountService;

  const STEAM_ACCOUNTS: SteamAccount[] = [
    new SteamAccount({ username: 'username_1', sharedSecret: 'shared_secret_1' }),
    new SteamAccount({ username: 'username_2', sharedSecret: 'shared_secret_2' }),
  ];

  const authCodeServiceMock = { generateAuthCode: jest.fn(), getValidity: jest.fn() };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SteamAccountService,
        { provide: AuthCodeService, useValue: authCodeServiceMock },
        { provide: STEAM_ACCOUNTS_TOKEN, useValue: STEAM_ACCOUNTS },
      ],
    }).compile();

    service = module.get<SteamAccountService>(SteamAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
