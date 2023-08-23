import { Body, Controller, Get, Inject, Post, Patch, Req, Request, UseGuards, Res } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiExtraModels, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

//
import { AuthLoginDto } from 'src/infrastructure/controllers/auth/auth.dto.class';
import { IsAuthPresenter, AuthPresenter } from 'src/infrastructure/controllers/auth/auth.presenter';

import JwtRefreshGuard from 'src/infrastructure/common/guards/jwtRefresh.guard';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';
import { LoginGuard } from 'src/infrastructure/common/guards/login.guard';

import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { LoginUseCases } from 'src/usecases/auth/login.usecases';
import { IsAuthenticatedUseCases } from 'src/usecases/auth/isAuthenticated.usecases';
import { LogoutUseCases } from 'src/usecases/auth/logout.usecases';

import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';

@Controller('auth')
@ApiTags('auth')
@ApiResponse({
  status: 401,
  description: 'No authorization token was found',
})
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(IsAuthPresenter)
export class AuthController {
  constructor(
    @Inject(UsecasesProxyModule.LOGIN_USECASES_PROXY)
    private readonly loginUseCaseProxy: UseCaseProxy<LoginUseCases>,
    @Inject(UsecasesProxyModule.LOGOUT_USECASES_PROXY)
    private readonly logoutUseCaseProxy: UseCaseProxy<LogoutUseCases>,
    @Inject(UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
    private readonly isAuthUseCaseProxy: UseCaseProxy<IsAuthenticatedUseCases>,
  ) { }

  @Post('login')
  @UseGuards(LoginGuard)
  @ApiBearerAuth()
  @ApiBody({ type: AuthLoginDto })
  @ApiOperation({ description: 'login' })
  @ApiResponseType(AuthPresenter, false)
  async login(@Body() auth: AuthLoginDto, @Request() request: any, @Res() res: any) {
    const accessTokenCookie = await this.loginUseCaseProxy.getInstance().getCookieWithJwtToken(auth.username);
    const refreshTokenCookie = await this.loginUseCaseProxy.getInstance().getCookieWithJwtRefreshToken(auth.username);
    request.res.setHeader('Set-Cookie', [accessTokenCookie, refreshTokenCookie]);

    const loggedUser = await this.loginUseCaseProxy.getInstance().validateUserForJWTStragtegy(auth.username);
    const response = new AuthPresenter(loggedUser);

    return res.json(response);
  };

  @Patch('logout')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'logout' })
  async logout(@Request() request: any, @Res() res: any) {
    const cookie = await this.logoutUseCaseProxy.getInstance().execute();
    request.res.setHeader('Set-Cookie', cookie);

    return res.json({ message: 'Logout feito com sucesso' });
  };

  @Get('is-authenticated')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ description: 'is-authenticated' })
  @ApiResponseType(IsAuthPresenter, false)
  async isAuthenticated(@Req() request: any, @Res() res: any) {
    const user = await this.isAuthUseCaseProxy.getInstance().execute(request.user.username);
    const response = new IsAuthPresenter(user);

    return res.json(response);
  };

  @Get('refresh')
  @UseGuards(JwtRefreshGuard)
  @ApiBearerAuth()
  async refresh(@Req() request: any) {
    const accessTokenCookie = await this.loginUseCaseProxy.getInstance().getCookieWithJwtToken(request.user.username);
    request.res.setHeader('Set-Cookie', accessTokenCookie);

    return 'Refresh feito com sucesso';
  };
}
