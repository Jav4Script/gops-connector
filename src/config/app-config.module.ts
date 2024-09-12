import { ConfigModule, ConfigService } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AppConfigService } from './app-config.service';
import { JiraConfigService } from './jira/jira.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  providers: [AppConfigService, ConfigService, JiraConfigService],
  exports: [AppConfigService, ConfigService, JiraConfigService],
})
export class AppConfigModule {}
