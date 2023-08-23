import axios from 'axios';

// config
import { SERVER_HOST_API, SERVER_HOST_PORT } from 'src/config-global';

// ----------------------------------------------------------------------

const apiAxios = axios
  .create({
    baseURL: `${SERVER_HOST_API}:${SERVER_HOST_PORT}`,
    headers: {
      'Content-Type': 'application/json',
    },
    timeout: 30000,
    withCredentials: true
  });

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
);

export default apiAxios;