import { ApiProperty } from '@nestjs/swagger';
import { CityM } from 'src/domain/model/city';
import { OpenWeatherM } from 'src/domain/model/openWeather';

export class CityPresenter {
  @ApiProperty({ isArray: false })
  id: number;

  @ApiProperty({ isArray: false })
  apiId: number;

  constructor(cityM: CityM) {
    this.id = cityM.id;
    this.apiId = cityM.apiId;
  };
}
