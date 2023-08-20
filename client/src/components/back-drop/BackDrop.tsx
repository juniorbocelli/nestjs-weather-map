import React from 'react';
import {
  Backdrop,
  CircularProgress,

  useTheme,
} from '@mui/material';

interface IBackDropProps {
  open: boolean;
};

const BackDrop: React.FC<IBackDropProps> = (props) => {
  const theme = useTheme();
  const { open } = props;

  return (
    <Backdrop open={open} sx={{ zIndex: theme.zIndex.drawer + 1, color: '#fff', }}>
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackDrop;