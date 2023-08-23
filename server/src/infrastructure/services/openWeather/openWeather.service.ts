import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

// interfaces
import { IOpenWeather } from 'src/domain/adapters/openWeather.interface';
// domain models
import { OpenWeatherM } from 'src/domain/model/openWeather';

// This service performa an external request in Open Weather API
// see https://docs.nestjs.com/techniques/http-module
@Injectable()
export class OpenWeatherService implements IOpenWeather {
  private baseURL = "https://api.openweathermap.org/data/2.5/weather/";

  constructor(private readonly httpService: HttpService) { }

  async getWeatherInfoByName(name: string, appid: string, lang?: string, units?: string): Promise<OpenWeatherM> {
    const _lang = lang || "pt_br";
    const _units = units || "metric";

    const response: {
      data: OpenWeatherM
    } = await this.httpService.get(`${this.baseURL}?appid=${appid}&q=${name}&lang=${_lang}&units=${_units}`).toPromise();

    return response.data;
  };

  async getWeatherInfoById(id: number, apiId: number, appid: string, lang?: string, units?: string): Promise<OpenWeatherM> {
    const _lang = lang || "pt_br";
    const _units = units || "metric";

    const response: {
      data: OpenWeatherM
    } = await this.httpService.get(`${this.baseURL}?appid=${appid}&id=${apiId}&lang=${_lang}&units=${_units}`).toPromise();

    // see notes in OpenWeatherM class
    response.data.id = id;

    return response.data;
  };
}
