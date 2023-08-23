import { Suspense, lazy, ElementType } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

// ----------------------------------------------------------------------

const Loadable = (Component: ElementType) => (props: any) =>
(
  <Suspense fallback={<CircularProgress />}>
    <Component {...props} />
  </Suspense>
);

// ----------------------------------------------------------------------

/**
 * Auth
 */
export const LoginPage = Loadable(lazy(() => import('../pages/auth/LoginPage')));

/**
 * User
 */
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));


/**
 * City
 */
export const ManageCitiesPage = Loadable(lazy(() => import('../pages/city/ManageCitiesPage')));