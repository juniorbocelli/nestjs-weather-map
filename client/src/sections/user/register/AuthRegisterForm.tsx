import React from 'react';
import * as Yup from 'yup';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

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
  Link,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';

// auth
import { useFeedbackContext } from 'src/hooks/feedbacks';
// components
import { Iconify } from 'src/components/iconify';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { AlertDialog } from 'src/components/alert-dialog';
// hooks
import { useRegisterStates } from 'src/sections/user/register/states';
import { useRegisterAPIs } from 'src/sections/user/register/apis';
//
import Strings from 'src/shared/strings';
import { PATH_AUTH } from 'src/routes/paths';

// ----------------------------------------------------------------------

type FormValuesProps = {
  username: string;
  password: string;
  confirmPassword: string;
};

export default function AuthRegisterForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  const states = useRegisterStates();
  const apis = useRegisterAPIs(states);

  const { states: feedbackState } = useFeedbackContext();
  const { isQueryingAPI, dialogMessage, setDialogMessage } = feedbackState;

  // Effects
  React.useEffect(() => {
    setDialogMessage(null);
  }, [setDialogMessage]);

  const [showPassword, setShowPassword] = React.useState(false);

  const LoginSchema = Yup.object().shape({
    username: Yup.string().required(Strings.ErrorMessages.forms.requiredField).matches(/^[a-zA-Z0-9]+$/, Strings.ErrorMessages.forms.mustBeValid('username')),
    password: Yup.string().required(Strings.ErrorMessages.forms.requiredField),
    confirmPassword: Yup.string().required(Strings.ErrorMessages.forms.requiredField),
  });

  const defaultValues = {
    username: '',
    password: '',
    confirmPassword: '',
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
    setDialogMessage(null);

    if (data.password !== data.confirmPassword) {
      setDialogMessage({ title: "Erro", message: "A senha e a confirmação de senha são diferentes" });

      return;
    };

    try {
      apis.registerUser(data.username, data.password);
    } catch (error) {
      if (process.env.NODE_ENV === 'development')
        console.error(error);

      reset();
    }
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <AlertDialog
        open={states.isSuccess}
        onClose={
          () => {
            states.setIsSuccess(false);
            navigate(PATH_AUTH.login);
          }
        }

        title="Sucesso"
        content="Usuário cadastrado com sucesso"
      />
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

        <RHFTextField
          name="confirmPassword"
          label="Confirmação de senha"
          type="password"
          size={isSmUp ? 'medium' : 'small'}
        />
      </Stack>

      <Typography
        variant="body2"
        sx={{ mt: -1, mb: 2 }}
        component="p"
      >
        Já é cadastrado? <Link component={RouterLink} to={PATH_AUTH.login}>Ir para login</Link>.
      </Typography>

      {
        dialogMessage !== null ?
          <Typography variant="body2" color="error" sx={{ mb: 2, }}>
            {dialogMessage.message}
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
