import { useEffect } from 'react';
import { Theme } from '../contexts/ThemeContext';

type ThemeSetter = (darkMode: boolean) => void;

export function useDeviceTheme(setThemeFn: ThemeSetter): void {
  useEffect(() => {
    const darkMode = localStorage.theme === Theme.DARK;
    setThemeFn(darkMode);
  }, [setThemeFn]);
}
