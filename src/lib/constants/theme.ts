import {DefaultTheme as NavDefaultTheme} from '@react-navigation/native';
import {DefaultTheme, configureFonts} from 'react-native-paper';
import {DynamicValue} from 'react-native-dynamic';

import palette from './palette';

export const isDarkTheme = new DynamicValue(false, true);

const theme = {
  colors: {
    text: isDarkTheme ? palette.white : palette.slate900,
    textGray: isDarkTheme ? palette.slate200 : palette.textGray,
    placeholderText: isDarkTheme ? palette.slate400 : palette.textGray,
    placeholder: isDarkTheme ? palette.slate400 : palette.textGray,
    lightGray: palette.grey6,
    backgroundColor: isDarkTheme ? palette.black : palette.white,
    backgroundBlue: '#E7EFF4',
    bkgHighContrast: isDarkTheme ? palette.slate200 : palette.slate900,
    backgroundContrast: 'rgba(23, 22, 24, 1)',
    backgroundTransparent: 'rgba(228, 236, 242, 0.4)',
    primary: isDarkTheme ? palette.white : palette.black950,
    secondary: '#5753bb',
    secondaryLight: '#b4abe5',
    // Button Colors
    lightIri: '#86EFFB',
    mediumIri: '#4B8BE8',
    darkIri: '#6D66E8',
    error: palette.error,
    success: palette.green,
    moneyGreen: palette.green,
    moneyRed: palette.error,
    // Bluish
    borderBlue: '#E7EFF4',
    selected: palette.orange,
  },
  fontSizes: {
    xxSmall: 10,
    xSmall: 12,
    small: 14,
    medium: 16,
    large: 18,
    xLarge: 24,
    xxLarge: 26,
  },
  layout: {
    generalPadding: '10px',
  },
};

export default theme;

export const paperTheme = {
  ...DefaultTheme,
  dark: isDarkTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: theme.colors.primary,
    accent: theme.colors.secondary,
    text: theme.colors.text,
    // background: string;
    // surface: string;
    // error: string;
    // onSurface: string;
    // disabled: string;
    // placeholder: string;
    // backdrop: string;
    // notification: string;
  },
  fonts: configureFonts({
    default: {
      regular: {
        fontFamily: 'Armin-Soft-Variable',
        fontWeight: 'normal',
      },
      medium: {
        fontFamily: 'Armin-Soft-Variable',
        fontWeight: 'normal',
      },
      light: {
        fontFamily: 'Armin-Soft-Variable',
        fontWeight: 'normal',
      },
      thin: {
        fontFamily: 'Armin-Soft-Variable',
        fontWeight: 'normal',
      },
    },
  }),
};

export const navTheme = {
  ...NavDefaultTheme,
  dark: isDarkTheme,
  colors: {
    primary: theme.colors.mediumIri,
    text: theme.colors.text,
    background: theme.colors.backgroundColor,
    card: 'transparent',
    border: theme.colors.mediumIri,
    notification: 'yellow',
  },
};
