import * as colors from './colors';

interface Colors {
  body: string;
  text: string;
  accentColor: string;
  love: string;
  overlay: string;
  surface: string;
  gold: string;
  fontSans: string;
  fontSerif: string;
}

export const darkTheme: Colors = {
  body: `${colors.baseDark}`,
  text: `${colors.textDark}`,
  accentColor: `${colors.pineDark}`,
  love: `${colors.loveDark}`,
  overlay: `${colors.overlayDark}`,
  surface: `${colors.surfaceDark}`,
  gold: `${colors.goldDark}`,
  fontSerif: '"Merriweather", serif',
  fontSans: '"Poppins", sans-serif',
};

export const lightTheme: Colors = {
  body: `${colors.baseWhite}`,
  text: `${colors.textWhite}`,
  accentColor: `${colors.loveWhite}`,
  love: `${colors.loveWhite}`,
  overlay: `${colors.overlayWhite}`,
  surface: `${colors.surfaceWhite}`,
  gold: `${colors.goldWhite}`,
  fontSerif: '"Merriweather", serif',
  fontSans: '"Poppins", sans-serif',
};
