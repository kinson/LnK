/* eslint-disable react/jsx-props-no-spreading */
// eslint-disable-next-line import/no-extraneous-dependencies
import 'tailwindcss/tailwind.css';
import React, { ReactElement, useState } from 'react';
import type { AppProps } from 'next/app';
import { ThemeContext } from '../contexts/ThemeContext';

function MyApp({ Component, pageProps }: AppProps): ReactElement {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const contextValue = {
    toggleTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
export default MyApp;
