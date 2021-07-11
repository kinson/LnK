import React from 'react';

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: (state) => ({
    ...state,
    theme: state.theme === 'light' ? 'dark' : 'light',
  }),
});
