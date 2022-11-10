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
  highlight: string;
  highlightLow: string;
}

export const darkTheme: Colors = {
  body: `${colors.baseDark}`,
  text: `${colors.textDark}`,
  accentColor: `${colors.pineDark}`,
  love: `${colors.loveDark}`,
  overlay: `${colors.overlayDark}`,
  highlight: `${colors.highlightDark}`,
  highlightLow: `${colors.highlightLowDark}`,
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
  highlight: `${colors.highlightWhite}`,
  highlightLow: `${colors.highlightLowWhite}`,
  surface: `${colors.surfaceWhite}`,
  gold: `${colors.goldWhite}`,
  fontSerif: '"Merriweather", serif',
  fontSans: '"Poppins", sans-serif',
};
