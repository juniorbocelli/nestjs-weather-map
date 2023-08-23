import axios from 'src/utils/axios';
import * as Routes from 'src/routes/apis';
import { IUser } from 'src/@types/user';

// ----------------------------------------------------------------------

export function loginAPI(username: string, password: string) {
  return axios.post<IUser>(Routes.API_AUTH_URL.login,
    {
      username,
      password,
    }
  );
};

export function checkSessionAPI() {
  return axios.get<IUser>(Routes.API_AUTH_URL.checkSession);
};

export function logoutAPI() {
  return axios.patch(Routes.API_AUTH_URL.logout);
};

export function createUserAPI(username: string, password: string) {
  return axios.post(Routes.API_USER_URL.newUser,
    {
      username,
      password
    }
  );
};