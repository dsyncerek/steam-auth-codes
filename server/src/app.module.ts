import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { accounts } from '../config/accounts';
import { CodesModule } from './codes/codes.module';

const clientBuildPath = join(__dirname, '../..', 'client/build');

@Module({
  imports: [ServeStaticModule.forRoot({ rootPath: clientBuildPath }), CodesModule.register(accounts)],
})
export class AppModule {}
