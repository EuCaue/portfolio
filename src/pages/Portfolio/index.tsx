import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { MdDarkMode, MdOutlineDarkMode } from 'react-icons/md';

import Header from '../../components/Header';
import { darkTheme, lightTheme } from '../../assets/styles/themes';

export default function Portfolio() {
  const [isDark, setIsDark] = useState(true);

  const toggleTheme = () => {
    if (isDark === false) return setIsDark(true);
    return setIsDark(false);
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <Header toggleTheme={toggleTheme} isDark={isDark} />
    </ThemeProvider>
  );
}
