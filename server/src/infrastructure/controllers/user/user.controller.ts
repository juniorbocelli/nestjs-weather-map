import { Body, Controller, Inject, Post, UseGuards, Req } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
// usecases
import { AddUserUseCases } from 'src/usecases/user/addUser.usecases';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
//
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';
import { AddUserDto } from 'src/infrastructure/controllers/user/user.dto';
import { UserPresenter } from 'src/infrastructure/controllers/user/user.presenter';
import { LoginGuard } from 'src/infrastructure/common/guards/login.guard';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';
import { LoggerService } from 'src/infrastructure/logger/logger.service';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.POST_USER_USECASES_PROXY)
    private readonly addUserUseCaseProxy: UseCaseProxy<AddUserUseCases>,
  ) { };

  @Post()
  @UseGuards(LoginGuard)
  @ApiResponseType(UserPresenter, false)
  async addUser(@Body() addUserDto: AddUserDto, @Req() request: any) {
    // Testing if exist a logged user
    if (request.user) {
      (new LoggerService).warn('UserController.addUser', `Exist logget user`);
      (new ExceptionsService).badRequestException({ code_error: 400, message: "Ja existe um usuário logado" });
    };

    const { username, password } = addUserDto;
    const userCreated = await this.addUserUseCaseProxy.getInstance().execute(username, password);

    return new UserPresenter(userCreated);
  };
}
