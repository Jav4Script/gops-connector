import { ConfigModule } from '@nestjs/config';
import { Module } from '@nestjs/common';

import { AppService } from './app.service';
import { ConnectorModule } from './connectors/infrastructure/connector.module';

@Module({
  imports: [ConnectorModule, ConfigModule],
  providers: [AppService],
})
export class AppModule {}
