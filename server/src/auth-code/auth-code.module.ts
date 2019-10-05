import { Module } from '@nestjs/common';
import { AuthCodeService } from './auth-code.service';

@Module({ providers: [AuthCodeService], exports: [AuthCodeService] })
export class AuthCodeModule {}
