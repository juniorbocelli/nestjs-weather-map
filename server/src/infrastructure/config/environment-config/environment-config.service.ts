import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DatabaseConfig } from 'src/domain/config/database.interface';
import { JWTConfig } from 'src/domain/config/jwt.interface';
import { OpenWeatherAPI } from 'src/domain/config/openWeatherApi.interface';

@Injectable()
export class EnvironmentConfigService implements DatabaseConfig, JWTConfig, OpenWeatherAPI {
  constructor(private configService: ConfigService) { }

  // Open Weather API
  getOpenWeatherKey(): string {
    return this.configService.get<string>('OPEN_WEATHER_KEY');
  };

  // JWT
  getJwtSecret(): string {
    return this.configService.get<string>('JWT_SECRET');
  };

  getJwtExpirationTime(): string {
    return this.configService.get<string>('JWT_EXPIRATION_TIME');
  };

  getJwtRefreshSecret(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_SECRET');
  };

  getJwtRefreshExpirationTime(): string {
    return this.configService.get<string>('JWT_REFRESH_TOKEN_EXPIRATION_TIME');
  };

  // Database
  getDatabaseHost(): string {
    return this.configService.get<string>('DATABASE_HOST');
  };

  getDatabasePort(): number {
    return this.configService.get<number>('DATABASE_PORT');
  };

  getDatabaseUser(): string {
    return this.configService.get<string>('DATABASE_USER');
  };

  getDatabasePassword(): string {
    return this.configService.get<string>('DATABASE_PASSWORD');
  };

  getDatabaseName(): string {
    return this.configService.get<string>('DATABASE_NAME');
  };

  getDatabaseSchema(): string {
    return this.configService.get<string>('DATABASE_SCHEMA');
  };

  getDatabaseSync(): boolean {
    return this.configService.get<boolean>('DATABASE_SYNCHRONIZE');
  };
}
