import * as CryptoJS from 'crypto-js';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EncryptorService {
  constructor(private readonly configService: ConfigService) {}

  private get encryptKey(): string {
    return this.configService.get('ENCRYPTION_KEY');
  }

  encryptBody(body: string): string {
    return CryptoJS.AES.encrypt(body, this.encryptKey).toString();
  }

  decryptBody(body: any) {
    return CryptoJS.AES.decrypt(body, this.encryptKey).toString(
      CryptoJS.enc.Utf8,
    );
  }
}
