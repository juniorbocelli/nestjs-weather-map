import { Navigate, useRoutes } from 'react-router-dom';
// auth
import CheckSession from 'src/auth/CheckSession';
// layouts
import { Dashboard } from 'src/layouts/dashboard';
// config
import { PATH_AFTER_LOGIN } from 'src/config-global';
// paths
import * as Paths from 'src/routes/paths';
//
import {
  // Auth
  LoginPage,
  RegisterPage,

} from 'src/routes/elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    /**
     * Auth
     */
    {
      path: Paths.PATH_AUTH.root,
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        {
          path: Paths.PATH_AUTH.login,
          element: (
            <CheckSession>
              <LoginPage />
            </CheckSession>
          ),
        },
        {
          path: Paths.PATH_AUTH.register,
          element: (
            <CheckSession>
              <RegisterPage />
            </CheckSession>
          ),
        },
      ],
    },

    /**
     * Dashboard
     */
    {
      path: Paths.PATH_DASHBOARD.root,
      element: (
        <CheckSession>
          <Dashboard
            activeMenu='dashboard'
            title='Cidades'

            pageTitle='Home'
          />
        </CheckSession>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: Paths.PATH_DASHBOARD.home, element: <><h1>Olá</h1></> },
      ],
    },
  ])
}
