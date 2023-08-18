import { OpenWeatherM } from 'src/domain/model/openWeather';

export interface IOpenWeatherPayload {
  cityName: string;
  lang?: string;
  units?: string;
};

export interface IOpenWeather {
  getWeatherInfo(payload: IOpenWeatherPayload): Promise<OpenWeatherM>;
};