import { Test, TestingModule } from '@nestjs/testing';
import { AuthCodeService } from './auth-code.service';

describe('AuthCodeService', () => {
  let service: AuthCodeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthCodeService],
    }).compile();

    service = module.get<AuthCodeService>(AuthCodeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateAuthCode()', () => {
    it('should return correct auth code', () => {
      const authCode = service.generateAuthCode('shared_secret');

      expect(authCode.code).toMatch(/[\w\d]{5}/);
    });
  });

  it('should return validity from correct range', () => {
    const authCode = service.generateAuthCode('shared_secret');

    expect(authCode.validity).toBeGreaterThan(0);
    expect(authCode.validity).toBeLessThanOrEqual(30000);
  });

  it('should return correct validity when timestamp is less than validity time', () => {
    jest.spyOn(Date, 'now').mockReturnValue(10000);

    const authCode = service.generateAuthCode('shared_secret');

    expect(authCode.validity).toBe(20000);
  });

  it('should return correct validity when timestamp is greater that validity time', () => {
    jest.spyOn(Date, 'now').mockReturnValue(50000);

    const authCode = service.generateAuthCode('shared_secret');

    expect(authCode.validity).toBe(10000);
  });

  it('should return correct generatedAt', () => {
    jest.spyOn(Date, 'now').mockReturnValue(10000);

    const authCode = service.generateAuthCode('shared_secret');

    expect(authCode.generatedAt).toBe(10000);
  });
});
