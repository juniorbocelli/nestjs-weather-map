// mui
import {
  useTheme,
} from '@mui/material/styles';

// layouts
import LoginLayout from '../../layouts/login';
// components
import LogoFull from '../../components/logo-full';
//
import AuthLoginForm from './AuthLoginForm';

// ----------------------------------------------------------------------

export default function Login() {
  const theme = useTheme();

  return (
    <LoginLayout>
      <LogoFull sx={{px: theme.spacing(4), mb: theme.spacing(5)}} />

      <AuthLoginForm />

    </LoginLayout>
  );
};
