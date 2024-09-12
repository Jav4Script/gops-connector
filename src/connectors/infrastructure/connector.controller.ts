import { Response } from 'express';

import { Controller, Get, Query, Res } from '@nestjs/common';

import { ConnectorService } from './connector.service';
import { GetConnectorUrlUseCase } from '../usecases/get-connector-url.usecase';

@Controller('connectors')
export class ConnectorController {
  constructor(private readonly connectorService: ConnectorService) {}

  @Get('request-token')
  async requestToken(
    @Query('provider') provider: string,
    @Res() res: Response,
  ) {
    // TODO: Needs implements a session state creation to prevent CSRF attacks
    const providerService = this.connectorService.getProvider(provider);
    const authUrl = await new GetConnectorUrlUseCase(providerService).execute();

    return res.redirect(authUrl);
  }

  @Get('callback')
  async handleCallback(
    @Query('code') code: string,
    @Query('state') state: string,
  ) {
    // TODO: Needs implements a use session state to prevent CSRF attacks
    console.log('state', state);

    const providerService = this.connectorService.getProvider('jira');

    return await providerService.exchangeCodeForToken(code);
  }
}
