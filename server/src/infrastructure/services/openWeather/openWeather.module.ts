import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
//
import { OpenWeatherService } from 'src/infrastructure/services/openWeather/openWeather.service';

@Module({
  imports: [HttpModule],
  providers: [OpenWeatherService],
  exports: [OpenWeatherService]
})
export class OpenWeatherModule { }
