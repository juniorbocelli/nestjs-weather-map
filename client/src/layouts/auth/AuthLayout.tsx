// @mui
import { Stack } from '@mui/material';
import { useTheme } from '@mui/material/styles';
//
import { StyledRoot, StyledContent } from './styles';

// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

export default function LoginLayout({ children }: Props) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';

  return (
    <StyledRoot>
      <StyledContent>
        <Stack sx={{
          width: 1,
          boxShadow: theme.shadows[11],
          px: theme.spacing(7),
          py: theme.spacing(4),
          backgroundColor: isLight ? '#fff' : undefined
        }}

          borderRadius='10px'
        >
          {children}
        </Stack>
      </StyledContent>
    </StyledRoot>
  );
};