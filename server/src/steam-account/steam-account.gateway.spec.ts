import { Test, TestingModule } from '@nestjs/testing';
import { SteamAccountGateway } from './steam-account.gateway';

describe('SteamAccountGateway', () => {
  let gateway: SteamAccountGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SteamAccountGateway],
    }).compile();

    gateway = module.get<SteamAccountGateway>(SteamAccountGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
