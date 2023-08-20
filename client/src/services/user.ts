import axios from 'src/utils/axios';
import * as Routes from 'src/routes/apis';

// ----------------------------------------------------------------------

export function createUserAPI(name: string) {
  return axios.post(Routes.API_AUTH_URL.login,
    {
      name,
    }
  );
};