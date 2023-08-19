import {
  Body,
  Controller,
  Inject,
  Post,
  Delete,
  Get,
  Req,
  Query,
  ParseIntPipe,
  UseGuards
} from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
// usecases
import { AddCityUseCases } from 'src/usecases/city/addCity.usecases';
import { DeleteCityUseCases } from 'src/usecases/city/deleteCity.usecases';
import { GetCitiesInformationsUseCases } from 'src/usecases/city/getCitiesInformations.usecases';
import { IsAuthenticatedUseCases } from 'src/usecases/auth/isAuthenticated.usecases';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
//
import { ApiResponseType } from 'src/infrastructure/common/swagger/response.decorator';
import { AddCityDto } from 'src/infrastructure/controllers/city/city.dto';
import { CityPresenter } from 'src/infrastructure/controllers/city/city.presenter';
import { JwtAuthGuard } from 'src/infrastructure/common/guards/jwtAuth.guard';

@Controller('city')
@ApiTags('city')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CityPresenter)
export class CityController {
  constructor(
    @Inject(UsecasesProxyModule.IS_AUTHENTICATED_USECASES_PROXY)
    private readonly isAuthUseCaseProxy: UseCaseProxy<IsAuthenticatedUseCases>,

    @Inject(UsecasesProxyModule.POST_CITY_USECASES_PROXY)
    private readonly addCityUseCaseProxy: UseCaseProxy<AddCityUseCases>,
    @Inject(UsecasesProxyModule.DELETE_CITY_USECASES_PROXY)
    private readonly deleteCityUseCaseProxy: UseCaseProxy<DeleteCityUseCases>,
    @Inject(UsecasesProxyModule.GET_CITIES_INFORMATIONS_USECASES_PROXY)
    private readonly getCitiesInformationsUseCaseProxy: UseCaseProxy<GetCitiesInformationsUseCases>,
  ) { };

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiResponseType(CityPresenter, false)
  async addCity(@Body() addCityDto: AddCityDto, @Req() request: any) {
    const { name } = addCityDto;
    const loggedUser = await this.isAuthUseCaseProxy.getInstance().execute(request.user.username);
    const cityCreated = await this.addCityUseCaseProxy.getInstance().execute(name, loggedUser.id);

    return new CityPresenter(cityCreated);
  };

  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteCity(@Query('id', ParseIntPipe) id: number, @Req() request: any) {
    const loggedUser = await this.isAuthUseCaseProxy.getInstance().execute(request.user.username);
    await this.deleteCityUseCaseProxy.getInstance().execute(id, loggedUser.id);

    return 'success';
  };

  @Get('city-informations')
  @UseGuards(JwtAuthGuard)
  async getCitiesInformations(@Query('lang') lang: string, @Query('units') units: string, @Req() request: any) {
    const loggedUser = await this.isAuthUseCaseProxy.getInstance().execute(request.user.username);
    const informations = await this.getCitiesInformationsUseCaseProxy.getInstance().execute(loggedUser.id, lang, units);

    return informations;
  };
}
