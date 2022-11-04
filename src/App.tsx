import React, { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from './assets/styles/globalStyles';
import Portfolio from './pages/Portfolio';
import { darkTheme, lightTheme } from './assets/styles/themes';

function App() {
  const [isDark, setIsDark] = useState<boolean>(true);
  const toggleTheme = () => {
    if (isDark === false) return setIsDark(!isDark);
    return setIsDark(false);
  };

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <Portfolio toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

export default App;
