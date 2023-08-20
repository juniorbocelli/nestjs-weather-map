// APIs
import {
  loginAPI,
  checkSessionAPI,
  logoutAPI,
  changePasswordAPI,
} from '../../services/auth';

// Types and interfaces
import { IAuthStates, } from './types';
import { User } from '../../globals/interfaces/user';

// Others imports
import LocalStorage from '../storage/LocalStorage';

export interface IUseAPI {
  login: (email: string, password: string) => void;
  logout: () => void;
  checkSession: () => void;
  changePassword: (password: string, newPassword: string) => void;
};

// APIs =============================================================================================================================================
function useAPIs(states: IAuthStates): IUseAPI {
  const setLogged = (user: User) => {
    if (typeof user.id !== "undefined" && typeof user.type !== "undefined" && typeof user.isActive !== "undefined" && typeof user.token !== "undefined") {
      states.setLoggedUser({
        id: user.id,
        email: user.email,
        name: user.name,
        type: user.type,
        isActive: user.isActive,
      });

      LocalStorage.setToken(user.token || 'not_auth');
    } else {
      throw new Error("Informações de login incompletas ou usuário desativado");
    };
  };

  const setNotLogged = () => {
    states.setLoggedUser(null);
    LocalStorage.setToken('not_auth');
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
          const user: User = response.data.user;

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

    checkSessionAPI(LocalStorage.getToken())
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
          const user: User = response.data.user;

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

  const changePassword = (password: string, newPassword: string) => {
    changePasswordAPI(password, newPassword)
      .then(async response => {
        console.log('response => changePasswordAPI', response);
        // Verify if exist errors
        if (typeof (response.data.error) !== 'undefined')
          throw new Error(response.data.error);

        // Verify if user exist
        if (response.data.user !== null) {
          const user: User = response.data.user;

          try {
            // Set loggedIn routines
            setLogged(user);

          } catch (error) {
            setNotLogged();
            throw new Error(error as string);
          };
        };
      })
      .catch(error => {
        throw new Error(error.message);
      });
  };

  return {
    login,
    logout,
    checkSession,
    changePassword,
  };
};

export default useAPIs;