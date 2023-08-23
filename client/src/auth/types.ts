import { AxiosError } from "axios";
import React from "react";
import { IAxiosExceptionData } from "src/@types/exception";

import { IUser as LoggedUser } from 'src/@types/user';

export type LoggedUserState = LoggedUser | null | undefined;
export type IsCheckingSessionState = boolean;

export type IsQueryingAPIState = boolean;
export type ErrorMessageState = null | string;

export interface IAuthStates {
  loggedUser: LoggedUserState;
  setLoggedUser: React.Dispatch<React.SetStateAction<LoggedUserState>>;

  isQueryingAPI: IsQueryingAPIState;
  setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

  errorMessage: ErrorMessageState;
  setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageState>>;

  setAxiosErrorMessage: (error: AxiosError<IAxiosExceptionData>) => void;
};

export interface IAuthContext {
  loggedUser: LoggedUserState;

  feedback: {
    isQueryingAPI: IsQueryingAPIState;
    setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

    errorMessage: ErrorMessageState;
    setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageState>>;

    setAxiosErrorMessage: (error: AxiosError<IAxiosExceptionData>) => void;
  },

  login: (username: string, password: string) => void,
  logout: () => void,
  checkSession: () => void;
};