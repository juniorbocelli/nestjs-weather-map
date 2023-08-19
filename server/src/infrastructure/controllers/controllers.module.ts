import { Module } from '@nestjs/common';
import { UsecasesProxyModule } from '../usecases-proxy/usecases-proxy.module';
import { AuthController } from './auth/auth.controller';
import { UserController } from './user/user.controller';
import { CityController } from './city/city.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [CityController, UserController, AuthController],
})

export class ControllersModule { }
