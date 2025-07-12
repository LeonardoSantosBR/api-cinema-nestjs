import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashService {
  private readonly saltOrRounds = 10;

  async encrypt(password: string | undefined): Promise<string> {
    return await bcrypt.hash(password, this.saltOrRounds);
  }

  async compare(password: string | undefined, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
