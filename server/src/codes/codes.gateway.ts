import { SubscribeMessage, WebSocketGateway, WsResponse } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CodesService } from './codes.service';
import { SteamAccount } from './entities/steam-account.entity';

@WebSocketGateway(+process.env.WEBSOCKET_PORT)
export class CodesGateway {
  constructor(private readonly codesService: CodesService) {}

  @SubscribeMessage('codes')
  getCodes(): Observable<WsResponse<SteamAccount[]>> {
    return this.codesService.authCodes$.pipe(map(data => ({ event: 'codes', data })));
  }
}
