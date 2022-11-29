import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GlobalStyles from './assets/styles/globalStyles';
import Portfolio from './pages/Portfolio';
import { darkTheme, lightTheme } from './assets/styles/themes';

function App() {
  const storedDarkMode = JSON.parse(localStorage.getItem('DarkMode') || '{}');
  const [isDark, setIsDark] = useState<boolean>(storedDarkMode);
  const toggleTheme = () => {
    if (isDark === false) return setIsDark(!isDark);
    return setIsDark(false);
  };

  localStorage.setItem('DarkMode', JSON.stringify(isDark));

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
      />

      <Portfolio toggleTheme={toggleTheme} />
    </ThemeProvider>
  );
}

export default App;
