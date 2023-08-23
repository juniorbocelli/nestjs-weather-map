import React from 'react';
import * as Yup from 'yup';
import { Link as RouterLink } from 'react-router-dom';

// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import {
  Box,
  Stack,
  IconButton,
  InputAdornment,
  Typography,
  useMediaQuery,
  Link,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

// auth
import { useAuthContext } from 'src/auth/context';
// components
import { Iconify } from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
//
import Strings from 'src/shared/strings';
import { PATH_AUTH } from 'src/routes/paths';

// ----------------------------------------------------------------------

type FormValuesProps = {
  username: string;
  password: string;
};

export default function AuthLoginForm() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const { login, feedback } = useAuthContext();
  const { isQueryingAPI, errorMessage, setErrorMessage } = feedback;

  const [showPassword, setShowPassword] = React.useState(false);

  // Effects
  React.useEffect(() => {
    setErrorMessage(null);
  }, [setErrorMessage]);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(Strings.ErrorMessages.forms.requiredField).matches(/^[a-zA-Z0-9]+$/, Strings.ErrorMessages.forms.mustBeValid('username')),
    password: Yup.string().required(Strings.ErrorMessages.forms.requiredField),
  });

  const defaultValues = {
    username: '',
    password: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    // control business rules
    setErrorMessage(null);

    try {
      login(data.username, data.password);
    } catch (error) {
      if (process.env.NODE_ENV === 'development')
        console.error(error);

      reset();
    };
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ mb: theme.spacing(2) }}>
        <RHFTextField name="username" label="Username" placeholder="Somente letras e números" size={isSmUp ? 'medium' : 'small'} />

        <RHFTextField
          name="password"
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          size={isSmUp ? 'medium' : 'small'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Typography
        variant="body2"
        sx={{ mt: -1, mb: 2 }}
        component="p"
      >
        Ainda não tem cadastro? <Link component={RouterLink} to={PATH_AUTH.register}>Ir para cadastro</Link>.
      </Typography>

      {
        errorMessage !== null ?
          <Typography variant="body2" color="error" sx={{ mb: 2, }}>
            {errorMessage}
          </Typography>
          :
          null
      }

      <Box sx={{ display: 'flex' }}>
        <LoadingButton
          color="primary"
          type="submit"
          size={isSmUp ? 'medium' : 'small'}
          variant="contained"
          loading={isQueryingAPI}
          sx={{ mx: 'auto' }}
        >
          Entrar
        </LoadingButton>
      </Box>
    </FormProvider>
  );
}
