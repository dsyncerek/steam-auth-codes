import { Injectable } from '@nestjs/common';
import { generateAuthCode } from 'steam-totp';

@Injectable()
export class AuthCodeService {
  generateAuthCode(sharedSecret: string): string {
    return generateAuthCode(sharedSecret);
  }

  getValidity(): number {
    const codeValidityTime = 30 * 1000;
    return codeValidityTime - (Date.now() % codeValidityTime);
  }
}
