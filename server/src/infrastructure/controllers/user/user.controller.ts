import { Body, Controller, Inject, Post, UseGuards, Req } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
// usecases
import { AddUserUseCases } from '../../../usecases/user/addUser.usecases';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
//
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { AddUserDto } from './user.dto';
import { UserPresenter } from './user.presenter';
import { LoginGuard } from 'src/infrastructure/common/guards/login.guard';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class UserController {
  constructor(
    @Inject(UsecasesProxyModule.POST_USER_USECASES_PROXY)
    private readonly addUserUsecaseProxy: UseCaseProxy<AddUserUseCases>,
  ) { };

  @Post()
  @UseGuards(LoginGuard)
  @ApiResponseType(UserPresenter, false)
  async addUser(@Body() addUserDto: AddUserDto, @Req() request: any) {
    const { username, password } = addUserDto;
    const userCreated = await this.addUserUsecaseProxy.getInstance().execute(username, password);

    return new UserPresenter(userCreated);
  };
}
