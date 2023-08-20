import React from 'react';
// @types
import {
  IFeedbackContext,
  IUseFeedbackStates,
} from 'src/hooks/feedbacks/types';

// ----------------------------------------------------------------------

const FFeedbackContext = React.createContext({} as IFeedbackContext);

interface ISetFeedbackProviderProps extends React.PropsWithChildren {
  states: IUseFeedbackStates;
};

export const FeedbackContextProvider: React.FC<ISetFeedbackProviderProps> = ({ children, states }) => {
  /**
   * STATES
   */
  const {
    isQueryingAPI,
    setIsQueryingAPI,

    isLoadingTable,
    setIsLoadingTable,

    dialogMessage,
    setDialogMessage,
  } = states;

  const _states = React.useMemo(() => (
    {
      isQueryingAPI,
      setIsQueryingAPI,

      isLoadingTable,
      setIsLoadingTable,

      dialogMessage,
      setDialogMessage,
    }
  ), [
    isQueryingAPI,
    setIsQueryingAPI,

    isLoadingTable,
    setIsLoadingTable,

    dialogMessage,
    setDialogMessage,
  ]);

  const contexts = React.useMemo(() => ({ states: _states }), [_states]);

  return (
    <FFeedbackContext.Provider value={contexts} >
      {children}
    </FFeedbackContext.Provider>
  );
};

export function useFeedbackContext() {
  const context = React.useContext(FFeedbackContext);
  return context;
};