import { Injectable } from '@nestjs/common';
import { generateAuthCode } from 'steam-totp';
import { AuthCode } from './entity/auth-code.entity';

@Injectable()
export class AuthCodeService {
  public codeValidityTime: number = 30000;

  public generateAuthCode(sharedSecret: string): AuthCode {
    return new AuthCode({
      code: generateAuthCode(sharedSecret),
      generatedAt: Date.now(),
      validity: this.codeCurrentValidityTime,
    });
  }

  private get codeCurrentValidityTime(): number {
    return this.codeValidityTime - (Date.now() % this.codeValidityTime);
  }
}
