import React from 'react';

//
import useAuthAPIs from 'src/auth/apis';
import useAuthStates from 'src/auth/states';
import { IAuthContext } from 'src/auth/types';

const AuthContext = React.createContext({} as IAuthContext);

interface Props {
  children?: React.ReactNode
};

export const globalAuth = {
  logout: () => { },
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const states = useAuthStates();
  const apis = useAuthAPIs(states);

  globalAuth.logout = apis.logout;

  // states
  const {
    loggedUser,
    setLoggedUser,

    isQueryingAPI,
    setIsQueryingAPI,

    errorMessage,
    setErrorMessage,
  } = states;
  const _states = React.useMemo(() => (
    {
      loggedUser,
      setLoggedUser,

      isQueryingAPI,
      setIsQueryingAPI,

      errorMessage,
      setErrorMessage,
    }
  ), [
    loggedUser,
    setLoggedUser,

    isQueryingAPI,
    setIsQueryingAPI,

    errorMessage,
    setErrorMessage,
  ]);

  // APIs
  const {
    login,
    logout,
    checkSession,
  } = apis;
  const _apis = React.useMemo(() => (
    {
      login,
      logout,
      checkSession,
    }
  ), [
    login,
    logout,
    checkSession,
  ]);

  // contexts
  const contexts = React.useMemo(() => ({
    loggedUser: _states.loggedUser,

    feedback: {
      isQueryingAPI: _states.isQueryingAPI,
      setIsQueryingAPI: _states.setIsQueryingAPI,

      errorMessage: _states.errorMessage,
      setErrorMessage: _states.setErrorMessage,
    },
    login: _apis.login,
    logout: _apis.logout,

    checkSession: _apis.checkSession,
  }), [
    _states,
    _apis
  ]);

  return (
    <AuthContext.Provider
      value={contexts}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuthContext() {
  const context = React.useContext(AuthContext);

  return context;
};
