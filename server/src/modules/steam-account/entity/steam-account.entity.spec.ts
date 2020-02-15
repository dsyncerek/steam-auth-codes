import { AuthCode } from '../../auth-code/entity/auth-code.entity';
import { SteamAccount } from './steam-account.entity';

describe('SteamAccount', () => {
  it('should create SteamAccount without authCode', () => {
    const steamAccount = new SteamAccount({ username: 'lorem', sharedSecret: 'ipsum' });

    expect(steamAccount).toBeDefined();
    expect(steamAccount.username).toBe('lorem');
    expect(steamAccount.sharedSecret).toBe('ipsum');
  });

  it('should create SteamAccount with authCode', () => {
    const authCode = new AuthCode({ code: 'X2331', validity: 20000, generatedAt: 0 });
    const steamAccount = new SteamAccount({ username: 'lorem', sharedSecret: 'ipsum', authCode });

    expect(steamAccount).toBeDefined();
    expect(steamAccount.username).toBe('lorem');
    expect(steamAccount.sharedSecret).toBe('ipsum');
    expect(steamAccount.authCode).toBe(authCode);
  });
});
