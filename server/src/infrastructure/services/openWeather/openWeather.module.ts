import { Module } from '@nestjs/common';
import { HttpService, HttpModule } from '@nestjs/axios';
//
import { OpenWeatherService } from './openWeather.service';

@Module({
  imports: [HttpModule],
  providers: [OpenWeatherService],
  exports: [OpenWeatherService]
})
export class OpenWeatherModule { }
