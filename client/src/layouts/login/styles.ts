// @mui
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

export const StyledRoot = styled('main')(() => ({
  height: '100%',
  display: 'flex',
  position: 'relative',
  backgroundColor: 'rgba(205, 173, 132, 0.08)',
}));

export const StyledContent = styled('div')(({ theme }) => ({
  width: 480,
  margin: 'auto',
  minHeight: '100vh',
  justifyContent: 'center',
  padding: theme.spacing(15, 2),
  [theme.breakpoints.up('md')]: {
    width: 530,
    flexShrink: 0,
    padding: theme.spacing(30, 8, 0, 8),
  },
}));
