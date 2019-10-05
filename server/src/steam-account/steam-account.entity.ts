export class SteamAccount {
  username: string;
  sharedSecret: string;
  authCode?: string;
  validity?: number;
  generatedAt?: number;
}
