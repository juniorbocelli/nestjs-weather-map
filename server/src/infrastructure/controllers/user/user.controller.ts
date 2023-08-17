import { Body, Controller, Inject, Post } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
// usecases
import { AddUserUseCases } from '../../../usecases/user/addUser.usecases';
import { UseCaseProxy } from '../../usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from '../../usecases-proxy/usecases-proxy.module';
//
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { AddUserDto } from './user.dto';
import { UserPresenter } from './user.presenter';

@Controller('user')
@ApiTags('user')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(UserPresenter)
export class TodoController {
  constructor(
    @Inject(UsecasesProxyModule.POST_USER_USECASES_PROXY)
    private readonly addUserUsecaseProxy: UseCaseProxy<AddUserUseCases>,
  ) { };

  @Post()
  @ApiResponseType(UserPresenter, true)
  async addTodo(@Body() addUserDto: AddUserDto) {
    const { username, password } = addUserDto;
    const userCreated = await this.addUserUsecaseProxy.getInstance().execute(username, password);

    return new UserPresenter(userCreated);
  };
}
