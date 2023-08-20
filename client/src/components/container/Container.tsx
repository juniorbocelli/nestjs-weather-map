import * as React from 'react';
import { Paper, SxProps, useTheme, } from '@mui/material';

interface IContainerProps {
  children?: React.ReactNode;
  sx?: SxProps;
};

const Container: React.FC<IContainerProps> = ({ children, sx }) => {
  const theme = useTheme();

  return (
    <Paper sx={
      {
        maxWidth: 1500,
        margin: 'auto',
        overflow: 'hidden',
        p: { xs: theme.spacing(1.0), md: theme.spacing(1.5) },
        ...sx
      }
    }
    >
      {children}
    </Paper>
  );
};

export default Container;