import { SteamAccountsWsResponse } from './steam-accounts-ws-response';

describe('SteamAccountsWsResponse', () => {
  it('should create SteamAccountsWsResponse', () => {
    const response = new SteamAccountsWsResponse([]);

    expect(response).toBeDefined();
    expect(response.event).toBe('accounts');
    expect(response.data).toStrictEqual([]);
  });
});
