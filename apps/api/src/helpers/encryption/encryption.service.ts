import { Injectable } from '@nestjs/common';
import {
  BinaryLike,
  createCipheriv,
  createDecipheriv,
  randomBytes,
  scrypt,
} from 'crypto';
import { promisify } from 'util';
import { EnvService } from '../../env/env.service';
import { LoggingService } from '../../logging/logging.service';

@Injectable()
export class EncryptionService {
  constructor(
    private readonly envService: EnvService,
    private readonly logger: LoggingService,
  ) {
    this.logger.setContext('EncryptionService');
  }

  async encrypt(text: BinaryLike): Promise<string> {
    try {
      const iv = randomBytes(16);
      const password = this.envService.get('ENCRYPTION_PASSWORD');

      // The key length is dependent on the algorithm.
      // In this case for aes256, it is 32 bytes.
      const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
      const cipher = createCipheriv('aes-256-ctr', key, iv);

      const encryptedText = Buffer.concat([
        cipher.update(text),
        cipher.final(),
      ]);

      return `${iv.toString('hex')}:${encryptedText.toString('hex')}`;
    } catch (error) {
      this.logger.handleError(error, 'Failed to encrypt text');
    }
  }

  async decrypt(encryptedText: string): Promise<string> {
    try {
      const [ivHex, textHex] = encryptedText.split(':');
      const iv = Buffer.from(ivHex, 'hex');
      const password = this.envService.get('ENCRYPTION_PASSWORD');

      // The key length is dependent on the algorithm.
      // In this case for aes256, it is 32 bytes.
      const key = (await promisify(scrypt)(password, 'salt', 32)) as Buffer;
      const decipher = createDecipheriv('aes-256-ctr', key, iv);

      const decryptedText = Buffer.concat([
        decipher.update(Buffer.from(textHex, 'hex')),
        decipher.final(),
      ]);

      return decryptedText.toString();
    } catch (error) {
      this.logger.handleError(error, 'Failed to decrypt text');
    }
  }
}
