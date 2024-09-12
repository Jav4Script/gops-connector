import { firstValueFrom } from 'rxjs';

import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

import { AppConfigService } from '../../../config/app-config.service';
import { BaseProvider } from './base.provider';
import { ConnectorEntity } from '../../domain/connector.entity';
import { JiraConfigService } from '../../../config/jira/jira.config';
import {
  JIRA,
  JIRA_GRANT_TYPE,
  JIRA_PROMPT,
  JIRA_REFRESH_GRANT_TYPE,
  JIRA_RESPONSE_TYPE,
  JIRA_SCOPES,
} from '../../../common/constants/jira.constants';

@Injectable()
export class JiraProvider extends BaseProvider {
  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly httpService: HttpService,
    private readonly jiraConfigService: JiraConfigService,
  ) {
    super();
  }

  getConnectorUrl(): string {
    const queryParams = new URLSearchParams({
      audience: this.jiraConfigService.audience,
      client_id: this.jiraConfigService.clientId,
      scope: JIRA_SCOPES,
      redirect_uri: this.appConfigService.callbackUrl,
      state: JIRA, // TODO: Needs to implements a user session state for security
      response_type: JIRA_RESPONSE_TYPE,
      prompt: JIRA_PROMPT,
    });

    return `${this.jiraConfigService.authUrl}?${queryParams.toString()}`;
  }

  async exchangeCodeForToken(code: string): Promise<ConnectorEntity> {
    const body = {
      grant_type: JIRA_GRANT_TYPE,
      client_id: this.jiraConfigService.clientId,
      client_secret: this.jiraConfigService.clientSecret,
      code,
      redirect_uri: this.appConfigService.callbackUrl,
    };

    const response = await firstValueFrom(
      this.httpService.post(this.jiraConfigService.tokenUrl, body),
    );

    const { access_token, refresh_token, expires_in } = response.data;

    return new ConnectorEntity(JIRA, access_token, refresh_token, expires_in);
  }

  async refreshToken(refreshToken: string): Promise<ConnectorEntity> {
    const body = {
      grant_type: JIRA_REFRESH_GRANT_TYPE,
      client_id: this.jiraConfigService.clientId,
      client_secret: this.jiraConfigService.clientSecret,
      refresh_token: refreshToken,
    };

    try {
      const response = await firstValueFrom(
        this.httpService.post(this.jiraConfigService.tokenUrl, body),
      );

      const { access_token, refresh_token, expires_in } = response.data;

      return new ConnectorEntity(JIRA, access_token, refresh_token, expires_in);
    } catch (error) {
      console.error(
        'Error refreshing token:',
        error.response?.data || error.message,
      );
      throw error;
    }
  }
}
