import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// domain model entities
import { CityM } from 'src/domain/model/city';
import { UserM } from 'src/domain/model/user';
// infrastructure model entities
import { City } from 'src/infrastructure/entities/city.entity';
import { User } from 'src/infrastructure/entities/user.entity';
//
import { CityRepository } from 'src/domain/repositories/cityRepository.interface';

@Injectable()
export class DatabaseCityRepository implements CityRepository {
  constructor(
    @InjectRepository(City)
    private readonly cityEntityRepository: Repository<City>,
  ) { };

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
  };

  async findById(id: number): Promise<CityM> {
    const cityEntity = await this.cityEntityRepository
      .findOneOrFail({ relations: ['user'], where: { id: id } });

    return this.toCity(cityEntity);
  };

  async deleteById(id: number): Promise<void> {
    await this.cityEntityRepository.delete({ id: id });
  };

  private toCity(cityEntity: City): CityM {
    const city: CityM = new CityM();
    const user: UserM = new UserM();

    city.id = cityEntity.id;
    city.name = cityEntity.name;
    city.createDate = cityEntity.create_date;

    user.id = cityEntity.user.id;
    user.username = cityEntity.user.username;

    city.user = user;

    return city;
  };

  private toCityEntity(city: CityM): City {
    const cityEntity: City = new City();
    const userEntity: User = new User();
    userEntity.id = city.user.id;

    cityEntity.id = city.id;
    cityEntity.name = city.name;
    cityEntity.user = userEntity;

    return cityEntity;
  };
}
