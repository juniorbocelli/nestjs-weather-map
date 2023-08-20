// mui
import {
  useTheme,
} from '@mui/material/styles';

// layouts
import { AuthLayout } from 'src/layouts/auth';
// components
import LogoFull from 'src/components/logo-full';
//
import AuthRegisterForm from 'src/sections/auth/register/AuthRegisterForm';

// ----------------------------------------------------------------------

export default function Login() {
  const theme = useTheme();

  return (
    <AuthLayout>
      <LogoFull sx={{ px: theme.spacing(4), mb: theme.spacing(5) }} />

      <AuthRegisterForm />

    </AuthLayout>
  );
};
