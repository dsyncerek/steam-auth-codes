import { NestFactory } from '@nestjs/core';
import { config } from 'dotenv';

config();

(async (): Promise<void> => {
  const AppModule = (await import('./app.module')).AppModule;
  const app = await NestFactory.create(AppModule);
  await app.listen(+process.env.PORT);
})();
