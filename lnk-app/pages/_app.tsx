/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';
import React, { ReactElement, useEffect, useState } from 'react';
import type { AppProps } from 'next/app';
import { Theme, ThemeContext } from '../contexts/ThemeContext';
import { useDeviceTheme } from '../hooks/useDeviceTheme';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  useDeviceTheme(setDarkMode);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  useEffect(() => {
    localStorage.theme = darkMode ? Theme.DARK : Theme.LIGHT;
  }, [darkMode]);

  const contextValue = {
    toggleTheme,
    theme: darkMode ? Theme.DARK : Theme.LIGHT,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
export default MyApp;
