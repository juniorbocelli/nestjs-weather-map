import React from "react";

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
};

export interface IAuthContext {
  loggedUser: LoggedUserState;

  feedback: {
    isQueryingAPI: IsQueryingAPIState;
    setIsQueryingAPI: React.Dispatch<React.SetStateAction<IsQueryingAPIState>>;

    errorMessage: ErrorMessageState;
    setErrorMessage: React.Dispatch<React.SetStateAction<ErrorMessageState>>;
  },

  login: (username: string, password: string) => void,
  logout: () => void,
  checkSession: () => void;
};