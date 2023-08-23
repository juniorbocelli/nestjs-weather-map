export interface OpenWeatherM {
  // id from CityM id
  id?: number;

  // id of city in OpenWeather API
  apiId: number;

  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level: number;
    grnd_level: number;
  };
  weather: {
    main: string;
    description: string;
    icon: string;
  };

  name: string;
};