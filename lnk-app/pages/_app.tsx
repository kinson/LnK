import 'tailwindcss/tailwind.css'
import { useState } from 'react';
import type { AppProps } from 'next/app'
import { ThemeContext } from '../contexts/ThemeContext';

function MyApp({ Component, pageProps }: AppProps) {

  const [theme, setTheme] = useState('light');
  
  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const contextValue = {
    toggleTheme,
    theme
  };


  return (
    <ThemeContext.Provider value={contextValue} >
      <Component {...pageProps} />
    </ThemeContext.Provider>
  )
}
export default MyApp
