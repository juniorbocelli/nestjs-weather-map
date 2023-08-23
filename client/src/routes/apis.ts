import { SERVER_HOST_API_ROOT } from 'src/config-global';

/**
 * AUTH
 */
const AUTH_ROOT = `${SERVER_HOST_API_ROOT}/auth`;
export const API_AUTH_URL = {
  login: `/${AUTH_ROOT}/login`,
  logout: `/${AUTH_ROOT}/logout`,
  checkSession: `/${AUTH_ROOT}/is-authenticated`,
};


/**
 * USER
 */
const USER_ROOT = `${SERVER_HOST_API_ROOT}/user`;
export const API_USER_URL = {
  newUser: `/${USER_ROOT}`,
};