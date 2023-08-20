// // scroll bar
// import 'simplebar/src/simplebar.css';

// // lightbox
// import 'yet-another-react-lightbox/styles.css';
// import 'yet-another-react-lightbox/plugins/captions.css';
// import 'yet-another-react-lightbox/plugins/thumbnails.css';

// // map
// import './utils/mapboxgl';
// import 'mapbox-gl/dist/mapbox-gl.css';

// // editor
// import 'react-quill/dist/quill.snow.css';

// // slick-carousel
// import 'slick-carousel/slick/slick.css';
// import 'slick-carousel/slick/slick-theme.css';

// // lazy image
// import 'react-lazy-load-image-component/src/effects/blur.css';

// ----------------------------------------------------------------------

import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// @mui
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';

// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';

// components
import { ThemeSettings, SettingsProvider } from './components/settings';

// contexts
import { AuthContextProvider } from './auth/context';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <AuthContextProvider>
      <HelmetProvider>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <SettingsProvider>
            <BrowserRouter>
              <ThemeProvider>
                <ThemeSettings>
                  <Router />
                </ThemeSettings>
              </ThemeProvider>
            </BrowserRouter>
          </SettingsProvider>
        </LocalizationProvider>
      </HelmetProvider>
    </AuthContextProvider>
  );
};
