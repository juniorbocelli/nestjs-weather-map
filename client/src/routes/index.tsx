import { Navigate, useRoutes } from 'react-router-dom';
// hooks
import useFeedback from 'src/hooks/feedbacks';
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

} from 'src/routes/elements';

// ----------------------------------------------------------------------

export default function Router() {
  const feedbacks = useFeedback();

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

            fatherStates={feedbacks}
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
