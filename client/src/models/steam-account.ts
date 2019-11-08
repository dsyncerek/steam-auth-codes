export default interface SteamAccount {
  username: string;
  authCode: string;
  validity: number;
  generatedAt: number;
}
