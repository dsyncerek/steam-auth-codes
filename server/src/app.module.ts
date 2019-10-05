import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { accounts } from './config/accounts';
import { SteamAccountModule } from './steam-account/steam-account.module';

const clientBuildPath = join(__dirname, '../..', 'client/build');

@Module({
  imports: [ServeStaticModule.forRoot({ rootPath: clientBuildPath }), SteamAccountModule.register(accounts)],
})
export class AppModule {}
