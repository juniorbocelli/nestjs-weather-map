// domain model
import { OpenWeatherM } from 'src/domain/model/openWeather';
// interfaces
import { ILogger } from 'src/domain/logger/logger.interface';
import { CityRepository } from 'src/domain/repositories/cityRepository.interface';
// services
import { OpenWeatherService } from 'src/infrastructure/services/openWeather/openWeather.service';
//
import { OpenWeatherAPI } from 'src/domain/config/openWeatherApi.interface';

export class GetCitiesInformationsUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly config: OpenWeatherAPI,
    private readonly openWeather: OpenWeatherService,
    private readonly cityRepository: CityRepository) { };

  async execute(userId: number, lang?: string, units?: string): Promise<OpenWeatherM[]> {
    const informations: OpenWeatherM[] = [];
    const promises: Promise<OpenWeatherM>[] = [];

    const citiesFromUser = await this.cityRepository.findAllFromUser(userId);

    for (let i = 0; i < citiesFromUser.length; i++) {
      promises.push(this.openWeather.getWeatherInfoById(citiesFromUser[i].id, this.config.getOpenWeatherKey(), lang, units));
    };

    const resolves = await Promise.all(promises);
    resolves.forEach(r => {
      informations.push({
        id: r.id,
        main: r.main,
        weather: r.weather[0],
        name: r.name
      });
    });

    this.logger.log('getCitiesInformationsUseCases execute', 'Get cities informations have been permormed');

    return informations;
  };
}