import { AxiosError } from 'axios';

// interfaces
import { IAxiosExceptionData } from 'src/@types/exception';
import {
  IUseManageCitiesAPIs,

  IUseManageCitiesStates,
} from 'src/sections/city/ManageCities/types'
// services
import {
  newCityAPI,
  getAllCitiesAPI,
  deleteCityAPI,
} from 'src/services/city';
// contexts
import { useFeedbackContext } from 'src/hooks/feedbacks';
import { useAuthContext } from 'src/auth/context';

export default function useManageCitiesAPIs(states: IUseManageCitiesStates): IUseManageCitiesAPIs {
  const { states: feedbackStates } = useFeedbackContext();
  const { loggedUser } = useAuthContext();

  const {
    setIsQueryingAPI,

    setDialogMessage,

    setErrorMessageFromAxiosError,
  } = feedbackStates;

  const createCity = (name: string) => {
    setIsQueryingAPI(true);

    newCityAPI(name)
      .then(response => {
        if (process.env.NODE_ENV === 'development')
          console.log('Response -> newCityAPI', response);

        setDialogMessage({ title: "Sucesso", message: `Cidade ${name} inserida com sucesso` });

        // Reload cities
        getAllCities();
      })
      .catch((error: AxiosError<IAxiosExceptionData>) => {
        setErrorMessageFromAxiosError(error);
      })
      .finally(() => {
        setIsQueryingAPI(false);
      });
  };

  const getAllCities = () => {
    setIsQueryingAPI(true);
    const { setCities } = states;

    getAllCitiesAPI(loggedUser?.lang, loggedUser?.units)
      .then(response => {
        if (process.env.NODE_ENV === 'development')
          console.log('Response -> getAllCitiesAPI', response);

        setCities(response.data);
      })
      .catch((error: AxiosError<IAxiosExceptionData>) => {
        setErrorMessageFromAxiosError(error);
      })
      .finally(() => {
        setIsQueryingAPI(false);
      });
  };

  const deleteCity = (cityId: number) => {
    setIsQueryingAPI(true);

    deleteCityAPI(cityId)
      .then(response => {
        if (process.env.NODE_ENV === 'development')
          console.log('Response -> deleteCityAPI', response);


        // Reload cities
        getAllCities();
      })
      .catch((error: AxiosError<IAxiosExceptionData>) => {
        setErrorMessageFromAxiosError(error);
      })
      .finally(() => {
        setIsQueryingAPI(false);
      });
  };

  return {
    createCity,
    deleteCity,
    getAllCities,
  };
};