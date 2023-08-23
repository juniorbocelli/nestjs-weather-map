// @mui
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const StyledRoot = styled('main')(() => ({
  height: '100%',
  display: 'flex',
  position: 'relative',
  backgroundColor: 'rgba(205, 173, 132, 0.08)',
  p: 0,
  m: 0
}));

export const StyledContent = styled('div')(({ theme }) => ({
  width: 330,
  margin: 'auto',
  height: '85vh',

  m: 'auto',
  padding: theme.spacing(15, 0, 0, 0),

  [theme.breakpoints.up('md')]: {
    width: 480,
    height: '100vh',
    flexShrink: 0,
    padding: theme.spacing(14, 8, 0, 8),
  },
}));
