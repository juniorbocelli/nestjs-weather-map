import React from 'react';
import {
  Typography,

  useTheme,
  SxProps,
} from '@mui/material';

interface ITitleProps {
  children?: React.ReactNode;
  sx?: SxProps;
};

const Title: React.FC<ITitleProps> = ({ children, sx }) => {
  const theme = useTheme();

  return (
    <Typography
      variant='h3'
      component='div'
      sx={{
        fontSize: { xs: '1.8rem', md: '2.0rem', xl: '2.4rem' },
        mb: {
          xs: theme.spacing(1.3),
          md: theme.spacing(2.5)
        },

        ...sx
      }}
    >
      {children}
    </Typography >
  )
};

export default Title;