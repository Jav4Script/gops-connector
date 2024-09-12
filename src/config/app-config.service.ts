import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get callbackUrl(): string {
    return this.configService.get<string>('CALLBACK_URL');
  }

  get port(): string {
    return this.configService.get<string>('PORT');
  }
}
