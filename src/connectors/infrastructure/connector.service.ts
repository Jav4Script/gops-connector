import { Injectable } from '@nestjs/common';

import { JiraProvider } from './providers/jira.provider';
import { BaseProvider } from './providers/base.provider';

@Injectable()
export class ConnectorService {
  constructor(private readonly jiraProvider: JiraProvider) {}

  getProvider(providerName: string): BaseProvider {
    switch (providerName) {
      case 'jira':
        return this.jiraProvider;

      default:
        throw new Error('Provider não suportado');
    }
  }
}
