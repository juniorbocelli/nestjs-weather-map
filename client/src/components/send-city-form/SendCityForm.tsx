import React from 'react';
// @mui
import {
  Box,
  Button,

  SxProps,
} from '@mui/material';
import { Theme } from '@mui/material/styles';

// components
import { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

interface ISendCityFormProps {
  isQueringApi: boolean;

  sx?: SxProps<Theme>;
};

const SendCityForm: React.FC<ISendCityFormProps> = ({ isQueringApi, sx }) => (
  <Box
    sx={{
      ...sx,
      display: 'flex',
      flexDirection: { xs: 'column', md: 'row' },
      justifyContent: 'center',
      alignItems: 'center',
      width: { xs: 300, md: 400 },
      mb: { xs: 2, md: 4 }
    }}
  >
    <RHFTextField
      name="name"
      label="Nome da cidade"

      sx={{
        mr: { xs: 0, md: 1 },
        mb: { xs: 1, md: 0 }
      }}

      disabled={isQueringApi}
    />

    <Button type="submit" variant="contained" sx={{ height: { xs: 'auto', md: 55 } }} disabled={isQueringApi}>
      Enviar
    </Button>
  </Box>
);

export default SendCityForm;