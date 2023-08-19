import { DynamicModule, Module } from '@nestjs/common';
// auth
import { IsAuthenticatedUseCases } from '../../usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from '../../usecases/auth/login.usecases';
import { LogoutUseCases } from '../../usecases/auth/logout.usecases';
// user
import { AddUserUseCases } from '../../usecases/user/addUser.usecases';
// city
import { AddCityUseCases } from '../../usecases/city/addCity.usecases';
import { DeleteCityUseCases } from '../../usecases/city/deleteCity.usecases';
import { GetCitiesInformationsUseCases } from '../../usecases/city/getCitiesInformations.usecases';

import { ExceptionsModule } from '../exceptions/exceptions.module';
import { LoggerModule } from '../logger/logger.module';
import { LoggerService } from '../logger/logger.service';

// modules
import { BcryptModule } from '../services/bcrypt/bcrypt.module';
import { JwtModule } from '../services/jwt/jwt.module';
import { RepositoriesModule } from '../repositories/repositories.module';
import { OpenWeatherModule } from '../services/openWeather/openWeather.module';

// services
import { BcryptService } from '../services/bcrypt/bcrypt.service';
import { JwtTokenService } from '../services/jwt/jwt.service';
import { OpenWeatherService } from '../services/openWeather/openWeather.service';

import { DatabaseUserRepository } from '../repositories/user.repository';
import { DatabaseCityRepository } from '../repositories/city.repository';

import { EnvironmentConfigModule } from '../config/environment-config/environment-config.module';
import { EnvironmentConfigService } from '../config/environment-config/environment-config.service';
import { UseCaseProxy } from './usecases-proxy';

@Module({
  imports: [LoggerModule, JwtModule, BcryptModule, OpenWeatherModule, EnvironmentConfigModule, RepositoriesModule, ExceptionsModule],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

  // User
  static POST_USER_USECASES_PROXY = 'postUserUsecasesProxy';

  // City
  static POST_CITY_USECASES_PROXY = 'postCityUsecasesProxy';
  static DELETE_CITY_USECASES_PROXY = 'deleteCityUsecasesProxy';
  static GET_CITIES_INFORMATIONS_USECASES_PROXY = 'getCitiesInformationsUsecasesProxy';

  static register(): DynamicModule {
    return {
      module: UsecasesProxyModule,
      providers: [
        {
          inject: [LoggerService, JwtTokenService, EnvironmentConfigService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.LOGIN_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            jwtTokenService: JwtTokenService,
            config: EnvironmentConfigService,
            userRepo: DatabaseUserRepository,
            bcryptService: BcryptService,
          ) => new UseCaseProxy(new LoginUseCases(logger, jwtTokenService, config, userRepo, bcryptService)),
        },
        {
          inject: [DatabaseUserRepository],
          provide: UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
          useFactory: (userRepo: DatabaseUserRepository) => new UseCaseProxy(new IsAuthenticatedUseCases(userRepo)),
        },
        {
          inject: [],
          provide: UsecasesProxyModule.LOGOUT_USECASES_PROXY,
          useFactory: () => new UseCaseProxy(new LogoutUseCases()),
        },
        // user
        {
          inject: [LoggerService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.POST_USER_USECASES_PROXY,
          useFactory: (logger: LoggerService, userRepository: DatabaseUserRepository, bcryptService: BcryptService) =>
            new UseCaseProxy(new AddUserUseCases(logger, userRepository, bcryptService)),
        },
        // city
        {
          inject: [LoggerService, DatabaseCityRepository],
          provide: UsecasesProxyModule.POST_CITY_USECASES_PROXY,
          useFactory: (logger: LoggerService, cityRepository: DatabaseCityRepository) =>
            new UseCaseProxy(new AddCityUseCases(logger, cityRepository)),
        },
        {
          inject: [LoggerService, DatabaseCityRepository],
          provide: UsecasesProxyModule.DELETE_CITY_USECASES_PROXY,
          useFactory: (logger: LoggerService, cityRepository: DatabaseCityRepository) =>
            new UseCaseProxy(new DeleteCityUseCases(logger, cityRepository)),
        },
        {
          inject: [LoggerService, EnvironmentConfigService, OpenWeatherService, DatabaseCityRepository],
          provide: UsecasesProxyModule.GET_CITIES_INFORMATIONS_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            config: EnvironmentConfigService,
            openWeather: OpenWeatherService,
            cityRepository: DatabaseCityRepository) => new UseCaseProxy(new GetCitiesInformationsUseCases(logger, config, openWeather, cityRepository),),
        },
      ],
      exports: [
        // auth
        UsecasesProxyModule.LOGIN_USECASES_PROXY,
        UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY,
        UsecasesProxyModule.LOGOUT_USECASES_PROXY,
        // user
        UsecasesProxyModule.POST_USER_USECASES_PROXY,
        // city
        UsecasesProxyModule.POST_CITY_USECASES_PROXY,
        UsecasesProxyModule.DELETE_CITY_USECASES_PROXY,
        UsecasesProxyModule.GET_CITIES_INFORMATIONS_USECASES_PROXY,
      ],
    };
  };
}
