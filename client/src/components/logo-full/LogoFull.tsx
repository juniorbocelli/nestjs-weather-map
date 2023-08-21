import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Box, Link, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

export interface LogoProps extends BoxProps {
  disabledLink?: boolean;

  width?: number;
  height?: number;
};

const LogoFull = forwardRef<HTMLDivElement, LogoProps>(
  ({ disabledLink = false, sx, width, height, ...other }, ref) => {
    const logo = (
      <Box
        component="img"
        src="/logo/logo_full.jpg"
        sx={{ cursor: 'pointer', ...sx }}

        width={width}
        height={height}
      />
    );

    if (disabledLink) {
      return logo;
    };

    return (
      <Link component={RouterLink} to="/" sx={{ display: 'contents' }}>
        {logo}
      </Link>
    );
  }
);

export default LogoFull;
