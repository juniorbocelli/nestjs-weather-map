import axios from 'src/utils/axios';
import * as Routes from 'src/routes/apis';

// ----------------------------------------------------------------------

export function createUserAPI(username: string, password: string) {
  return axios.post(Routes.API_USER_URL.newUser,
    {
      username,
      password
    }
  );
};