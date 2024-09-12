import { ConnectorEntity } from '../../domain/connector.entity';

export abstract class BaseProvider {
  abstract getConnectorUrl(): string;

  abstract exchangeCodeForToken(code: string): Promise<ConnectorEntity>;
}
