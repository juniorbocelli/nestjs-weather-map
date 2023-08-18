// domain model
import { OpenWeatherM } from 'src/domain/model/openWeather';
// interfaces
import { ILogger } from 'src/domain/logger/logger.interface';
import { CityRepository } from '../../domain/repositories/cityRepository.interface';
// services
import { OpenWeatherService } from 'src/infrastructure/services/openWeather/openWeather.service';

export class GetCitiesInformationsUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly openWeather: OpenWeatherService,
    private readonly cityRepository: CityRepository) { };

  async execute(userId: number, lang?: string, units?: string): Promise<OpenWeatherM[]> {
    const informations: OpenWeatherM[] = [];

    const citiesFromUser = await this.cityRepository.findAllFromUser(userId);
    for (let i = 0; i < citiesFromUser.length; i++) {
      const info = await this.openWeather.getWeatherInfo({ cityName: citiesFromUser[i].name, lang: lang, units: units });

      informations.push({
        id: citiesFromUser[i].id,
        main: info.main,
        weather: info.weather[0]
      });
    };

    this.logger.log('getCitiesInformationsUseCases execute', 'Get cities informations have been permormed');

    return informations;
  };
}
