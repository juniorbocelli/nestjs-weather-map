import { Module } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
//
import { OpenWeatherService } from './openWeather.service';

@Module({
  imports: [HttpService],
  providers: [OpenWeatherService],
  exports: [OpenWeatherService]
})
export class OpenWeatherModule { }
