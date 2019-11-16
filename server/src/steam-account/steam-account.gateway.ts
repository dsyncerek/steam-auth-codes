import { SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { plainToClass } from 'class-transformer';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SteamAccount } from './steam-account.entity';
import { SteamAccountService } from './steam-account.service';

@WebSocketGateway(+process.env.WEBSOCKET_PORT)
export class SteamAccountGateway {
  constructor(private readonly steamAccountService: SteamAccountService) {}

  @SubscribeMessage('accounts')
  getAccounts(): Observable<WsResponse<SteamAccount[]>> {
    return this.steamAccountService.accounts$.pipe(
      map(accounts => plainToClass(SteamAccount, accounts)),
      map(data => ({ event: 'accounts', data })),
    );
  }
}
