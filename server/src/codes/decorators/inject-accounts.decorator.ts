import { Inject } from '@nestjs/common';

export const ACCOUNTS_TOKEN = 'ACCOUNTS_TOKEN';

export const InjectAccounts = (): any => {
  return Inject(ACCOUNTS_TOKEN);
};
