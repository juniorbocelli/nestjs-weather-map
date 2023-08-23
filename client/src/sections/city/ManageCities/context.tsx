import React from 'react';
// @types
import {
  IUseManageCitiesContext,
  IUseManageCitiesStates,
} from 'src/sections/city/ManageCities/types';
// APIs
import useManageCitiesAPIs from 'src/sections/city/ManageCities/apis';
// Effects
import useManageCitiesEffects from 'src/sections/city/ManageCities/effects';

// ----------------------------------------------------------------------

const ManageCitiesContext = React.createContext({} as IUseManageCitiesContext);

interface IManageCitiesContextProviderProps extends React.PropsWithChildren {
  states: IUseManageCitiesStates;
};

export const ManageCitiesContextProvider: React.FC<IManageCitiesContextProviderProps> = ({ children, states }) => {
  /**
   * STATES
   */
  const {
    cities,
    setCities,

    idToRemove,
    setIdToRemove,
  } = states;

  const _states = React.useMemo(() => (
    {
      cities,
      setCities,

      idToRemove,
      setIdToRemove,
    }
  ), [
    cities,
    setCities,

    idToRemove,
    setIdToRemove,
  ]);

  /**
   * APIs
   */
  const _apis = useManageCitiesAPIs(states);

  /**
   * EFFECTS
   */
  const _effects = useManageCitiesEffects(_apis);

  const contexts = React.useMemo(() => ({ states: _states, apis: _apis, effects: _effects }), [_states, _apis, _effects]);

  return (
    <ManageCitiesContext.Provider value={contexts}>
      {children}
    </ManageCitiesContext.Provider>
  );
};

export function useManageCitiesContext() {
  const context = React.useContext(ManageCitiesContext);
  return context;
};