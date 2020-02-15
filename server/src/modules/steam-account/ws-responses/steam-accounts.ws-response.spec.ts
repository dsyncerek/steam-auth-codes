import { SteamAccount } from '../entity/steam-account.entity';
import { SteamAccountsWsResponse } from './steam-accounts-ws-response';

describe('SteamAccountsWsResponse', () => {
  it('should create SteamAccountsWsResponse with empty array', () => {
    const response = new SteamAccountsWsResponse([]);

    expect(response).toBeDefined();
    expect(response.event).toBe('accounts');
    expect(response.data).toStrictEqual([]);
  });

  it('should create SteamAccountsWsResponse with accounts array', () => {
    const steamAccount = new SteamAccount({ username: 'lorem', sharedSecret: 'ipsum' });
    const response = new SteamAccountsWsResponse([steamAccount]);

    expect(response).toBeDefined();
    expect(response.event).toBe('accounts');
    expect(response.data).toStrictEqual([steamAccount]);
  });
});
