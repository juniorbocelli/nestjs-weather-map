import { OpenWeatherM } from 'src/domain/model/openWeather';

export interface IOpenWeather {
  getWeatherInfoByName(name: string, appid: string, lang?: string, units?: string): Promise<OpenWeatherM>;
  getWeatherInfoById(id: number, appid: string, lang?: string, units?: string): Promise<OpenWeatherM>;
};