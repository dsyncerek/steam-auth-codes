import { Test, TestingModule } from '@nestjs/testing';
import { SteamAccountGateway } from './steam-account.gateway';
import { SteamAccountService } from './steam-account.service';

describe('SteamAccountGateway', () => {
  let gateway: SteamAccountGateway;

  const steamAccountServiceMock = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SteamAccountGateway, { provide: SteamAccountService, useValue: steamAccountServiceMock }],
    }).compile();

    gateway = module.get<SteamAccountGateway>(SteamAccountGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });

  it('getAccounts()', () => {});
});
