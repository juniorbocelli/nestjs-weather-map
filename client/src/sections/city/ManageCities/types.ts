import React from 'react';

import { ICity } from 'src/@types/city';

/**
 * STATES
 */
export type CitiesStates = ICity[];
export type IdToRemove = { id: number, name: string } | null;

export interface IUseManageCitiesStates {
  cities: CitiesStates;
  setCities: React.Dispatch<React.SetStateAction<ICity[]>>;

  idToRemove: IdToRemove;
  setIdToRemove: React.Dispatch<React.SetStateAction<IdToRemove>>;
};

/**
 * APIs
 */
export interface IUseManageCitiesAPIs {
  createCity: (name: string) => void;
  deleteCity: (cityId: number) => void;
  getAllCities: () => void;
};


/**
 * EFFECTS
 */
export interface IUseManageCitiesEffects {
  useComponentDidMount: () => void;
};


/**
 * CONTEXT
 */
export interface IUseManageCitiesContext {
  states: IUseManageCitiesStates;
  apis: IUseManageCitiesAPIs;
  effects: IUseManageCitiesEffects;
};