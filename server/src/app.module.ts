import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { steamAccounts } from './config/steam-accounts';
import { SteamAccountModule } from './modules/steam-account/steam-account.module';

const clientBuildPath = join(__dirname, '../..', 'client/build');

@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: clientBuildPath }),
    ScheduleModule.forRoot(),
    SteamAccountModule.register(steamAccounts),
  ],
})
export class AppModule {}
