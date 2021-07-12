/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react';

export enum Theme {
  DARK = 'dark',
  LIGHT = 'light',
}

export interface ThemeContextState {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext({
  theme: Theme.LIGHT,
  toggleTheme: () => {},
});
