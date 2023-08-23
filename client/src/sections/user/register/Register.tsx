// mui
import {
  Typography,
} from '@mui/material';
import {
  useTheme,
} from '@mui/material/styles';

// layouts
import { AuthLayout } from 'src/layouts/auth';
// components
import LogoFull from 'src/components/logo-full';
//
import AuthRegisterForm from 'src/sections/user/register/AuthRegisterForm';

// ----------------------------------------------------------------------

export default function Register() {
  const theme = useTheme();

  return (
    <AuthLayout>
      <Typography
        variant="h3"
        component="div"
        align="center"

        sx={{ color: theme.palette.grey[800], pt: 1, pb: 3 }}
      >
        Cadastro
      </Typography>

      <LogoFull sx={{ px: theme.spacing(3), mb: theme.spacing(5) }} />

      <AuthRegisterForm />

    </AuthLayout >
  );
};
