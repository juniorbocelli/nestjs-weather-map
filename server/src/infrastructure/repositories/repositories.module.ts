import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Confifg
import { TypeOrmConfigModule } from 'src/infrastructure/config/typeorm/typeorm.module';
// Entities
import { City } from 'src/infrastructure/entities/city.entity';
import { User } from 'src/infrastructure/entities/user.entity';
// Repositories
import { DatabaseCityRepository } from 'src/infrastructure/repositories/city.repository';
import { DatabaseUserRepository } from 'src/infrastructure/repositories/user.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([City, User])],
  providers: [DatabaseCityRepository, DatabaseUserRepository],
  exports: [DatabaseCityRepository, DatabaseUserRepository],
})
export class RepositoriesModule { }
