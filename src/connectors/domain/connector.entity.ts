export class ConnectorEntity {
  constructor(
    public readonly provider: string,
    public readonly accessToken: string,
    public readonly refreshToken?: string,
    public readonly expiresIn?: number,
  ) {}
}
