import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
//
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment-config.service';
import { validate } from 'src/infrastructure/config/environment-config/environment-config.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: './env/local.env',
      ignoreEnvFile: process.env.NODE_ENV === 'local' || process.env.NODE_ENV === 'test' ? false : true,
      isGlobal: true,
      validate,
    }),
  ],
  providers: [EnvironmentConfigService],
  exports: [EnvironmentConfigService],
})
export class EnvironmentConfigModule { }
