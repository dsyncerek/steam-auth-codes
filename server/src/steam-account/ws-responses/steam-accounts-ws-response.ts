import { WsResponse } from '@nestjs/websockets';
import { SteamAccount } from '../entity/steam-account.entity';

export class SteamAccountsWsResponse implements WsResponse {
  data: SteamAccount[];
  event: string = 'accounts';

  constructor(data: SteamAccount[]) {
    this.data = data;
  }
}
