/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

export interface ThemeContextState {
  theme: string;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext({
  theme: 'light',
  toggleTheme: () => {},
});
