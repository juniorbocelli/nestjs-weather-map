// mui
import {
  useTheme,
} from '@mui/material/styles';

// layouts
import { AuthLayout } from 'src/layouts/auth';
// components
import LogoFull from 'src/components/logo-full';
//
import AuthLoginForm from 'src/sections/auth/login/AuthLoginForm';

// ----------------------------------------------------------------------

export default function Login() {
  const theme = useTheme();

  return (
    <AuthLayout>
      <LogoFull sx={{ px: theme.spacing(4), mb: theme.spacing(5) }} />

      <AuthLoginForm />

    </AuthLayout>
  );
};
