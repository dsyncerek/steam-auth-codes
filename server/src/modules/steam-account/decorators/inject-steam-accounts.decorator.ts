import { Inject } from '@nestjs/common';

export const STEAM_ACCOUNTS_TOKEN = 'STEAM_ACCOUNTS_TOKEN';

export const InjectSteamAccounts = (): any => Inject(STEAM_ACCOUNTS_TOKEN);
