import { Module } from '@nestjs/common';
//
import { UsecasesProxyModule } from 'src/infrastructure/usecases-proxy/usecases-proxy.module';
import { AuthController } from 'src/infrastructure/controllers/auth/auth.controller';
import { UserController } from 'src/infrastructure/controllers/user/user.controller';
import { CityController } from 'src/infrastructure/controllers/city/city.controller';

@Module({
  imports: [UsecasesProxyModule.register()],
  controllers: [CityController, UserController, AuthController],
})

export class ControllersModule { }
