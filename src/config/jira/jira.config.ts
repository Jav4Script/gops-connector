import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JiraConfigService {
  constructor(private configService: ConfigService) {}

  get audience(): string {
    return this.configService.get<string>('JIRA_AUDIENCE');
  }

  get authUrl(): string {
    return this.configService.get<string>('JIRA_AUTH_URL');
  }

  get clientId(): string {
    return this.configService.get<string>('JIRA_CLIENT_ID');
  }

  get clientSecret(): string {
    return this.configService.get<string>('JIRA_CLIENT_SECRET');
  }

  get tokenUrl(): string {
    return this.configService.get<string>('JIRA_REDIRECT_URI');
  }
}
