import React from 'react';

// interffaces
import {
  IUseManageCitiesEffects,

  IUseManageCitiesAPIs
} from 'src/sections/city/ManageCities/types';

export default function useManageCitiesEffects(apis: IUseManageCitiesAPIs): IUseManageCitiesEffects {
  const useComponentDidMount = () => {
    React.useEffect(() => {
      apis.getAllCities();

      const interval = setInterval(() => {

      }, 15 * 60 * 1000);

      return () => clearInterval(interval);

    }, []);
  };

  return {
    useComponentDidMount,
  };
};