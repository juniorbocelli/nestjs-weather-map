import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable } from '@nestjs/common';
//
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { LoggerService } from 'src/infrastructure/logger/logger.service';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { TokenPayload } from 'src/domain/model/auth';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUseCaseProxy: UseCaseProxy<LoginUseCases>,
    private readonly logger: LoggerService,
    private readonly exceptionService: ExceptionsService,
  ) {
    super();
  };

  async validate(username: string, password: string) {
    if (!username || !password) {
      this.logger.warn('LocalStrategy', `Username or password is missing, BadRequestException`);
      this.exceptionService.UnauthorizedException({ code_error: 401, message: 'Username ou senha inválidos' });
    };

    const user = await this.loginUseCaseProxy.getInstance().validateUserForLocalStragtegy(username, password);
    if (!user) {
      this.logger.warn('LocalStrategy', `Invalid username or password`);
      this.exceptionService.UnauthorizedException({ code_error: 401, message: 'Username ou senha inválidos' });
    };

    return user;
  };
}
