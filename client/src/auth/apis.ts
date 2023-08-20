// APIs
import {
  loginAPI,
  checkSessionAPI,
  logoutAPI,
} from 'src/services/auth';
// Types and interfaces
import { IUser } from 'src/@types/user';
import { IAuthStates, } from 'src/auth/types';
// Others imports
import LocalStorage from 'src/utils/LocalStorage';

export interface IUseAuthAPI {
  login: (email: string, password: string) => void;
  logout: () => void;
  checkSession: () => void;
};

// APIs =============================================================================================================================================
function useAuthAPIs(states: IAuthStates): IUseAuthAPI {
  const setLogged = (user: IUser) => {
    if (typeof user.id !== "undefined" && typeof user.type !== "undefined") {
      states.setLoggedUser({
        id: user.id,
        username: user.username,
        type: user.type || -1,
      });

      LocalStorage.setToken(user.username || 'not_auth');
    } else {
      throw new Error("Informações de login incompletas ou usuário desativado");
    };
  };

  const setNotLogged = () => {
    states.setLoggedUser(null);
    LocalStorage.clearToken();
  };

  const login = (email: string, password: string) => {
    states.setIsQueryingAPI(true);

    loginAPI(email, password)
      .then(async response => {
        console.log('response => loginAPI', response);
        // Verify if exist errors
        if (typeof (response.data.error) !== 'undefined') {
          setNotLogged();
          states.setErrorMessage(response.data.error);

          return;
        };

        // Verify if user exist
        if (response.data.user !== null) {
          const { user } = response.data;

          try {
            // Set loggedIn routines
            setLogged(user);

          } catch (error) {
            setNotLogged();
            states.setErrorMessage(error as string);
          };
        }
      })
      .catch(error => {
        setNotLogged();
        states.setErrorMessage(error.message);
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const logout = () => {
    setNotLogged();
    states.setIsQueryingAPI(true);

    logoutAPI()
      .then(response => {
        console.log('response => logoutAPI', response);
      })
      .catch(error => {
        states.setErrorMessage(error.data.message);
      })
      .finally(() => {
        states.setIsQueryingAPI(false);
      });
  };

  const checkSession = () => {
    // If not exist token, client is not logged
    if (LocalStorage.getToken() === LocalStorage.getDefaultToken()) {
      states.setLoggedUser(null);
      return;
    };

    states.setLoggedUser(undefined);

    checkSessionAPI()
      .then(response => {
        console.log('response => checkSessionAPI', response);
        // Verify if exist errors
        if (typeof (response.data.error) !== 'undefined') {
          setNotLogged();
          states.setErrorMessage(response.data.error);

          return;
        };

        // Verify if user exist
        if (response.data.user !== null) {
          const { user } = response.data;

          // Set loggedIn routines
          setLogged(user);
        };
      })
      .catch(error => {
        setNotLogged();
        states.setErrorMessage(error.data.message);
      })
      .finally(() => {

      });
  };

  return {
    login,
    logout,
    checkSession,
  };
};

export default useAuthAPIs;