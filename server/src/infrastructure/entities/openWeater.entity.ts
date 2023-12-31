// This entity is a representation of Opwn Weather API Response
export class OpenWeather {
  main: {
    temp: number,
    feels_like: number,
    temp_min: number,
    temp_max: number,
    pressure: number,
    humidity: number,
    sea_level: number,
    grnd_level: number
  };

  weather: {
    main: string,
    description: string;
    icon: string;
  }[];
}