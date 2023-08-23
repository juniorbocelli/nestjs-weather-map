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
export const RegisterPage = Loadable(lazy(() => import('../pages/auth/RegisterPage')));