import React from 'react';
import {
  IAuthStates,

  LoggedUserState,

  IsQueryingAPIState,
  ErrorMessageState,
} from './types';

function useStates(): IAuthStates {

  const [loggedUser, setLoggedUser] = React.useState<LoggedUserState>(undefined);

  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [errorMessage, setErrorMessage] = React.useState<ErrorMessageState>(null);
  return {
    loggedUser,
    setLoggedUser,

    isQueryingAPI,
    setIsQueryingAPI,

    errorMessage,
    setErrorMessage,
  };
};

export default useStates;