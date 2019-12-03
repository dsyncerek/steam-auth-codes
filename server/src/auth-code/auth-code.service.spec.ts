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
      jest.spyOn(Date, 'now').mockReturnValue(10000);

      const authCode = service.generateAuthCode('shared_secret');

      expect(authCode.code).toMatch(/[\w\d]{5}/);
      expect(authCode.generatedAt).toBe(10000);
      expect(authCode.validity).toBe(20000);
    });
  });

  describe('getCodeCurrentValidity()', () => {
    it('should return validity from correct range', () => {
      const validity = service.getCodeCurrentValidity();

      expect(validity).toBeGreaterThan(0);
      expect(validity).toBeLessThanOrEqual(30000);
    });

    it('should return correct validity when timestamp is less than validity time', () => {
      jest.spyOn(Date, 'now').mockReturnValue(10000);

      const validity = service.getCodeCurrentValidity();

      expect(validity).toBe(20000);
    });

    it('should return correct validity when timestamp is greater that validity time', () => {
      jest.spyOn(Date, 'now').mockReturnValue(50000);

      const validity = service.getCodeCurrentValidity();

      expect(validity).toBe(10000);
    });
  });
});
