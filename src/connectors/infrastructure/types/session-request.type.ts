import { Request } from 'express';

export interface SessionRequest extends Request {
  session: {
    state?: string;
    [key: string]: any;
  };
}
