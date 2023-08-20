import React from 'react';
import useAPIs from './apis';
import useStates from './states';
import { IAuthContext } from './types';

const AuthContext = React.createContext({} as IAuthContext);

interface Props {
  children?: React.ReactNode
};

export let globalAuth = {
  logout: () => { },
};

export const AuthContextProvider: React.FC<Props> = ({ children }) => {
  const states = useStates();
  const api = useAPIs(states);

  const isSignedIn = () => {
    if (states.loggedUser === undefined)
      return undefined;

    return Boolean(states.loggedUser);
  };

  globalAuth = {
    logout: api.logout,
  };

  return (
    <AuthContext.Provider
      value={
        {
          loggedUser: states.loggedUser,

          feedback: {
            isQueryingAPI: states.isQueryingAPI,
            setIsQueryingAPI: states.setIsQueryingAPI,

            errorMessage: states.errorMessage,
            setErrorMessage: states.setErrorMessage,
          },
          login: api.login,
          logout: api.logout,

          checkSession: api.checkSession,
          changePassword: api.changePassword,

          isSignedIn: isSignedIn,
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = React.useContext(AuthContext);
  return context;
};
