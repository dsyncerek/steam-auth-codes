import { Test, TestingModule } from '@nestjs/testing';
import { SteamAccountService } from './steam-account.service';

describe('SteamAccountService', () => {
  let service: SteamAccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SteamAccountService],
    }).compile();

    service = module.get<SteamAccountService>(SteamAccountService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
