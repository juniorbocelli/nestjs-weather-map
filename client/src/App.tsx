// ----------------------------------------------------------------------

import { BrowserRouter } from 'react-router-dom';

// @mui
import { ThemeProvider } from '@mui/material';

// routes
import Router from 'src/routes';
// theme
import { defaultTheme } from 'src/settings/theme/defaultTheme';

// contexts
import { AuthContextProvider } from 'src/auth';
import { FeedbackProvider, useFeedbackStates } from 'src/hooks/feedbacks';

// ----------------------------------------------------------------------

export default function App() {
  const feedbacks = useFeedbackStates();

  return (
    <AuthContextProvider>
      <BrowserRouter>
        <ThemeProvider theme={defaultTheme}>
          <FeedbackProvider states={feedbacks}>
            <Router />
          </FeedbackProvider>
        </ThemeProvider>
      </BrowserRouter>
    </AuthContextProvider>
  );
};
