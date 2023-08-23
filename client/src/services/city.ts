import axios from 'src/utils/axios';
import * as Routes from 'src/routes/apis';
import { ICity, ICityCreateResponse } from 'src/@types/city';

// ----------------------------------------------------------------------

export function newCityAPI(name: string) {
  return axios.post<ICityCreateResponse>(Routes.API_CITY_URL.newCity,
    {
      name,
    }
  );
};

export function getAllCitiesAPI(lang?: string, units?: string) {
  return axios.get<ICity[]>(Routes.API_CITY_URL.getAllCities, {
    params: {
      lang,
      units,
    }
  });
};

export function deleteCityAPI(cityId: number) {
  return axios.delete<string>(Routes.API_CITY_URL.deleteCity, {
    params: {
      id: cityId,
    }
  });
};