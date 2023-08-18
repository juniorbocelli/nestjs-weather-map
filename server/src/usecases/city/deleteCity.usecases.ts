import { ILogger } from 'src/domain/logger/logger.interface';
import { CityRepository } from 'src/domain/repositories/cityRepository.interface';

export class DeleteCityUseCases {
  constructor(private readonly logger: ILogger, private readonly cityRepository: CityRepository) { }

  async execute(id: number, userId: number): Promise<void> {
    const city = await this.cityRepository.findById(id);
    if (city.user.id === userId)
      await this.cityRepository.deleteById(id);

    this.logger.log('deleteCityUseCases execute', `City ${id} have been deleted`);
  };
}
