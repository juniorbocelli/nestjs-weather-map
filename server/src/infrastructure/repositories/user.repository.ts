import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
// domain entities
import { UserM } from 'src/domain/model/user';
import { CityM } from 'src/domain/model/city';
// interfaces
import { UserRepository } from 'src/domain/repositories/userRepository.interface';
// infrastructure entities
import { User } from 'src/infrastructure/entities/user.entity';
import { City } from 'src/infrastructure/entities/city.entity';

@Injectable()
export class DatabaseUserRepository implements UserRepository {
  constructor(
    @InjectRepository(User)
    private readonly userEntityRepository: Repository<User>,
  ) { };

  async insert(user: UserM): Promise<UserM> {
    const userEntity = this.toUserEntity(user);

    const result = await this.userEntityRepository.insert(userEntity);

    return this.toUser(result.generatedMaps[0] as User);
  };

  async updateRefreshToken(username: string, refreshToken: string): Promise<void> {
    await this.userEntityRepository.update(
      {
        username: username,
      },
      { hash_refresh_token: refreshToken },
    );
  };

  async getUserByUsername(username: string): Promise<UserM> {
    const adminUserEntity = await this.userEntityRepository.findOne({
      where: {
        username: username,
      },
    });
    if (!adminUserEntity) {
      return null;
    };

    return this.toUser(adminUserEntity);
  };

  async updateLastLogin(username: string): Promise<void> {
    await this.userEntityRepository.update(
      {
        username: username,
      },
      { last_login: () => 'CURRENT_TIMESTAMP' },
    );
  };

  private toUser(adminUserEntity: User): UserM {
    const adminUser: UserM = new UserM();

    adminUser.id = adminUserEntity.id;
    adminUser.username = adminUserEntity.username;
    adminUser.password = adminUserEntity.password;
    adminUser.createDate = adminUserEntity.create_date;
    adminUser.updatedDate = adminUserEntity.updated_date;
    adminUser.lastLogin = adminUserEntity.last_login;
    adminUser.hashRefreshToken = adminUserEntity.hash_refresh_token;

    const citiesM: CityM[] = [];

    if (typeof adminUserEntity.cities !== 'undefined')
      adminUserEntity.cities.forEach(city => {
        const cityM = new CityM();

        cityM.id = city.id;
        cityM.apiId = city.apiId;
        cityM.createDate = city.create_date;

        citiesM.push(cityM);
      });

    adminUser.cities = citiesM;

    return adminUser;
  };

  private toUserEntity(adminUser: UserM): User {
    const adminUserEntity: User = new User();

    adminUserEntity.username = adminUser.username;
    adminUserEntity.password = adminUser.password;
    adminUserEntity.last_login = adminUser.lastLogin;

    const cities: City[] = [];

    adminUser.cities.forEach(cityM => {
      const city = new City();

      city.id = cityM.id;
      city.apiId = cityM.apiId;
      city.create_date = cityM.createDate;

      cities.push(city);
    });

    adminUserEntity.cities = cities;

    return adminUserEntity;
  };
}
