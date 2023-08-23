import React from "react";

export type IsSuccessState = boolean;

export interface IUseRegisterStates {
  isSuccess: IsSuccessState;
  setIsSuccess: React.Dispatch<React.SetStateAction<IsSuccessState>>;
};

export interface IUseRegisterAPIs {
  registerUser: (username: string, password: string) => void;
};