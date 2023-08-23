import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment-config.service';
import { validate } from 'src/infrastructure/config/environment-config/environment-config.validation';
import { getEnvironmentFile } from 'src/infrastructure/common/utils/environment.util';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: getEnvironmentFile(),
      ignoreEnvFile: process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test' ? false : true,
      isGlobal: true,
      validate,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule { }
