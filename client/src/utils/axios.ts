import axios from 'axios';
// config
import { SERVER_HOST_API, SERVER_HOST_PORT } from 'src/config-global';
import LocalStorage from 'src/utils/LocalStorage';
import { API_AUTH_URL } from 'src/routes/apis';

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
      console.error('Error Interceptor:', error);

    if (typeof error.data === "undefined")
      throw new Error("Erro em chamada API");

    if (typeof error.response === "undefined")
      throw new Error("Erro em chamada API");

    if (error.response.status === 401 || error.response.status === 403) {
      // Logoout client
      apiAxios.get(API_AUTH_URL.logout);
      LocalStorage.clearToken();

      throw new Error("Cliente foi deslogado");
    };

    return error;
  }
);

export default apiAxios;