import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { AxiosResponse } from 'axios';

// interfaces
import { IOpenWeather, IOpenWeatherPayload } from 'src/domain/adapters/openWeather.interface';
// domain models
import { OpenWeatherM } from 'src/domain/model/openWeather';

// This service performa an external request in Open Weather API
// see https://docs.nestjs.com/techniques/http-module
@Injectable()
export class OpenWeatherService implements IOpenWeather {
  private baseURL = "https://api.openweathermap.org/data/2.5/weather/";

  constructor(private readonly httpService: HttpService) { }

  async getWeatherInfo(payload: IOpenWeatherPayload): Promise<OpenWeatherM> {
    const lang = payload.lang || "pt_br";
    const units = payload.units || "metric";

    const { data } = await this.httpService.get<AxiosResponse<string>>(`${this.baseURL}?q=${payload.cityName}&lang=${lang}&units=${units}`).toPromise();

    return JSON.parse(data.data) as OpenWeatherM;
  };
}
