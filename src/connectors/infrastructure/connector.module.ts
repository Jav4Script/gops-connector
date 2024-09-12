import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { AppConfigModule } from '../../config/app-config.module';
import { ConnectorController } from './connector.controller';
import { ConnectorService } from './connector.service';
import { JiraProvider } from './providers/jira.provider';

@Module({
  imports: [HttpModule, AppConfigModule],
  controllers: [ConnectorController],
  providers: [ConnectorService, JiraProvider],
})
export class ConnectorModule {}
