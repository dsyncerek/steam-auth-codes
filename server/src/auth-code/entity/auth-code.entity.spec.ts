import { AuthCode } from './auth-code.entity';

describe('AuthCode', () => {
  it('should create AuthCode', () => {
    const authCode = new AuthCode({ code: 'X2331', validity: 20000, generatedAt: 0 });

    expect(authCode).toBeDefined();
    expect(authCode.code).toBe('X2331');
    expect(authCode.validity).toBe(20000);
    expect(authCode.generatedAt).toBe(0);
  });
});
