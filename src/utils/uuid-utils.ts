import { Injectable } from '@nestjs/common';

@Injectable()
export class UuidUtils {
  public generate(): number {
    const uuid =
      Math.random().toString(36).substring(2, 4) +
      Math.random().toString(36).substring(2, 4);

    return parseInt(uuid, 36);
  }
}
