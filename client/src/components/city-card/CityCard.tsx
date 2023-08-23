import React from 'react';
// @mui
import {
  Typography,
  Box,
  Button,

  SxProps,
  useMediaQuery
} from '@mui/material';
import { Theme, useTheme } from '@mui/material/styles';

// components
import { Item } from 'src/components/city-card/styles';
import { MaxAndMinTemp } from 'src/components/max-min-temp';
// interfaces
import { ICity } from 'src/@types/city';

// ----------------------------------------------------------------------

interface ICityCardProps {
  cityData: ICity;
  setToRemove: (id: number, name: string) => void;

  sx?: SxProps<Theme>;
};

const CityCard: React.FC<ICityCardProps> = ({ cityData, setToRemove, sx }) => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <Item>
      <Box
        sx={{
          ...sx,
          display: 'flex',
          margin: 'auto',
          minWidth: { xs: 290, md: 370 },
          mb: { xs: 0.3, md: 0 },
        }}
      >
        <Box
          component="img"
          src={`https://openweathermap.org/img/wn/${cityData.weather.icon}@2x.png`}

          width={50}
          height={50}

          sx={{ m: 0 }}

          alt={`Imagem indicando ${cityData.weather.description} agora`}
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
              width: { xs: '150px', md: '200px' },
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
              width: { xs: '150px', md: '200px' },
              textTransform: 'capitalize'
            }}

            align="left"
          >
            {cityData.weather.description}
          </Typography>
        </Box>

        {
          isSmUp ?
            <MaxAndMinTemp maxTemp={cityData.main.temp_max} minTemp={cityData.main.temp_min} sx={{ justifyContent: 'space-around' }} />
            :
            null
        }

      </Box>

      {
        !isSmUp ?
          <MaxAndMinTemp
            maxTemp={cityData.main.temp_max}
            minTemp={cityData.main.temp_min}
            sx={{
              alignItems: 'start',
              justifyContent: 'space-around',
              flexDirection: 'row',
              width: '280px',
              mb: 1
            }}
          />
          :
          null
      }
      <Button color="error" size="small" onClick={() => setToRemove(cityData.id, cityData.name)}>
        Remover
      </Button>
    </Item>
  );
}

export default CityCard;