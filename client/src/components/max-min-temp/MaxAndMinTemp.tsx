import React from 'react';
// @mui
import {
  Box,
  Typography,

  SxProps
} from '@mui/material';
import { Theme } from '@mui/material/styles';

interface IMaxAndMinTempProps {
  maxTemp: number;
  minTemp: number;

  sx?: SxProps<Theme>;
};

const MaxAndMinTemp: React.FC<IMaxAndMinTempProps> = ({ maxTemp, minTemp, sx }) => (
  <Box sx={{
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'left',
    ...sx
  }}
  >
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        mb: { xs: 0, md: 0.5 }
      }}
    >
      <Box
        component="img"
        src='img/inconTempMax.png'

        width={25}
        height={25}

        alt={`Imagem indicando temperatura máxima de ${maxTemp} agora`}
      />

      <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>
        <span style={{ fontWeight: 'bold' }}>MAX</span> {String(maxTemp).replace('.', ',')} °C
      </Typography>
    </Box>

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <Box
        component="img"
        src='img/inconTempMin.png'

        width={25}
        height={25}

        alt={`Imagem indicando temperatura minima de ${minTemp} agora`}
      />

      <Typography variant="body1" sx={{ fontSize: '0.9rem' }}>
        <span style={{ fontWeight: 'bold' }}>MIN</span> {String(minTemp).replace('.', ',')} °C
      </Typography>
    </Box>
  </Box>
);

export default MaxAndMinTemp;