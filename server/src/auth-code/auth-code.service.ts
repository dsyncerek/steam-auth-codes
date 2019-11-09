import { Injectable } from '@nestjs/common';
import { generateAuthCode } from 'steam-totp';
import { AuthCode } from './auth-code.entity';

@Injectable()
export class AuthCodeService {
  generateAuthCode(sharedSecret: string): AuthCode {
    return {
      code: generateAuthCode(sharedSecret),
      generatedAt: Date.now(),
      validity: this.getValidity(),
    };
  }

  getValidity(): number {
    const codeValidityTime = 30 * 1000;
    return codeValidityTime - (Date.now() % codeValidityTime);
  }
}
