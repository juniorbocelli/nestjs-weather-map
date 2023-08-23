// domain model
import { CityM } from 'src/domain/model/city';
import { UserM } from 'src/domain/model/user';
// interfaces
import { ILogger } from 'src/domain/logger/logger.interface';
import { CityRepository } from '../../domain/repositories/cityRepository.interface';
import { OpenWeatherAPI } from 'src/domain/config/openWeatherApi.interface';
// services
import { OpenWeatherService } from 'src/infrastructure/services/openWeather/openWeather.service';
import { ExceptionsService } from 'src/infrastructure/exceptions/exceptions.service';

export class AddCityUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly exceptionService: ExceptionsService,
    private readonly config: OpenWeatherAPI,
    private readonly openWeather: OpenWeatherService,
    private readonly cityRepository: CityRepository) { };

  async execute(name: string, userId: number): Promise<CityM> {
    // Testing if city exist
    const idOrError: number | string = await this.getCityId(name);

    if (toString.call(idOrError) === "[object String]") {
      this.logger.error('addCityUseCases execute', `Error: ${idOrError}`);
      this.exceptionService.badRequestException({ code_error: 400, message: "Cidade não encontrada" });
    };

    // Testing if city already added
    if ((await this.isAlreadySaved(userId, idOrError as number))) {
      this.logger.warn('addCityUseCases execute', `City ${idOrError} already in user city list`);
      this.exceptionService.badRequestException({ code_error: 400, message: "A cidade já foi inserida" });
    };

    const city = new CityM();

    city.apiId = idOrError as number;

    const user = new UserM();
    user.id = userId;

    city.user = user;

    const result = await this.cityRepository.insert(city);
    this.logger.log('addCityUseCases execute', 'New city have been inserted');

    return result;
  };

  async getCityId(name: string): Promise<number | string> {
    try {
      const cityData = await this.openWeather.getWeatherInfoByName(name, this.config.getOpenWeatherKey());

      return cityData.id;
    } catch (error) {

      return error.message as string;
    };
  };

  async isAlreadySaved(userId: number, cityId: number): Promise<boolean> {
    const allcitiesFromUser = await this.cityRepository.findAllFromUser(userId);

    for (let c of allcitiesFromUser)
      if (c.apiId === cityId)
        return true;

    return false;
  };
}
