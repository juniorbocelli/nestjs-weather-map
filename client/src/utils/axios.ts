import axios from 'axios';
// config
import { SERVER_HOST_API, SERVER_HOST_PORT } from 'src/config-global';
// functions to logout
import { globalAuth } from 'src/auth/context';
import LocalStorage from 'src/utils/LocalStorage';

// ----------------------------------------------------------------------

const apiAxios = axios.create({ baseURL: `${SERVER_HOST_API}:${SERVER_HOST_PORT}`, headers: { 'Content-Type': 'application/json' } });

// Response error handling
apiAxios.interceptors.response.use(
  (response) => {
    if (process.env.NODE_ENV === 'development')
      console.log(`Response:`, response);

    if (typeof response.data === "undefined")
      throw new Error("Erro em chamada API (TESTE)");

    if (typeof response.data.error !== "undefined")
      throw new Error(response.data.error as string);

    return response;
  },
  (error) => {
    if (process.env.NODE_ENV === 'development')
      console.error('Error:', error);

    if (typeof error.data === "undefined")
      throw new Error("Erro em chamada API");

    if (typeof error.response === "undefined")
      throw new Error("Erro em chamada API");

    if (error.response.status === 401 || error.response.status === 403)
      if (process.env.NODE_ENV === 'development') {
        // Logoout client
        globalAuth.logout();
        LocalStorage.clearToken();
        throw new Error("Cliente foi deslogado");
      };

    return error;
  }
);

export default apiAxios;