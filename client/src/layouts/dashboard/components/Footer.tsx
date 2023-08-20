import {
  Typography,
  Link,
  Box,
} from '@mui/material';
//
import Strings from 'src/shared/strings';

// ----------------------------------------------------------------------

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href={Strings.Page.EXTERNAL_COPYRIGHT_FOOTER_LINK} target="_blank">
        {Strings.Page.COMPANY_NAME}
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
};

// ----------------------------------------------------------------------

function Footer() {
  return (
    <Box component="footer" sx={{ p: 2, bgcolor: '#eaeff1' }}>
      <Copyright />
    </Box>
  );
};

export default Footer;