// ----------------------------------------------------------------------

import { BrowserRouter } from 'react-router-dom';

// @mui
import { ThemeProvider } from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

// routes
import Router from 'src/routes';
// theme
import { defaultTheme } from 'src/settings/theme/defaultTheme';

// contexts
import { AuthContextProvider } from './auth/context';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthContextProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <ThemeProvider theme={defaultTheme}>
            <Router />
          </ThemeProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </AuthContextProvider>
  );
};
