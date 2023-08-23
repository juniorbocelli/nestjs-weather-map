import React from 'react';

import { AxiosError } from 'axios';
import { IAxiosExceptionData } from 'src/@types/exception';

import {
  IAuthStates,

  LoggedUserState,

  IsQueryingAPIState,
  ErrorMessageState,
} from './types';

// ----------------------------------------------------------------------

function useAuthStates(): IAuthStates {

  const [loggedUser, setLoggedUser] = React.useState<LoggedUserState>(undefined);

  const [isQueryingAPI, setIsQueryingAPI] = React.useState<IsQueryingAPIState>(false);
  const [errorMessage, setErrorMessage] = React.useState<ErrorMessageState>(null);

  const setAxiosErrorMessage = (error: AxiosError<IAxiosExceptionData>) => {
    if (error.response) {
      if (error.response.data)
        setErrorMessage(error.response.data.message);
    } else {
      setErrorMessage(error.message);
    };
  };

  return {
    loggedUser,
    setLoggedUser,

    isQueryingAPI,
    setIsQueryingAPI,

    errorMessage,
    setErrorMessage,

    setAxiosErrorMessage,
  };
};

export default useAuthStates;