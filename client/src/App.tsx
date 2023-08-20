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
import { AuthContextProvider } from 'src/auth/context';
import { FeedbackProvider, useFeedbackStates } from 'src/hooks/feedbacks';

// ----------------------------------------------------------------------

export default function App() {
  const feedbacks = useFeedbackStates();

  return (
    <AuthContextProvider>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <BrowserRouter>
          <ThemeProvider theme={defaultTheme}>
            <FeedbackProvider states={feedbacks}>
              <Router />
            </FeedbackProvider>
          </ThemeProvider>
        </BrowserRouter>
      </LocalizationProvider>
    </AuthContextProvider>
  );
};
