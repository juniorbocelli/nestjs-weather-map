import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CityM } from '../../domain/model/city';
import { CityRepository } from '../../domain/repositories/cityRepository.interface';
import { City } from '../entities/city.entity';

@Injectable()
export class DatabaseCityRepository implements CityRepository {
  constructor(
    @InjectRepository(City)
    private readonly cityEntityRepository: Repository<City>,
  ) { }

  async insert(city: CityM): Promise<CityM> {
    const cityEntity = this.toCityEntity(city);
    const result = await this.cityEntityRepository.insert(cityEntity);

    return this.toCity(result.generatedMaps[0] as City);
  };

  async findAllFromUser(userId: number): Promise<CityM[]> {
    const citiesEntity = await this.cityEntityRepository
      .find({
        where: { user: userId }
      });

    return citiesEntity.map((cityEntity) => this.toCity(cityEntity));
  }
  async findById(id: number): Promise<CityM> {
    const cityEntity = await this.cityEntityRepository.findOneOrFail(id);
    return this.toCity(cityEntity);
  }
  async deleteById(id: number): Promise<void> {
    await this.cityEntityRepository.delete({ id: id });
  }

  private toCity(cityEntity: City): CityM {
    const city: CityM = new CityM();

    city.id = cityEntity.id;
    city.name = cityEntity.name;
    city.createDate = cityEntity.create_date;

    return city;
  }

  private toCityEntity(city: CityM): City {
    const cityEntity: City = new City();

    cityEntity.id = city.id;
    cityEntity.name = city.name;

    return cityEntity;
  };
}
