import axios from '../utils/axios';
import * as Routes from '../routes/apis';

export function loginAPI(username: string, password: string) {
  return axios.post(Routes.API_AUTH_URL.login,
    {
      username,
      password,
    }
  );
};

export function checkSessionAPI() {
  return axios.get(Routes.API_AUTH_URL.checkSession);
};

export function logoutAPI() {
  return axios.patch(Routes.API_AUTH_URL.logout);
};