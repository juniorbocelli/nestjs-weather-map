import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

export type ColorSchema = 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';

declare module '@mui/material/styles/createPalette' {
  interface TypeBackground {
    neutral: string;
  }
  interface SimplePaletteColorOptions {
    lighter: string;
    darker: string;
  }
  interface PaletteColor {
    lighter: string;
    darker: string;
  }
}

// SETUP COLORS

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
};

const PRIMARY = {
  lighter: '#F4F5D7', // 100
  light: '#C3C67D', // 300
  main: '#41431A',  // 500
  dark: '#2E300D',  // 700
  darker: '#1E2004',  // 900
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#FCF7EA',
  light: '#F0DEBC',
  main: '#CDAD84',
  dark: '#936842',
  darker: '#623519',
  contrastText: '#272727',
};

const INFO = {
  lighter: '#C7F9F1',
  light: '#58DEDD',
  main: '#007B91',
  dark: '#004868',
  darker: '#002545',
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#DEFAD5',
  light: '#85E37F',
  main: '#2CA53C',
  dark: '#167634',
  darker: '#084F2C',
  contrastText: '#fff',
};

const WARNING = {
  lighter: '#FAFACE',
  light: '#E6E66C',
  main: '#ADAD14',
  dark: '#7C7C0A',
  darker: '#535303',
  contrastText: GREY[800],
};

const ERROR = {
  lighter: '#FCE1D0',
  light: '#ED8D71',
  main: '#C42419',
  dark: '#8D0C19',
  darker: '#5E041C',
  contrastText: '#fff',
};

const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: PRIMARY,
  secondary: SECONDARY,
  info: INFO,
  success: SUCCESS,
  warning: WARNING,
  error: ERROR,
  grey: GREY,
  divider: alpha(GREY[500], 0.24),
  action: {
    hover: alpha(GREY[500], 0.08),
    selected: alpha(GREY[500], 0.16),
    disabled: alpha(GREY[500], 0.8),
    disabledBackground: alpha(GREY[500], 0.24),
    focus: alpha(GREY[500], 0.24),
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  },
};

export default function palette(themeMode: 'light' | 'dark') {
  const light = {
    ...COMMON,
    mode: 'light',
    text: {
      primary: GREY[800],
      secondary: GREY[600],
      disabled: GREY[500],
    },
    background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
    action: {
      ...COMMON.action,
      active: GREY[600],
    },
  } as const;

  const dark = {
    ...COMMON,
    mode: 'dark',
    text: {
      primary: '#fff',
      secondary: GREY[500],
      disabled: GREY[600],
    },
    background: {
      paper: GREY[800],
      default: GREY[900],
      neutral: alpha(GREY[500], 0.16),
    },
    action: {
      ...COMMON.action,
      active: GREY[500],
    },
  } as const;

  return themeMode === 'light' ? light : dark;
};
