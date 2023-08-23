import React from 'react';
// @mui
import {
  Typography,
  Box,
  Button,

  SxProps,
} from '@mui/material';
import { Theme } from '@mui/material/styles';

// components
import { Item } from 'src/components/city-card/styles';
// interfaces
import { ICity } from 'src/@types/city';

// ----------------------------------------------------------------------

interface ICityCardProps {
  cityData: ICity;
  setToRemove: (id: number) => void;

  sx?: SxProps<Theme>;
};

const CityCard: React.FC<ICityCardProps> = ({ cityData, setToRemove, sx }) => (
  <Item>
    <Box
      sx={{
        ...sx,
        display: 'flex',
        margin: 'auto',
      }}
    >
      <Box
        component="img"
        src={`https://openweathermap.org/img/wn/${cityData.weather.icon}@2x.png`}

        width={50}
        height={50}

        sx={{ m: 0 }}
      />

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'left'
      }}
      >
        <Typography
          variant="body1"
          component="p"
          sx={{
            fontSize: '1.2rem',
            mb: -1,
            width: '200px',
          }}

          align="left"
        >
          {cityData.name}
        </Typography>

        <Typography
          variant="body2"
          component="div"
          sx={{
            fontSize: '1.0rem',
            fontStyle: 'italic',
            width: '200px',
          }}

          align="left"
        >
          {cityData.weather.description}
        </Typography>
      </Box>
    </Box>
    <Button color="error" size="small" onClick={() => setToRemove(cityData.id)}>
      Remover
    </Button>
  </Item>
);

export default CityCard;