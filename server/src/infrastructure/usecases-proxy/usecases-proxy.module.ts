import { DynamicModule, Module } from '@nestjs/common';
// auth
import { IsAuthenticatedUseCases } from 'src/usecases/auth/isAuthenticated.usecases';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { LogoutUseCases } from 'src/usecases/auth/logout.usecases';
// user
import { AddUserUseCases } from 'src/usecases/user/addUser.usecases';
// city
import { AddCityUseCases } from 'src/usecases/city/addCity.usecases';
import { DeleteCityUseCases } from 'src/usecases/city/deleteCity.usecases';
import { GetCitiesInformationsUseCases } from 'src/usecases/city/getCitiesInformations.usecases';

// modules
import { BcryptModule } from 'src/infrastructure/services/bcrypt/bcrypt.module';
import { JwtModule } from 'src/infrastructure/services/jwt/jwt.module';
import { RepositoriesModule } from 'src/infrastructure/repositories/repositories.module';
import { OpenWeatherModule } from 'src/infrastructure/services/openWeather/openWeather.module';
import { ExceptionsModule } from 'src/infrastructure/exceptions/exceptions.module';
import { LoggerModule } from 'src/infrastructure/logger/logger.module';

// services
import { BcryptService } from 'src/infrastructure/services/bcrypt/bcrypt.service';
import { JwtTokenService } from 'src/infrastructure/services/jwt/jwt.service';
import { OpenWeatherService } from 'src/infrastructure/services/openWeather/openWeather.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

import { DatabaseUserRepository } from 'src/infrastructure/repositories/user.repository';
import { DatabaseCityRepository } from 'src/infrastructure/repositories/city.repository';

import { EnvironmentConfigModule } from 'src/infrastructure/config/environment-config/environment-config.module';
import { EnvironmentConfigService } from 'src/infrastructure/config/environment-config/environment-config.service';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';

@Module({
  imports: [LoggerModule, ExceptionsModule, JwtModule, BcryptModule, OpenWeatherModule, EnvironmentConfigModule, RepositoriesModule],
})
export class UsecasesProxyModule {
  // Auth
  static LOGIN_USECASES_PROXY = 'LoginUseCasesProxy';
  static IS_AUTHENTICATED_USECASES_PROXY = 'IsAuthenticatedUseCasesProxy';
  static LOGOUT_USECASES_PROXY = 'LogoutUseCasesProxy';

  // User
  static POST_USER_USECASES_PROXY = 'PostUserUseCasesProxy';

  // City
  static POST_CITY_USECASES_PROXY = 'PostCityUseCasesProxy';
  static DELETE_CITY_USECASES_PROXY = 'DeleteCityUseCasesProxy';
  static GET_CITIES_INFORMATIONS_USECASES_PROXY = 'GetCitiesInformationsUseCasesProxy';

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
          inject: [LoggerService, ExceptionsService, DatabaseUserRepository, BcryptService],
          provide: UsecasesProxyModule.POST_USER_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            exceptionService: ExceptionsService,
            userRepository: DatabaseUserRepository,
            bcryptService: BcryptService) =>
            new UseCaseProxy(new AddUserUseCases(logger, exceptionService, userRepository, bcryptService)),
        },
        // city
        {
          inject: [LoggerService, ExceptionsService, OpenWeatherService, EnvironmentConfigService, DatabaseCityRepository],
          provide: UsecasesProxyModule.POST_CITY_USECASES_PROXY,
          useFactory: (
            logger: LoggerService,
            exceptionService: ExceptionsService,
            openWeather: OpenWeatherService,
            config: EnvironmentConfigService,
            cityRepository: DatabaseCityRepository) =>
            new UseCaseProxy(new AddCityUseCases(logger, exceptionService, config, openWeather, cityRepository)),
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
