import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Confifg
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
// Entities
import { City } from '../entities/city.entity';
import { User } from '../entities/user.entity';
// Repositories
import { DatabaseCityRepository } from './city.repository';
import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([City, User])],
  providers: [DatabaseCityRepository, DatabaseUserRepository],
  exports: [DatabaseCityRepository, DatabaseUserRepository],
})
export class RepositoriesModule { }
