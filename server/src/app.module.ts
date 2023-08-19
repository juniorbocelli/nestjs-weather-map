import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
//
import { LoggerModule } from 'src/infrastructure/logger/logger.module';
import { ExceptionsModule } from 'src/infrastructure/exceptions/exceptions.module';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { ControllersModule } from 'src/infrastructure/controllers/controllers.module';
import { BcryptModule } from './infrastructure/services/bcrypt/bcrypt.module';
import { JwtModule as JwtServiceModule } from 'src/infrastructure/services/jwt/jwt.module';
import { OpenWeatherModule } from 'src/infrastructure/services/openWeather/openWeather.module';
import { EnvironmentConfigModule } from 'src/infrastructure/config/environment-config/environment-config.module';
import { LocalStrategy } from 'src/infrastructure/common/strategies/local.strategy';
import { JwtStrategy } from 'src/infrastructure/common/strategies/jwt.strategy';
import { JwtRefreshTokenStrategy } from 'src/infrastructure/common/strategies/jwtRefresh.strategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: process.env.secret,
    }),
    LoggerModule,
    ExceptionsModule,
    UsecasesProxyModule.register(),
    ControllersModule,
    BcryptModule,
    JwtServiceModule,
    OpenWeatherModule,
    EnvironmentConfigModule,
  ],
  providers: [LocalStrategy, JwtStrategy, JwtRefreshTokenStrategy],
})
export class AppModule { }
