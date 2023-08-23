import { styled } from '@mui/material/styles';
import { Paper, useMediaQuery } from '@mui/material';

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  margin: 0,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  maxHeight: useMediaQuery(theme.breakpoints.up('sm')) ? '100px' : '140px'
}));