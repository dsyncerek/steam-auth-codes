import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';
import { SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SteamAccountService } from './steam-account.service';
import { SteamAccountsWsResponse } from './ws-responses/steam-accounts-ws-response';

@WebSocketGateway(+process.env.WEBSOCKET_PORT)
export class SteamAccountGateway {
  constructor(private readonly steamAccountService: SteamAccountService) {}

  @SubscribeMessage('accounts')
  @UseInterceptors(ClassSerializerInterceptor)
  getAccounts(): Observable<SteamAccountsWsResponse> {
    return this.steamAccountService.steamAccounts$.pipe(map(data => new SteamAccountsWsResponse(data)));
  }
}
