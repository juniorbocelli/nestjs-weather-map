import { Module } from '@nestjs/common';
//
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';

@Module({
  providers: [BcryptService],
  exports: [BcryptService]
})
export class BcryptModule { }
