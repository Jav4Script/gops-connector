import { Injectable } from '@nestjs/common';

import { BaseProvider } from '../infrastructure/providers/base.provider';

@Injectable()
export class GetConnectorUrlUseCase {
  constructor(private readonly provider: BaseProvider) {}

  async execute(): Promise<string> {
    return this.provider.getConnectorUrl();
  }
}
