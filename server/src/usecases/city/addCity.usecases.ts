// domain model
import { CityM } from 'src/domain/model/city';
import { UserM } from 'src/domain/model/user';
// interfaces
import { ILogger } from 'src/domain/logger/logger.interface';
import { CityRepository } from '../../domain/repositories/cityRepository.interface';
// services

export class AddCityUseCases {
  constructor(
    private readonly logger: ILogger,
    private readonly cityRepository: CityRepository) { };

  async execute(name: string, userId: number): Promise<CityM> {
    const city = new CityM();

    city.name = name;
    const user = new UserM();
    user.id = userId;

    city.user = user;

    const result = await this.cityRepository.insert(city);
    this.logger.log('addCityUseCases execute', 'New city have been inserted');

    return result;
  };
}
