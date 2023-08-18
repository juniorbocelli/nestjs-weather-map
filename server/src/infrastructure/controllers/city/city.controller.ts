import { Body, Controller, Inject, Post, Delete, Get, Req, Query, ParseIntPipe } from '@nestjs/common';
import { ApiExtraModels, ApiResponse, ApiTags } from '@nestjs/swagger';
// usecases
import { AddCityUseCases } from 'src/usecases/city/addCity.usecases';
import { DeleteCityUseCases } from 'src/usecases/city/deleteCity.usecases';
import { GetCitiesInformationsUseCases } from 'src/usecases/city/getCitiesInformations.usecases';
import { IsAuthenticatedUseCases } from '../../../usecases/auth/isAuthenticated.usecases';
import { UseCaseProxy } from 'src/infrastructure/usecases-proxy/usecases-proxy';
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
//
import { ApiResponseType } from '../../common/swagger/response.decorator';
import { AddCityDto } from 'src/infrastructure/controllers/city/city.dto';
import { CityPresenter } from 'src/infrastructure/controllers/city/city.presenter';

@Controller('city')
@ApiTags('city')
@ApiResponse({ status: 500, description: 'Internal error' })
@ApiExtraModels(CityPresenter)
export class CityController {
  constructor(
    @Inject()
    private readonly isAuthUsecaseProxy: UseCaseProxy<IsAuthenticatedUseCases>,

    @Inject(UsecasesProxyModule.POST_CITY_USECASES_PROXY)
    private readonly addCityUsecaseProxy: UseCaseProxy<AddCityUseCases>,
    @Inject(UsecasesProxyModule.DELETE_CITY_USECASES_PROXY)
    private readonly deleteCityUsecaseProxy: UseCaseProxy<DeleteCityUseCases>,
    @Inject(UsecasesProxyModule.GET_CITIES_INFORMATIONS_USECASES_PROXY)
    private readonly getCitiesInformationsUsecaseProxy: UseCaseProxy<GetCitiesInformationsUseCases>,
  ) { };

  @Post()
  @ApiResponseType(CityPresenter, false)
  async addCity(@Body() addCityDto: AddCityDto, @Req() request: any) {
    const { name } = addCityDto;
    const loggedUser = await this.isAuthUsecaseProxy.getInstance().execute(request.user.username);
    const cityCreated = await this.addCityUsecaseProxy.getInstance().execute(name, loggedUser.id);

    return new CityPresenter(cityCreated);
  };

  @Delete()
  async deleteCity(@Query('id', ParseIntPipe) id: number, @Req() request: any) {
    const loggedUser = await this.isAuthUsecaseProxy.getInstance().execute(request.user.username);
    await this.deleteCityUsecaseProxy.getInstance().execute(id, loggedUser.id);

    return 'success';
  };

  @Get()
  async getCitiesInformations(@Query('lang') lang: string, @Query('units') units: string, @Req() request: any) {
    const loggedUser = await this.isAuthUsecaseProxy.getInstance().execute(request.user.username);
    const informations = await this.getCitiesInformationsUsecaseProxy.getInstance().execute(loggedUser.id, lang, units);

    return informations;
  };
}
