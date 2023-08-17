import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// Confifg
import { TypeOrmConfigModule } from '../config/typeorm/typeorm.module';
// Entities
import { City } from '../entities/city.entity';
import { Todo } from '../entities/todo.entity';
import { User } from '../entities/user.entity';
// Repositories
import { DatabaseCityRepository } from './city.repository';
import { DatabaseTodoRepository } from './todo.repository';
import { DatabaseUserRepository } from './user.repository';

@Module({
  imports: [TypeOrmConfigModule, TypeOrmModule.forFeature([City, Todo, User])],
  providers: [DatabaseCityRepository, DatabaseTodoRepository, DatabaseUserRepository],
  exports: [DatabaseCityRepository, DatabaseTodoRepository, DatabaseUserRepository],
})
export class RepositoriesModule { }
