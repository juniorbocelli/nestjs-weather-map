import React from 'react';

import {
  IUseManageCitiesStates,

  CitiesStates,
  IdToRemove,
} from 'src/sections/city/ManageCities/types'

export default function useManangeCitiesStates(): IUseManageCitiesStates {
  const [cities, setCities] = React.useState<CitiesStates>([]);
  const [idToRemove, setIdToRemove] = React.useState<IdToRemove>(null);

  return {
    cities,
    setCities,

    idToRemove,
    setIdToRemove,
  };
};