// ----------------------------------------------------------------------

type ColorVariants = {
  name: string;
  lighter: string;
  light: string;
  main: string;
  dark: string;
  darker: string;
  contrastText: string;
};

export type ThemeModeValue = 'light' | 'dark';
export type ThemeContrastValue = 'default' | 'bold';
export type ThemeLayoutValue = 'vertical' | 'horizontal' | 'mini';
export type ThemeColorPresetsValue = 'default';

export type SettingsValueProps = {
  themeMode: ThemeModeValue;
  themeLayout: ThemeLayoutValue;
  themeContrast: ThemeContrastValue;
  themeColorPresets: ThemeColorPresetsValue;
};

export type SettingsContextProps = SettingsValueProps & {
  // Mode
  onToggleMode: VoidFunction;
  onChangeMode: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Layout
  onToggleLayout: VoidFunction;
  onChangeLayout: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Contrast
  onToggleContrast: VoidFunction;
  onChangeContrast: (event: React.ChangeEvent<HTMLInputElement>) => void;

  // Reset
  onResetSetting: VoidFunction;
};
